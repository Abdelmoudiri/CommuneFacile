<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Models\DocumentRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class DocumentRequestController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $query = DocumentRequest::with(['user', 'processor']);

        if ($user->isCitizen()) {
            $query->where('user_id', $user->id);
        }

        $requests = $query->latest()->get();

        return response()->json([
            'status' => 'success',
            'data' => $requests
        ]);
    }

    
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'document_type' => 'required|string|max:255',
            'purpose' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $documentRequest = DocumentRequest::create([
            'user_id' => Auth::id(),
            'document_type' => $request->document_type,
            'purpose' => $request->purpose,
            'status' => 'pending'
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Document request created successfully',
            'data' => $documentRequest
        ], 201);
    }

   
    public function show($id)
    {
        $user = Auth::user();
        $documentRequest = DocumentRequest::with(['user', 'processor'])->find($id);

        if (!$documentRequest) {
            return response()->json([
                'status' => 'error',
                'message' => 'Document request not found'
            ], 404);
        }

        if ($user->isCitizen() && $documentRequest->user_id !== $user->id) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized access to this document request'
            ], 403);
        }

        return response()->json([
            'status' => 'success',
            'data' => $documentRequest
        ]);
    }

   
    public function process(Request $request, $id)
    {
        try {
            $user = Auth::user();
            
            if (!$user->isEmployee() && !$user->isAdmin()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Unauthorized. Only employees can process document requests'
                ], 403);
            }

            $documentRequest = DocumentRequest::findOrFail($id);

            $validator = Validator::make($request->all(), [
                'status' => 'required|in:in_progress,completed,rejected',
                'comments' => 'nullable|string',
                'rejection_reason' => 'required_if:status,rejected|string',
                'document_file' => 'required_if:status,completed|file|mimes:pdf,doc,docx|max:2048'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            if ($request->hasFile('document_file')) {
                $file = $request->file('document_file');
                $fileName = time() . '_' . Str::slug($file->getClientOriginalName()) . '.' . $file->getClientOriginalExtension();
                $path = $file->storeAs('documents', $fileName, 'public');
                $documentRequest->document_file = $path;
            }

            $documentRequest->status = $request->status;
            $documentRequest->comments = $request->comments;
            $documentRequest->rejection_reason = $request->rejection_reason;
            $documentRequest->processed_by = $user->id;
            $documentRequest->save();

            return response()->json([
                'status' => 'success',
                'message' => 'Document request processed successfully',
                'data' => $documentRequest
            ]);
        } catch (\Exception $e) {
            \Log::error('Error processing document request: ' . $e->getMessage());
            return response()->json([
                'status' => 'error',
                'message' => 'Error processing document request',
                'debug' => $e->getMessage()
            ], 500);
        }
    }

  
    public function downloadDocument($id)
    {
        try {
            Log::info('Starting download process for document ID: ' . $id);
            
            $user = Auth::user();
            $documentRequest = DocumentRequest::findOrFail($id);
            
            Log::info('Document request found:', [
                'id' => $documentRequest->id,
                'status' => $documentRequest->status,
                'file_path' => $documentRequest->document_file,
                'document_type' => $documentRequest->document_type,
                'user_id' => $documentRequest->user_id
            ]);
            
            if ($user->isCitizen() && $documentRequest->user_id !== $user->id) {
                Log::warning('Unauthorized access attempt', [
                    'user_id' => $user->id,
                    'document_owner_id' => $documentRequest->user_id
                ]);
                return response()->json([
                    'status' => 'error',
                    'message' => 'Unauthorized access to this document'
                ], 403);
            }

            if ($documentRequest->status !== 'completed') {
                Log::warning('Attempted to download incomplete document', [
                    'status' => $documentRequest->status
                ]);
                return response()->json([
                    'status' => 'error',
                    'message' => 'Document is not ready for download'
                ], 404);
            }

            if (empty($documentRequest->document_file)) {
                Log::warning('No file attached to completed request');
                return response()->json([
                    'status' => 'error',
                    'message' => 'No file attached to this document request'
                ], 404);
            }

            $filePath = $documentRequest->document_file;
            Log::info('Checking file existence', ['path' => $filePath]);

            if (!Storage::disk('public')->exists($filePath)) {
                Log::error('File not found on disk', [
                    'path' => $filePath,
                    'storage_path' => Storage::disk('public')->path($filePath)
                ]);
                return response()->json([
                    'status' => 'error',
                    'message' => 'File not found on server'
                ], 404);
            }

            $extension = pathinfo($filePath, PATHINFO_EXTENSION) ?: 'pdf';
            $documentType = Str::slug($documentRequest->document_type);
            $timestamp = now()->format('Y-m-d');
            $fileName = "{$documentType}-{$timestamp}.{$extension}";

            Log::info('Preparing file download', [
                'original_path' => $filePath,
                'download_name' => $fileName,
                'mime_type' => Storage::disk('public')->mimeType($filePath)
            ]);

            $fullPath = Storage::disk('public')->path($filePath);
            $response = new BinaryFileResponse($fullPath);
            $response->headers->set('Content-Type', Storage::disk('public')->mimeType($filePath));
            $response->headers->set('Content-Disposition', 'attachment; filename="' . $fileName . '"');
            $response->headers->set('Cache-Control', 'no-cache, no-store, must-revalidate');
            $response->headers->set('Pragma', 'no-cache');
            $response->headers->set('Expires', '0');

            return $response;
            
        } catch (\Exception $e) {
            Log::error('Error in downloadDocument', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return response()->json([
                'status' => 'error',
                'message' => 'Error downloading document: ' . $e->getMessage()
            ], 500);
        }
    }

  
    public function destroy($id)
    {
        $user = Auth::user();
        $documentRequest = DocumentRequest::find($id);

        if (!$documentRequest) {
            return response()->json([
                'status' => 'error',
                'message' => 'Document request not found'
            ], 404);
        }

        if ($user->isCitizen()) {
            if ($documentRequest->user_id !== $user->id) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Unauthorized access to this document request'
                ], 403);
            }

            if (!$documentRequest->isPending()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Only pending requests can be deleted'
                ], 403);
            }
        }

        $documentRequest->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Document request deleted successfully'
        ]);
    }
}
