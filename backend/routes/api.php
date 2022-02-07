<?php

use App\Http\Controllers\Todos\TodoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->group(function () {

    Route::get('/user', fn (Request $request) => $request->user());

    Route::get('/todos', [TodoController::class, 'index']);
    Route::post('/todos', [TodoController::class, 'store']);
    Route::get('/todos/{todo}', [TodoController::class, 'show'])
        ->can('view', 'todo');
    Route::patch('/todos/{todo}', [TodoController::class, 'update'])
        ->can('update', 'todo');
    Route::delete('/todos/{todo}', [TodoController::class, 'destroy'])
        ->can('delete', 'todo');
});
