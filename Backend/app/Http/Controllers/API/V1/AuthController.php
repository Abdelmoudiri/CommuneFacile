<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegistrationRequest;
use App\Models\User;
use App\Services\RabbitMQService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    protected $rabbitMQService;
    
    public function __construct(RabbitMQService $rabbitMQService)
    {
        $this->rabbitMQService = $rabbitMQService;
    }

    // Inscription
    public function register(RegistrationRequest $request)
    {
        // // Le RegistrationRequest possède déjà ses propres règles de validation, 
        // // donc nous n'avons pas besoin de les redéfinir ici
        
        // $user = User::create([
        //     'name' => $request->name,
        //     'email' => $request->email,
        //     'password' => Hash::make($request->password),
        //     'role' => 'citizen', // Par défaut, un nouvel utilisateur est un citoyen
        //     'status' => 'pending', // Le statut par défaut est "en attente"
        //     'phone' => $request->phone,
        //     'address' => $request->address,
        // ]);

        // // Publier un événement d'inscription via RabbitMQ
        // try {
        //     $published = $this->rabbitMQService->publishUserEvent(
        //         'user.registered', 
        //         [
        //             'user_id' => $user->id,
        //             'email' => $user->email,
        //             'name' => $user->name,
        //             'role' => $user->role,
        //             'timestamp' => now()->toIso8601String(),
        //         ]
        //     );
            
        //     if (!$published) {
        //         // Log the failure but continue with registration
        //         Log::warning('Failed to publish registration event to RabbitMQ for user: ' . $user->id);
        //     }
        // } catch (\Exception $e) {
        //     // Log the exception but continue with registration
        //     Log::error('Exception when publishing registration event: ' . $e->getMessage());
        // }

        // // Si l'utilisateur doit être approuvé, ne pas générer de token immédiatement
        // if ($user->status === 'pending') {
        //     return response()->json([
        //         'message' => 'Registration successful. Your account is pending approval.',
        //         'user' => $user
        //     ], 201);
        // }

        // // Sinon, générer un token et le renvoyer
        // $token = auth()->login($user);
        // return $this->respondWithToken($token);
        return "grrr";
    }

    // Connexion
    public function login(LoginRequest $request)
    {
        $credentials = $request->only('email', 'password');

        if (!$token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Invalid credentials'], 401);
        }

        $user = Auth::user();
        
        // Vérifier si le compte est actif
        if ($user->status !== 'active') {
            Auth::logout();
            return response()->json([
                'error' => 'Your account is not active',
                'status' => $user->status
            ], 403);
        }

        // Publier un événement de connexion via RabbitMQ
        try {
            $published = $this->rabbitMQService->publishUserEvent(
                'user.logged_in', 
                [
                    'user_id' => $user->id,
                    'email' => $user->email,
                    'timestamp' => now()->toIso8601String(),
                ]
            );
            
            if (!$published) {
                // Log the failure but continue with login
                Log::warning('Failed to publish login event to RabbitMQ for user: ' . $user->id);
            }
        } catch (\Exception $e) {
            // Log the exception but continue with login
            Log::error('Exception when publishing login event: ' . $e->getMessage());
        }

        return $this->respondWithToken($token);
    }

    // Déconnexion
    public function logout()
    {
        $user = auth()->user();
        
        // Publier un événement de déconnexion
        try {
            $published = $this->rabbitMQService->publishUserEvent(
                'user.logged_out', 
                [
                    'user_id' => $user->id,
                    'email' => $user->email,
                    'timestamp' => now()->toIso8601String(),
                ]
            );
            
            if (!$published) {
                // Log the failure but continue with logout
                Log::warning('Failed to publish logout event to RabbitMQ for user: ' . $user->id);
            }
        } catch (\Exception $e) {
            // Log the exception but continue with logout
            Log::error('Exception when publishing logout event: ' . $e->getMessage());
        }
        
        auth()->logout();
        
        return response()->json(['message' => 'Successfully logged out']);
    }

    // Obtenir le profil utilisateur
    public function me()
    {
        return response()->json(auth()->user());
    }

    // Rafraîchir le token
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    // Renvoyer le token
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'user' => auth()->user() // Inclure les données utilisateur
        ]);
    }
}