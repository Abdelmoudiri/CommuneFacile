<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\Profile;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{

    public function index()
    {
        $users = User::with(['role', 'profile'])->get();

        return response()->json([
            'status' => 'success',
            'data' => $users,
        ]);
    }

    public function show($id)
    {
        $user = User::with(['role', 'profile'])->find($id);
        
        if (!$user) {
            return response()->json([
                'status' => 'error',
                'message' => 'User not found'
            ], 404);
        }
        
        return response()->json([
            'status' => 'success',
            'data' => $user
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
            'role_id' => 'required|exists:roles,id', 
            'address' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'date_of_birth' => 'required|date',
            'cin' => 'required|string|max:20',
        
        ]);
        
        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }
        
        try {
            $role = Role::where('id', $request->role)->first();
            if (!$role) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Role not found'
                ], 404);
            }
            
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role_id' => $role->id,
                'is_active' => true,
            ]);
            
            $profile = Profile::create([
                'user_id' => $user->id,
                'address' => $request->address,
                'phone' => $request->phone,
                'date_of_birth' => $request->date_of_birth,
                'cin' => $request->cin,
            ]);
            
            $user->load(['role', 'profile']);
            
            return response()->json([
                'status' => 'success',
                'message' => 'User created successfully',
                'data' => $user
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to create user',
                'error' => $e->getMessage()
            ], 500);
        }
    }


}
