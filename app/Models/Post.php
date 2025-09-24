<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $fillable = ['title', 'content', 'category_id', 'user_id', 'image_path', 'published', 'likes', 'comments_count', 'read_time', 'tags', 'liked_users'];

    protected $casts = [
        'tags' => 'array',        // JSON → PHP array
        'liked_users' => 'array', // JSON → PHP array
    ];

    // Helper to check if current user liked the post
    public function isLikedByCurrentUser(): bool
    {
        return in_array(auth()->id(), $this->liked_users ?? []);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
