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

class AuthController extends Controller
{
    protected $rabbitMQService;
    
    public function __construct(RabbitMQService $rabbitMQService)
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
        $this->rabbitMQService = $rabbitMQService;
    }

    // Inscription
    public function register(RegistrationRequest $request)
    {
        // Le RegistrationRequest possède déjà ses propres règles de validation, 
        // donc nous n'avons pas besoin de les redéfinir ici
        
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'citizen', // Par défaut, un nouvel utilisateur est un citoyen
            'status' => 'pending', // Le statut par défaut est "en attente"
            'phone' => $request->phone,
            'address' => $request->address,
        ]);

        // Publier un événement d'inscription via RabbitMQ
        $this->rabbitMQService->publishUserEvent(
            'user.registered', 
            [
                'user_id' => $user->id,
                'email' => $user->email,
                'name' => $user->name,
                'role' => $user->role,
                'timestamp' => now()->toIso8601String(),
            ]
        );

        // Si l'utilisateur doit être approuvé, ne pas générer de token immédiatement
        if ($user->status === 'pending') {
            return response()->json([
                'message' => 'Registration successful. Your account is pending approval.',
                'user' => $user
            ], 201);
        }

        // Sinon, générer un token et le renvoyer
        $token = auth()->login($user);
        return $this->respondWithToken($token);
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
        $this->rabbitMQService->publishUserEvent(
            'user.logged_in', 
            [
                'user_id' => $user->id,
                'email' => $user->email,
                'timestamp' => now()->toIso8601String(),
            ]
        );

        return $this->respondWithToken($token);
    }

    // Déconnexion
    public function logout()
    {
        $user = auth()->user();
        
        // Publier un événement de déconnexion
        $this->rabbitMQService->publishUserEvent(
            'user.logged_out', 
            [
                'user_id' => $user->id,
                'email' => $user->email,
                'timestamp' => now()->toIso8601String(),
            ]
        );
        
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