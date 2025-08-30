import { usePage } from '@inertiajs/react';

interface PageProps {
    auth: {
        user: User | null;
    };
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    roles: string[];
    permissions: string[];
}

export function hasRole(role: string) {
    const {
        auth: { user },
    } = usePage<PageProps>().props;
    if (!user) return false;

    console.log(user)
    
    return user.roles?.includes(role);
}

export function hasPermission(permission: string) {
      const {
        auth: { user },
    } = usePage<PageProps>().props;
    if (!user) return false;
    
    return user.permissions?.includes(permission);
}
