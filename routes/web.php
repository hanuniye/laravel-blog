<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\RolePermissionController;
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

    Route::prefix('categories')->controller(CategoryController::class)->group(function () {
        Route::get('/', 'index')->name('categories.index');
        Route::post('/', 'store')->name('categories.store');
        Route::delete('/{id}', 'destroy')->name('categories.destroy');
        Route::patch('/{id}', 'update')->name('categories.update');
    });

    Route::prefix('permissions')->controller(PermissionController::class)->group(function () {
        Route::get('/', 'index')->name('permissions.index');
        Route::post('/', 'store')->name('permissions.store');
        Route::get('/create', 'create')->name('permissions.create');
        Route::get('/{id}/edit', 'edit')->name('permissions.edit');
        Route::delete('/{id}', 'destroy')->name('permissions.destroy');
        Route::patch('/{id}', 'update')->name('permissions.update');
    });

    Route::prefix('roles')->controller(RoleController::class)->group(function () {
        Route::get('/', 'index')->name('roles.index');
        Route::post('/', 'store')->name('roles.store');
        Route::get('/create', 'create')->name('roles.create');
        Route::get('/{id}/edit', 'edit')->name('roles.edit');
        Route::delete('/{id}', 'destroy')->name('roles.destroy');
        Route::patch('/{id}', 'update')->name('roles.update');
    });

    Route::prefix('posts')->controller(PostController::class)->group(function () {
        Route::get('/', 'index')->name('posts.index');
        Route::post('/', 'store')->name('posts.store');
        Route::get('/create', 'create')->name('posts.create');
        Route::get('/{id}/edit', 'edit')->name('posts.edit');
        Route::delete('/{id}', 'destroy')->name('posts.destroy');
        Route::patch('/{id}', 'update')->name('posts.update');
    });


    Route::prefix('roles-permissions')->controller(RolePermissionController::class)->group(function () {
        Route::get('/', 'index')->name('roles.permissions.index');
        Route::post('/update', 'update')->name('roles.permissions.update');
    });



    Route::prefix('users')->controller(UserController::class)->group(function () {
        Route::get('/', 'index')->name('users.index');
    });
});




require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
