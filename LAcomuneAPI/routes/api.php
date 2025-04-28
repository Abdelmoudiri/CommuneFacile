<?php

use App\Http\Controllers\Api\V1\AuthController;
use Illuminate\Support\Facades\Route;

Route::post('register',[AuthController::class,'register']);
Route::post('login',[AuthController::class,'login']);
Route::middleware(['auth:'])->group(function () {
Route::post('logout',[AuthController::class,'logout']);
Route::post('refresh',[AuthController::class,'refresh']);
Route::post('forgot-password',[AuthController::class,'forgot']);
Route::post('reset-password',[AuthController::class,'reste']);
Route::post('verify-email',[AuthController::class,'verifyEmail']);
});