<?php

use App\Http\Controllers\Api\V1\JwtAuthController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Public routes
Route::post('register', [JwtAuthController::class, 'register']);
Route::post('login', [JwtAuthController::class, 'login']);

// Protected routes
Route::middleware('jwtauth')->group(function () {
    Route::get('user', [JwtAuthController::class, 'getUser']);
    Route::post('logout', [JwtAuthController::class, 'logout']);
    Route::post('refresh', [JwtAuthController::class, 'refresh']);
    Route::put('profile', [JwtAuthController::class, 'updateProfile']);
    
    // Autres routes protégées pour votre application de gestion communale
    // Routes pour les requêtes citoyennes
    // Route::apiResource('requests', RequestController::class);
    
    // Routes pour les événements
    // Route::apiResource('events', EventController::class);
    
    // Routes pour les notifications
    // Route::apiResource('notifications', NotificationController::class);
});