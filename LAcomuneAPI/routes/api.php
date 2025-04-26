<?php

use App\Http\Controllers\api\v1\AuthController;
use App\Http\Controllers\api\v1\EvenmentController;
use App\Http\Controllers\api\v1\UserController;
use App\Http\Controllers\Api\DocumentRequestController;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\JwtMiddleware;
use Illuminate\Support\Facades\Storage;

// Public routes
Route::post('register', [AuthController::class, 'register']); // This is for citizen registration
Route::post('login', [AuthController::class, 'login']);

// Debug route for storage (temporary)
Route::get('debug-storage', function() {
    return response()->json([
        'storage_path' => storage_path('app/public'),
        'public_path' => public_path('storage'),
        'exists' => Storage::disk('public')->exists('documents'),
        'files' => Storage::disk('public')->files('documents'),
        'directories' => Storage::disk('public')->directories(),
    ]);
});

// Protected routes
Route::middleware(['auth:api'])->group(function () {
    // Auth routes
    Route::get('me', [AuthController::class, 'me']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::post('forgot-password', [AuthController::class, 'forgot']);
    Route::post('reset-password', [AuthController::class, 'reset']);
    Route::post('verify-email', [AuthController::class, 'verifyEmail']);

    // Admin routes
    Route::middleware(['admin'])->group(function () {
        Route::post('admin/register', [AuthController::class, 'register']); // This is for employee registration
        Route::get('users', [UserController::class, 'index']);
        Route::get('users/{id}', [UserController::class, 'show']);
        Route::put('users/{id}', [UserController::class, 'update']);
        Route::delete('users/{id}', [UserController::class, 'destroy']);
        Route::post('users/{id}/toggle-status', [UserController::class, 'toggleStatus']);
        Route::put('users/{id}/role', [UserController::class, 'updateRole']);
    });

    // User routes
    Route::post('users/{id}/change-password', [UserController::class, 'changePassword']);

    // Events routes
    Route::get('evenments', [EvenmentController::class, 'index']);
    Route::get('evenments/{id}', [EvenmentController::class, 'show']);
    Route::post('evenments', [EvenmentController::class, 'store']);
    Route::put('evenments/{id}', [EvenmentController::class, 'update']);
    Route::delete('evenments/{id}', [EvenmentController::class, 'destroy']);
    Route::get('evenments/upcoming', [EvenmentController::class, 'upcoming']);
    Route::post('evenments/{id}/toggle-publish', [EvenmentController::class, 'togglePublish']);



    // Document Request routes
    Route::get('document-requests', [DocumentRequestController::class, 'index']);
    Route::post('document-requests', [DocumentRequestController::class, 'store']);
    Route::get('document-requests/{id}', [DocumentRequestController::class, 'show']);
    Route::post('document-requests/{id}/process', [DocumentRequestController::class, 'process']);
    Route::delete('document-requests/{id}', [DocumentRequestController::class, 'destroy']);
    Route::get('document-requests/{documentRequest}/download', [DocumentRequestController::class, 'downloadDocument']);
});
