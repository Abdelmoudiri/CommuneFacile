<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\DocumentRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class DocumentRequestController extends Controller
{
    /**
     * Display a listing of the requests.
     */
    public function index()
    {
        $user = Auth::user();
        
        if ($user->role === 'citizen') {
            $requests = DocumentRequest::with('user')
                ->where('user_id', $user->id)
                ->orderBy('created_at', 'desc')
                ->get();
        } else {
            $requests = DocumentRequest::with('user')
                ->orderBy('created_at', 'desc')
                ->get();
        }

        return response()->json($requests);
    }

    /**
     * Store a newly created request in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'document_type' => 'required|string|max:255',
            'purpose' => 'required|string',
        ]);

        $documentRequest = DocumentRequest::create([
            'user_id' => Auth::id(),
            'document_type' => $validated['document_type'],
            'purpose' => $validated['purpose'],
            'status' => 'pending'
        ]);

        return response()->json($documentRequest, 201);
    }

    /**
     * Process a document request.
     */
    public function process(Request $request, DocumentRequest $documentRequest)
    {
        try {
            \Log::info('Processing document request', ['request_id' => $documentRequest->id, 'data' => $request->all()]);

            $validated = $request->validate([
                'status' => 'required|in:in_progress,completed,rejected',
                'comments' => 'nullable|string',
                'rejection_reason' => 'required_if:status,rejected|nullable|string',
                'document_file' => 'required_if:status,completed|file|mimes:pdf,doc,docx|max:10240'
            ]);

            if ($request->status === 'completed') {
                if (!$request->hasFile('document_file')) {
                    \Log::warning('Document file missing for completed status', ['request_id' => $documentRequest->id]);
                    return response()->json([
                        'message' => 'Le document est requis pour valider la demande',
                        'errors' => ['document_file' => ['Le document est requis']]
                    ], 422);
                }

                $file = $request->file('document_file');
                if (!$file->isValid()) {
                    \Log::error('Invalid file upload', ['request_id' => $documentRequest->id, 'error' => $file->getError()]);
                    return response()->json([
                        'message' => 'Le fichier est invalide',
                        'errors' => ['document_file' => ['Le fichier uploadé est invalide']]
                    ], 422);
                }

                try {
                    $path = $file->store('documents', 'public');
                    if (!$path) {
                        throw new \Exception('Échec du stockage du fichier');
                    }
                    $documentRequest->document_file = $path;
                } catch (\Exception $e) {
                    \Log::error('File storage failed', [
                        'request_id' => $documentRequest->id,
                        'error' => $e->getMessage()
                    ]);
                    return response()->json([
                        'message' => 'Erreur lors du stockage du fichier',
                        'error' => $e->getMessage()
                    ], 500);
                }
            }

            $documentRequest->status = $validated['status'];
            $documentRequest->comments = $validated['comments'] ?? null;
            $documentRequest->rejection_reason = $validated['rejection_reason'] ?? null;
            $documentRequest->processed_by = Auth::id();
            
            if (!$documentRequest->save()) {
                \Log::error('Failed to save document request', ['request_id' => $documentRequest->id]);
                throw new \Exception('Échec de la sauvegarde de la demande');
            }

            \Log::info('Document request processed successfully', ['request_id' => $documentRequest->id]);
            
            return response()->json([
                'message' => 'Demande traitée avec succès',
                'data' => $documentRequest
            ]);
                
        } catch (\Illuminate\Validation\ValidationException $e) {
            \Log::warning('Validation failed', ['errors' => $e->errors()]);
            return response()->json([
                'message' => 'Erreur de validation',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            \Log::error('Unexpected error', [
                'request_id' => $documentRequest->id ?? null,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return response()->json([
                'message' => 'Une erreur est survenue lors du traitement de la demande',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified request.
     */
    public function show(DocumentRequest $documentRequest)
    {
        $user = Auth::user();
        
        if ($user->role === 'citizen' && $documentRequest->user_id !== $user->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return response()->json($documentRequest->load('user', 'processor'));
    }

    /**
     * Delete the specified request.
     */
    public function destroy(DocumentRequest $documentRequest)
    {
        $user = Auth::user();
        
        if ($user->role === 'citizen' && $documentRequest->user_id !== $user->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        if (!$documentRequest->isPending()) {
            return response()->json(['message' => 'Cannot delete a request that is being processed'], 403);
        }

        $documentRequest->delete();

        return response()->json(['message' => 'Request deleted successfully']);
    }

    /**
     * Download the document file.
     */
    public function downloadDocument(DocumentRequest $documentRequest)
    {
        try {
            $user = Auth::user();
            
            // Vérifier que l'utilisateur a le droit d'accéder à ce document
            if ($user->role === 'citizen' && $documentRequest->user_id !== $user->id) {
                return response()->json(['message' => 'Unauthorized'], 403);
            }

            // Vérifier que la demande est complétée et qu'un fichier existe
            if ($documentRequest->status !== 'completed') {
                return response()->json(['message' => 'Document not available - Status: ' . $documentRequest->status], 404);
            }

            if (!$documentRequest->document_file) {
                return response()->json(['message' => 'Document file path not found in database'], 404);
            }

            // Construire le chemin complet du fichier
            $filePath = $documentRequest->document_file;
            
            // Vérifier que le fichier existe physiquement
            if (!Storage::disk('public')->exists($filePath)) {
                return response()->json(['message' => 'Physical file not found'], 404);
            }

            // Récupérer le type MIME du fichier
            $mimeType = Storage::disk('public')->mimeType($filePath);
            
            // Utiliser directement le nom original du fichier ou créer un nom simple
            $fileName = basename($documentRequest->document_file);

            // Retourner le fichier avec les bons headers
            return Storage::disk('public')->response($filePath, $fileName, [
                'Content-Type' => $mimeType,
                'Content-Disposition' => 'attachment; filename="' . $fileName . '"'
            ]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error downloading file'], 500);
        }
    }
}