<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('posts', function (Blueprint $table) {
            // Blog-specific fields
            $table->unsignedInteger('likes')->default(0);           // total likes
            $table->unsignedInteger('comments_count')->default(0);  // total comments
            $table->unsignedInteger('read_time')->nullable();       // in minutes
            $table->json('tags')->nullable();                        // ["Laravel","Inertia"]
            $table->json('liked_users')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('posts', function (Blueprint $table) {
            $table->dropColumn(['likes', 'comments_count', 'read_time', 'tags', 'liked_users']);
        });
    }
};
