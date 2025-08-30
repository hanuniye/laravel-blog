<?php

namespace App\Providers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Inertia::share([
            'auth' => function () {
                if (!Auth::check()) {
                    return ['user' => null];
                }

                $user = Auth::user();

                // Get role names
                $roles = $user->roles()->pluck('name')->values();

                // Derive permission names THROUGH roles (no direct user->permissions)
                $permissions = $user->roles()
                    ->with('permissions:id,name')      // eager-load permissions for each role
                    ->get()
                    ->pluck('permissions')             // collection of collections
                    ->flatten()
                    ->pluck('name')
                    ->unique()
                    ->values();

                return [
                    'user' => [
                        'id' => $user->id,
                        'name' => $user->name,
                        'email' => $user->email,
                        'roles' => $roles,              // e.g. ['admin', 'editor']
                        'permissions' => $permissions,  // derived from roles, e.g. ['create-post', 'edit-post']
                    ],
                ];
                
            },
        ]);
    }
}
