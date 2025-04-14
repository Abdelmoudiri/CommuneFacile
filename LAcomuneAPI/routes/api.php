<?php

use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\v1\EvenmentController;
use Illuminate\Support\Facades\Route;
// auth
Route::post('register',[AuthController::class,'register']);
Route::post('login',[AuthController::class,'login']);
Route::middleware(['auth:api'])->group(function () {
    Route::get('me', [AuthController::class, 'me']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::post('forgot-password', [AuthController::class, 'forgot']);
    Route::post('reset-password', [AuthController::class, 'reset']);
    Route::post('verify-email', [AuthController::class, 'verifyEmail']);
});


    // Events
    Route::apiResource('events', EvenmentController::class);
    Route::get('events-upcoming', [EvenmentController::class, 'upcoming']);
    Route::put('events/{id}/toggle-publish', [EvenmentController::class, 'togglePublish']);