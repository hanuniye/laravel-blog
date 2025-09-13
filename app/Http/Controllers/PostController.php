<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Post::query();

        // 🔍 Search by name
        if ($search = $request->input('search')) {
            $query->where('title', 'like', "%{$search}%");
        }

        $perPage = (int) $request->input('per_page', 10);

        // 📄 Paginate with per_page (default 10)
        $posts = $query->with(['category:id,name', 'user:id,name'])->latest()->paginate(
            $perPage
        )->appends($request->all()); //Notice .appends($request->all()) → this is the key to keeping search + filters during pagination.

        return Inertia::render('posts/index', [
            'posts' => $posts,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::all()->select('name', 'id');
        return Inertia::render('posts/create', [
            'categories' => $categories
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'category_id' => 'required|exists:categories,id',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:5120', // 5MB
        ]);

        // dd($validated);
        
        $path = null;
        
        if ($request->hasFile('image')) {
            // generate unique random filename
            $filename = uniqid() . '.' . $request->file('image')->extension();
            $path = $request->file('image')->storeAs('posts', $filename, 'public');
        }
        
        // dd($validated);
        Post::create([
            'title' => $validated['title'],
            'content' => $validated['content'],
            'category_id' => (int) $validated['category_id'],
            'user_id' => auth()->id(),
            'image_path' => $path,
            'published' => false,
        ]);

        return redirect()->route('posts.index')->with('success', 'Post created!');
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
