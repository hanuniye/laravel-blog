import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface SharedAuth {
    user: User;
}

export interface SharedFlash {
    success?: string | null;
    error?: string | null;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface PageProps {
    name: string;
    quote: { message: string; author: string };
    auth: SharedAuth;
    flash: SharedFlash;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    role: string[];
    permissions: string[];
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface BlogPost {
    id: string;
    title: string;
    content: string;
    excerpt: string;
    author: {
        id: string;
        name: string;
        avatar: string;
    };
    createdAt: string;
    updatedAt: string;
    likes: number;
    isLiked: boolean;
    commentsCount: number;
    readTime: number;
    tags: string[];
}

export interface Comment {
    id: string;
    content: string;
    author: {
        id: string;
        name: string;
        avatar: string;
    };
    createdAt: string;
    updatedAt: string;
    likes: number;
    isLiked: boolean;
    postId: string;
}
