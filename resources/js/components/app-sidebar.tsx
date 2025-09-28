import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { usePermission } from '@/hooks/use-permission';
import { NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, FolderPlus, Home, PenSquare } from 'lucide-react';
import AppLogo from './app-logo';

const adminNavItems: NavItem[] = [
    {
        title: 'Posts',
        href: '/posts',
        icon: PenSquare,
    },
    {
        title: 'Categories',
        href: '/categories',
        icon: FolderPlus,
    },
    {
        title: 'Users',
        href: '/users',
        icon: FolderPlus,
    },
    {
        title: 'Roles',
        href: '/roles',
        icon: FolderPlus,
    },
    {
        title: 'Permissions',
        href: '/permissions',
        icon: FolderPlus,
    },
    {
        title: 'PermissionsMatrix',
        href: '/roles-permissions',
        icon: FolderPlus,
    },
];

const userNavItems: NavItem[] = [
    {
        title: 'Posts',
        href: '/posts',
        icon: BookOpen,
    },
];

const editorNavItems: NavItem[] = [
    {
        title: 'Posts',
        href: '/posts',
        icon: BookOpen,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Home',
        href: '/',
        icon: Home,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    const { hasRole } = usePermission();
    
    const mainNavItems: NavItem[] = hasRole('admin') ? adminNavItems : hasRole('editor') ? editorNavItems : userNavItems;

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
