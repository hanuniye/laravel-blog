<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class RoleController extends Controller
{
    public function index(Request $request)
    {
        $query = Role::query();

        // 🔍 Search by name
        if ($search = $request->input('search')) {
            $query->where('name', 'like', "%{$search}%");
        }

        $perPage = (int) $request->input('per_page', 10);

        // 📄 Paginate with per_page (default 10)
        $roles = $query->withCount('permissions')->latest()->paginate(
            $perPage
        )->appends($request->all()); //Notice .appends($request->all()) → this is the key to keeping search + filters during pagination.

        return Inertia::render('roles/index', [
            'roles' => $roles,
        ]);
    }

    public function create()
    {
        return Inertia::render('roles/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:' . (new Role)->getTable() . ',name'
        ]);

        Role::create($validated);

        return redirect()->route('roles.index')->with('success', 'Role created.');
    }

    public function edit($id)
    {
        $role = Role::findOrFail($id);

        return Inertia::render('roles/edit', [
            'role' => $role
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', Rule::unique('roles', 'name')->ignore($id),]
        ]);

        $role = Role::findOrFail($id);

        $role->update($validated);

        return redirect()->route('roles.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $role = Role::findOrFail($id);

        if ($role->permissions()->count() > 0) {
            return redirect()->route('roles.index')->with('error', 'this role is associated with posts');
        }

        $role->delete();
        return redirect()->route('roles.index')->with('success', 'Role deleted.');
    }
}
