<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostsController;
use Illuminate\Support\Facades\Storage;

Route::post('/create',[PostsController::class, 'create']);
Route::get('/posts',[PostsController::class, 'get']);
Route::post('/posts', [PostsController::class, 'store']);
Route::put('/posts/{id}',[PostsController::class, 'update']);
Route::delete('/posts/{id}',[PostsController::class, 'destroy']);
Route::get('images/{filename}', function ($filename) {
    return response()->file(Storage::path('public/images/' . $filename));
})->where('filename', '[\w\d\._-]+');
