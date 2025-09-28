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


export function usePermission() {
  const { auth } = usePage<PageProps>().props;

  const hasPermission = (permission: string) => {
    return auth?.user?.permissions?.includes(permission);
  };

  const hasAnyPermission = (permissions = []) => {
    return permissions.some((p) => hasPermission(p));
  };

  const hasRole = (role: string) => {
    return auth?.user?.roles?.includes(role);
  };

  return { hasPermission, hasAnyPermission, hasRole };
}
