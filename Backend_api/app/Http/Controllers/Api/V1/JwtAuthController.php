<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Requests\LogingRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\Profile;
use App\Models\Role;
use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use App\Customs\Services\EmailVerificationService;

class JwtAuthController extends Controller
{
    

    public function __construct(private  EmailVerificationService $emailVerificationService)
    {}
    /**
     * Send success response with data
     *
     * @param mixed $data
     * @param string $message
     * @param int $status
     * @return \Illuminate\Http\JsonResponse
     */
    public function sendResponse($data, $message, $status = 200)
    {
        $response = [
            'data' => $data,
            'message' => $message
        ];
        return response()->json($response, $status);
    }

    /**
     * Send error response
     *
     * @param mixed $errorData
     * @param string $message
     * @param int $status
     * @return \Illuminate\Http\JsonResponse
     */
    public function sendError($errorData, $message, $status = 500)
    {
        $response = [];
        $response['message'] = $message;
        if (!empty($errorData)) {
            $response['data'] = $errorData;
        }
        return response()->json($response, $status);
    }

    /**
     * Register a new user
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(RegisterRequest $request)
    {
        $input = $request->validated();

        $input['password'] = bcrypt($input['password']);
        $input['role_id'] = $input['role_id'] ?? 3;

        unset($input['c_password']);

        $user = User::create($input);

        $this->emailVerificationService->sendVerificationEmail($user);

        $token = JWTAuth::fromUser($user);

        $success = [
            'user' => $user,
            'token' => $token
        ];

        return $this->sendResponse($success, 'User registered successfully', 201);
    }
    /**
     * User login
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */

    public function login(LogingRequest $request)
    {
        $credentials = $request->validated();

        try {
            if (!$token = JWTAuth::attempt($credentials)) {
                return $this->sendError([], "Invalid login credentials", 400);
            }
        } catch (JWTException $e) {
            return $this->sendError([], $e->getMessage(), 500);
        }

        $user = auth()->user();

        $success = [
            'token' => $token,
            'user' => $user,
            'expires_in' => auth('api')->factory()->getTTL() * 60
        ];

        return $this->sendResponse($success, 'Successful login', 200);
    }

    /**
     * Get authenticated user
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getUser()
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
            if (!$user) {
                return $this->sendError([], "User not found", 401);
            }
        } catch (TokenExpiredException $e) {
            return $this->sendError([], 'Token expired', 401);
        } catch (TokenInvalidException $e) {
            return $this->sendError([], 'Token invalid', 401);
        } catch (JWTException $e) {
            return $this->sendError([], $e->getMessage(), 500);
        }

        return $this->sendResponse($user, "User data retrieved", 200);
    }

    /**
     * Logout user (invalidate token)
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        try {
            JWTAuth::invalidate(JWTAuth::getToken());
            return $this->sendResponse([], 'User logged out successfully');
        } catch (JWTException $e) {
            return $this->sendError([], $e->getMessage(), 500);
        }
    }

    /**
     * Refresh token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        try {
            $token = JWTAuth::getToken();
            if (!$token) {
                return $this->sendError([], 'Token not provided', 401);
            }

            $token = JWTAuth::refresh($token);
            $user = JWTAuth::setToken($token)->toUser();

            $success = [
                'token' => $token,
                'user' => $user,
                'expires_in' => auth('api')->factory()->getTTL() * 60
            ];

            return $this->sendResponse($success, 'Token refreshed successfully');
        } catch (TokenExpiredException $e) {
            return $this->sendError([], 'Token has expired and cannot be refreshed', 401);
        } catch (JWTException $e) {
            return $this->sendError([], $e->getMessage(), 500);
        }
    }

   
    public function updateProfile(Request $request)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();

            $validator = Validator::make($request->all(), [
                'name' => 'sometimes|required|string|max:255',
                'email' => 'sometimes|required|email|unique:users,email,' . $user->id,
                'password' => 'sometimes|required|min:8',
                'c_password' => 'required_with:password|same:password',
            ]);

            if ($validator->fails()) {
                return $this->sendError($validator->errors(), 'Validation Error', 422);
            }

            if ($request->has('name')) {
                $user->name = $request->name;
            }

            if ($request->has('email')) {
                $user->email = $request->email;
            }

            if ($request->has('password')) {
                $user->password = bcrypt($request->password);
            }

            $user->save();

            return $this->sendResponse($user, 'Profile updated successfully');

        } catch (JWTException $e) {
            return $this->sendError([], $e->getMessage(), 500);
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
}