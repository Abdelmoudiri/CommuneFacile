<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class UserController extends Controller
{
    
    public function index(Request $request)
    {
        $query = User::with(['role', 'profile']);
        
        if ($request->has('role')) {
            $query->whereHas('role', function ($q) use ($request) {
                $q->where('name', $request->role);
            });
        }
        
        $perPage = $request->get('per_page', 10);
        $users = $query->paginate($perPage);
        
        return response()->json([
            'status' => 'success',
            'data' => $users
        ]);
    }

    

}
