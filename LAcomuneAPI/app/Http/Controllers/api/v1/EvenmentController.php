<?php

namespace App\Http\Contollers\Api\v1;

use App\Http\Controllers\Controller;
use App\Models\Evenment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class EvenmentController extends Controller
{
    public function index(Request $request)
    {
        $query = Evenment::query();

        // Citizens can only see published events
        if (Auth::user()->isCitizen()) {
            $query->where('is_published', true);
        }

        // Filter by upcoming status if requested
        if ($request->has('upcoming') && $request->upcoming == 'true') {
            $query->where('date', '>=', now())->orderBy('date', 'asc');
        } else {
            $query->orderBy('date', 'desc');
        }

        // Apply pagination
        $perPage = $request->get('per_page', 10);
        $events = $query->paginate($perPage);

        return response()->json([
            'status' => 'success',
            'data' => $events
        ]);
    }


    public function show($id)
    {
        $event = Evenment::find($id);
        
        if (!$event) {
            return response()->json([
                'status' => 'error',
                'message' => 'Event not found'
            ], 404);
        }
        
        if (Auth::user()->hasRole('Citizen') && !$event->is_published) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized access to this event'
            ], 403);
        }
        
        return response()->json([
            'status' => 'success',
            'data' => $event
        ]);
    }


    public function store(Request $request)
    {
        $user = Auth::user();
        
        if (!$user->hasRole('Admin') && !$user->hasRole('Employee')) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized. Only administrators and employees can create events'
            ], 403);
        }
        
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'date' => 'required|date|after_or_equal:today',
            'location' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'is_published' => 'boolean'
        ]);
        
        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }
        
        // Create event
        $event = Evenment::create([
            'title' => $request->title,
            'description' => $request->description,
            'date' => $request->date,
            'location' => $request->location,
            'category_id' => $request->category_id,
            'is_published' => $request->has('is_published') ? $request->is_published : false,
            'created_by' => $user->id
        ]);
        
        // Load relationships
        $event->load('category', 'creator');
        
        return response()->json([
            'status' => 'success',
            'message' => 'Event created successfully',
            'data' => $event
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $user = Auth::user();
        
        if (!$user->hasRole('Admin') && !$user->hasRole('Employee')) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized. Only administrators and employees can update events'
            ], 403);
        }
        
        $event = Evenment::find($id);
        
        if (!$event) {
            return response()->json([
                'status' => 'error',
                'message' => 'Event not found'
            ], 404);
        }
        
        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'date' => 'sometimes|required|date',
            'location' => 'sometimes|required|string|max:255',
            'category_id' => 'sometimes|required|exists:categories,id',
            'is_published' => 'boolean'
        ]);
        
        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }
        
        $event->update($request->all());
        
        $event->load('category', 'creator');
        
        return response()->json([
            'status' => 'success',
            'message' => 'Event updated successfully',
            'data' => $event
        ]);
    }

    public function destroy($id)
    {
        $user = Auth::user();
        
        if (!$user->hasRole('Admin')) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized. Only administrators can delete events'
            ], 403);
        }
        
        $event = Evenment::find($id);
        
        if (!$event) {
            return response()->json([
                'status' => 'error',
                'message' => 'Event not found'
            ], 404);
        }
        
        $event->delete();
        
        return response()->json([
            'status' => 'success',
            'message' => 'Event deleted successfully'
        ]);
    }


    public function upcoming(Request $request)
    {
        $limit = $request->get('limit', 5);
        
        $events = Evenment::with('category')
            ->where('is_published', true)
            ->where('date', '>=', now())
            ->orderBy('date', 'asc')
            ->limit($limit)
            ->get();
        
        return response()->json([
            'status' => 'success',
            'data' => $events
        ]);
    }

    public function togglePublish($id)
    {
        $user = Auth::user();
        
        if (!$user->hasRole('Admin') && !$user->hasRole('Employee')) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized. Only administrators and employees can publish/unpublish events'
            ], 403);
        }
        
        $event = Evenment::find($id);
        
        if (!$event) {
            return response()->json([
                'status' => 'error',
                'message' => 'Event not found'
            ], 404);
        }
        
        // Toggle is_published
        $event->is_published = !$event->is_published;
        $event->save();
        
        $status = $event->is_published ? 'published' : 'unpublished';
        
        return response()->json([
            'status' => 'success',
            'message' => "Event {$status} successfully",
            'data' => $event
        ]);
    }
}

