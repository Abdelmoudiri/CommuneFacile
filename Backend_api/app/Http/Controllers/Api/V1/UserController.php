<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\Profile;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{

    public function index()
    {
        $users = User::with(['role', 'profile'])->get();
        dd($users);
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

    public function update(Request $request, $id)
    {
        $user = User::find($id);
        
        if (!$user) {
            return response()->json([
                'status' => 'error',
                'message' => 'User not found'
            ], 404);
        }
        
        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|string|email|max:255|unique:users,email,' . $id,
            'password' => 'sometimes|required|string|min:6',
            'role' => 'sometimes|required|string|in:Admin,Employee,Citizen',
            'is_active' => 'boolean',
        ]);
        
        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }
        
        try {
            // Update role if provided
            if ($request->has('role')) {
                $role = Role::where('name', $request->role)->first();
                if (!$role) {
                    return response()->json([
                        'status' => 'error',
                        'message' => 'Role not found'
                    ], 404);
                }
                $user->role_id = $role->id;
            }
            
            // Update user fields
            if ($request->has('name')) {
                $user->name = $request->name;
            }
            
            if ($request->has('email')) {
                $user->email = $request->email;
            }
            
            if ($request->has('password')) {
                $user->password = Hash::make($request->password);
            }
            
            if ($request->has('is_active')) {
                $user->is_active = $request->is_active;
            }
            
            $user->save();
            
            // Update profile if profile fields are provided
            if ($request->has('address') || $request->has('phone') || 
                $request->has('date_of_birth') || $request->has('cin')) {
                
                $profile = $user->profile;
                
                if (!$profile) {
                    // Create profile if it doesn't exist
                    $profile = new Profile(['user_id' => $user->id]);
                }
                
                if ($request->has('address')) {
                    $profile->address = $request->address;
                }
                
                if ($request->has('phone')) {
                    $profile->phone = $request->phone;
                }
                
                if ($request->has('date_of_birth')) {
                    $profile->date_of_birth = $request->date_of_birth;
                }
                
                if ($request->has('cin')) {
                    $profile->cin = $request->cin;
                }
                
                $profile->save();
            }
            
            // Load relationships
            $user->load(['role', 'profile']);
            
            return response()->json([
                'status' => 'success',
                'message' => 'User updated successfully',
                'data' => $user
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to update user',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    //suprime ou active user
    public function toggleActive($id)
    {
        $user = User::find($id);
        
        if (!$user) {
            return response()->json([
                'status' => 'error',
                'message' => 'User not found'
            ], 404);
        }
        
        // Prevent deactivating own account
        if ($user->id === Auth::id()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Cannot deactivate your own account'
            ], 422);
        }
        
        // Toggle active status
        $user->is_active = !$user->is_active;
        $user->save();
        
        $status = $user->is_active ? 'activated' : 'deactivated';
        
        return response()->json([
            'status' => 'success',
            'message' => "User {$status} successfully",
            'data' => $user
        ]);
    }

}
