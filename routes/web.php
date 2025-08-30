<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::prefix('categories')->controller(CategoryController::class)->group(function(){
    Route::get('/',  'index')->name('categories.index');
    Route::get('/{id}/show',  'show')->name('categories.show');
    Route::post('/',  'store')->name('categories.store');
    Route::delete('/{id}',  'destroy')->name('categories.destroy');
    Route::patch('/{id}',  'update')->name('categories.update');
});

Route::prefix('users')->controller(UserController::class)->group(function(){
    Route::get('/',  'index')->name('users.index');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
