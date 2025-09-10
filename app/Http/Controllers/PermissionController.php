<?php

namespace App\Http\Controllers;

use App\Models\Permission;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class PermissionController extends Controller
{
    public function index(Request $request)
    {
        $query = Permission::query();

        // 🔍 Search by name
        if ($search = $request->input('search')) {
            $query->where('name', 'like', "%{$search}%");
        }

        $perPage = (int) $request->input('per_page', 10);

        // 📄 Paginate with per_page (default 10)
        $permissions = $query->latest()->paginate(
            $perPage
        )->appends($request->all()); //Notice .appends($request->all()) → this is the key to keeping search + filters during pagination.

        return Inertia::render('permissions/index', [
            'permissions' => $permissions,
        ]);
    }

    public function create()
    {
        return Inertia::render('permissions/create');
    }

    public function edit($id)
    {
        $permission = Permission::findOrFail($id);

        return Inertia::render('permissions/edit', [
            'permission' => $permission
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:' . (new Permission)->getTable() . ',name'
        ]);

        Permission::create($validated);

        return redirect()->route('permissions.index')->with('success', 'permission created!');
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', Rule::unique('permissions', 'name')->ignore($id),]
        ]);

        $permission = Permission::findOrFail($id);

        $permission->update($validated);

        return redirect()->route('permissions.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $permission = Permission::findOrFail($id);
        $permission->delete();

        return redirect()->route('permissions.index')->with('success', 'Permission deleted!!');
    }
}
