<?php

use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Contollers\Api\v1\ProfileController;
use App\Http\Contollers\Api\v1\EvenmentController;
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
Route::middleware(['auth:api'])->group(function () {
    Route::get('evenments', [EvenmentController::class, 'index']);
    Route::get('evenments/{id}', [EvenmentController::class, 'show']);
    Route::post('evenments', [EvenmentController::class, 'store']);
    Route::put('evenments/{id}', [EvenmentController::class, 'update']);
    Route::delete('evenments/{id}', [EvenmentController::class, 'destroy']);
    Route::get('evenments/upcoming', [EvenmentController::class, 'upcoming']);
    Route::post('evenments/{id}/toggle-publish', [EvenmentController::class, 'togglePublish']);
});

Route::middleware(['auth:api'])->group(function () {
    Route::get('profiles', [ProfileController::class, 'index']);
    Route::get('profiles/{id}', [ProfileController::class, 'show']);
    Route::post('profiles', [ProfileController::class, 'store']);
    Route::put('profiles/{id}', [ProfileController::class, 'update']);
    Route::delete('profiles/{id}', [ProfileController::class, 'destroy']);
});
