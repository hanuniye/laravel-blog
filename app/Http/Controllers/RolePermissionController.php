<?php

namespace App\Http\Controllers;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RolePermissionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $roles = Role::with('permissions:id')->get(['id', 'name']);
        $permissions = Permission::all(['id', 'name']);

        return Inertia::render('permissionsmatrix/index', [
            'roles' => $roles,
            'permissions' => $permissions,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $data = $request->validate([
            'matrix' => 'required|array',
            'matrix.*.roleId' => 'required|exists:roles,id',
            'matrix.*.permissions' => 'array',
            'matrix.*.permissions.*' => 'exists:permissions,id',
        ]);

        $roleIds = collect($data['matrix'])->pluck('roleId')->toArray();
        $roles = Role::whereIn('id', $roleIds)->get()->keyBy('id');

        foreach ($data['matrix'] as $roleData) {
            if (!isset($roles[$roleData['roleId']])) {
                continue;
            }

            $roles[$roleData['roleId']]
                ->permissions()
                ->sync($roleData['permissions'] ?? []);
        }


        return redirect()->back()->with('success', 'Permissions updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
