<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostStoreRequest;
use App\Http\Requests\PostUpdateRequest;
use App\Models\Category;
use App\Models\Post;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PostController extends Controller
{
    use AuthorizesRequests; // if we want to use ($this->authorize(action, model)) in methods we have to //AuthorizesRequests//

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Post::query();
        $perPage = (int) $request->input('per_page', 10);

        // 🔍 Search by name
        if ($search = $request->input('search')) {
            $query->where('title', 'like', "%{$search}%");
        }

        // 📄 Paginate with per_page (default 10)
        $posts = $query
            ->with(['category:id,name', 'user:id,name'])
            ->latest()
            ->paginate($perPage)
            ->appends($request->all()); // Notice .appends($request->all()) → this function is to keeping filters during pagination.

        return Inertia::render('posts/index', [
            'posts' => $posts,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $this->authorize('create', Post::class);
        $categories = Category::all()->select('name', 'id');

        return Inertia::render('posts/create', [
            'categories' => $categories,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PostStoreRequest $request)
    {
        $this->authorize('create', Post::class);
        $data = $request->validated();

        $readTime = ceil(str_word_count(strip_tags($data['content'])) / 200);
        $path = null;

        if ($request->hasFile('image')) {
            // generate unique random filename
            $filename = uniqid().'.'.$request->file('image')->extension();
            $path = $request->file('image')->storeAs('posts', $filename, 'public');
        }

        Post::create(attributes: [
            ...$data,
            'category_id' => (int) $data['category_id'],
            'user_id' => auth()->id(),
            'image_path' => $path,
            'published' => false,
            'tags' => $data['tags'] ?? [],
            'likes' => 0,
            'comments_count' => 0,
            'read_time' => $readTime,
            'liked_users' => [],
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
    public function edit($id)
    {
        $this->authorize('create', Post::class);

        return Inertia::render('posts/edit', [
            'postData' => Post::findOrFail($id, ['id', 'category_id', 'image_path', 'content', 'title', 'published']),
            'categories' => Category::all()->select(['id', 'name']),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PostUpdateRequest $request, $id)
    {
        $post = Post::findOrFail($id);

        $this->authorize('update', $post);
        $data = $request->validated();

        // Handle new uploaded image
        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($post->image_path && Storage::disk('public')->exists($post->image_path)) {
                Storage::disk('public')->delete($post->image_path);
            }

            $filename = uniqid().'.'.$request->file('image')->extension();
            // Store new image
            $data['image_path'] = $request->file('image')->storeAs('posts', $filename, 'public');
        } else {
            // Keep old image if no new file uploaded
            $data['image_path'] = $post->image_path;
        }

        $data['category_id'] = (int) $data['category_id'];

        // Update post
        $post->update($data);

        // dd($updated);
        return redirect()->route('posts.index')->with('success', 'Post updated!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $post = Post::findOrFail($id);
        $this->authorize('delete', $post);

        if ($post->image_path) {
            Storage::disk('public')->delete($post->image_path);
        }

        $post->delete();

        return redirect()->route('posts.index')->with('success', 'Post deleted!');
    }

    // Toggle like/unlike
    public function toggleLike(Post $post)
    {
        if (! Auth::check()) {
            abort(401, 'Unauthenticated');
        }

        $userId = auth()->id();
        $likedUsers = $post->liked_users ?? [];

        if (in_array($userId, $likedUsers)) {
            // Unlike
            $likedUsers = array_diff($likedUsers, [$userId]);
            $post->decrement('likes');
            $isLiked = false;
        } else {
            // Like
            $likedUsers[] = $userId;
            $post->increment('likes');
            $isLiked = true;
        }

        $post->liked_users = array_values($likedUsers);
        $post->save();

        return response()->json([
            'likes' => $post->likes,
            'isLiked' => $isLiked,
        ]);
    }
}
