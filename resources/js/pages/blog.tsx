import { BlogCard } from '@/components/block-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockPosts } from '@/data/mockup';
import { type PageProps } from '@/types';
import { BlogPost } from '@/types/index';
import { Head, Link, usePage } from '@inertiajs/react';
import { Clock, Heart, Search, TrendingUp } from 'lucide-react';
import { useState } from 'react';

export default function Blog({posts}:{ posts: any}) {
    console.log(posts)
    const { auth } = usePage<PageProps>().props;
    const [searchQuery, setSearchQuery] = useState('');

    const handleLike = (postId: string) => {
        // setPosts((prev) =>
        //     prev.map((post) =>
        //         post.id === postId
        //             ? {
        //                   ...post,
        //                   isLiked: !post.isLiked,
        //                   likes: post.isLiked ? post.likes - 1 : post.likes + 1,
        //               }
        //             : post,
        //     ),
        // );

        // const post = posts.find((p) => p.id === postId);
    };

    return (
        <>
            <Head title="blogpost">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
                <header className="mb-6 px-2 w-full text-sm not-has-[nav]:hidden lg:max-w-6xl lg:px-4">
                    <nav className="flex items-center justify-end gap-4">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </header>
                <div className="mx-auto max-w-6xl px-2 py-8 lg:px-4">
                    {/* Search and Filter Section */}
                    <div className="mb-8 flex flex-col gap-4 md:flex-row">
                        <div className="relative flex-1">
                            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
                            <Input
                                placeholder="Search posts, tags, or content..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                    </div>

                    {/* Posts Grid */}
                    {posts?.length > 0 ? (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {posts?.map((post:any) => (
                                <BlogCard key={post?.id} post={post} onLike={handleLike} />
                            ))}
                        </div>
                    ) : (
                        <div className="py-12 text-center">
                            <p className="text-lg text-muted-foreground">No posts found matching your search.</p>
                        </div>
                    )}
                </div>
                <div className="hidden h-14.5 lg:block"></div>
            </div>
        </>
    );
}
