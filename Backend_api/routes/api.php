<?php

use App\Http\Controllers\Api\V1\JwtAuthController;
use Illuminate\Support\Facades\Route;



Route::post('register', [JwtAuthController::class, 'register']);
Route::post('login', [JwtAuthController::class, 'login']);


Route::middleware('jwtauth')->group(function () {
    Route::get('user', [JwtAuthController::class, 'getUser']);
    Route::post('logout', [JwtAuthController::class, 'logout']);
    Route::post('refresh', [JwtAuthController::class, 'refresh']);
    Route::put('profile', [JwtAuthController::class, 'updateProfile']);

});


Route::get('users',[\App\Http\Controllers\Api\V1\UserController::class, 'index']);

