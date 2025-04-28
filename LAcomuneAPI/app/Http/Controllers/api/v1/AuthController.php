<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Profile;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    //register function

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
            'address' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'date_of_birth' => 'required|date',
            'cin' => 'required|string|max:20',
        ]);

        return "succed";
  
    }

    //login function
    public function login(Request $request)
    {

    }

 
    public function me()
    {
        $user = Auth::guard('api')->user();
        
        // Load role and profile relationships
        $user->load(['role', 'profile']);
        
        return response()->json([
            'status' => 'success',
            'data' => $user
        ]);
    }


    public function refresh()
    {
        return $this->respondWithToken(Auth::guard('api')->refresh());
    }


    public function logout()
    {
 
    }

 
    protected function respondWithToken($token)
    {
        $user = Auth::guard('api')->user();
        $user->load('role');
        
        return response()->json([
            'status' => 'success',
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => Auth::guard('api')->factory()->getTTL() * 60,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role->name,
            ]
        ]);
    }
}
