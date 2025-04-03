<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use App\Http\Middleware\JwtMiddleware;
use App\Http\Middleware\CheckRole;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->alias([
            'jwt' => \App\Http\Middleware\JwtMiddleware::class,
            'role' => \App\Http\Middleware\CheckRole::class,
        ]);
        // Si vous avez besoin de middlewares globaux
        // $middleware->append([
        //     \Illuminate\Http\Middleware\HandleCors::class,
        // ]);
        
        // Ajouter d'autres configurations middleware si nécessaire
    })
    ->withExceptions(function (Exceptions $exceptions) {
        // ...
    })->create();
