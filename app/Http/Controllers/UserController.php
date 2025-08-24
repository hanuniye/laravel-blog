<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = User::query();

        // ✅ Search
        if ($request->has('search') && $request->search != '') {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%');
                    // ->orWhere('email', 'like', '%' . $request->search . '%');
            });
        }

        // ✅ Example filters
        if ($request->has('role') && $request->role != '') {
            $query->where('role', $request->role);
        }

        if ($request->has('status') && $request->status != '') {
            $query->where('status', $request->status);
        }

        $perPage = (int) $request->input('per_page', 10);
        // 📄 Paginate with per_page (default 10)
        $users = $query->select('id', 'name', 'email', 'status', 'role')->latest()->paginate(
            $perPage
        )->appends($request->all()); //Notice .appends($request->all()) → this is the key to keeping search + filters during pagination.


        return Inertia::render('users/index', [
            'users' => $users,
            'filters' => $request->only(['search', 'per_page', 'page', 'role', 'status']),
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
        //
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
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
