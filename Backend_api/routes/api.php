<?php

use App\Http\Controllers\Api\V1\JwtAuthController;
use Illuminate\Support\Facades\Route;


// Public routes
Route::post('register', [JwtAuthController::class, 'register']);
Route::post('login', [JwtAuthController::class, 'login']);

// Protected routes
Route::middleware('jwtauth')->group(function () {
    Route::get('user', [JwtAuthController::class, 'getUser']);
    Route::post('logout', [JwtAuthController::class, 'logout']);
    Route::post('refresh', [JwtAuthController::class, 'refresh']);
    Route::put('profile', [JwtAuthController::class, 'updateProfile']);
    
});

Route::get("all_user",[ProfileFactory::class,"index"]);