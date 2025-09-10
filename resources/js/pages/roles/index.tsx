import PageSize from '@/components/page-size';
import PaginationComp from '@/components/pagination';
import Search from '@/components/search';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { RoleColumn, columns } from './components/columns';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Roles',
        href: '/categories',
    },
];

interface Links {
    url: string | null;
    label: string;
    active: boolean;
    page: number | null;
}

interface PaginatedData {
    data: RoleColumn[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: Links[];
}

interface RolePageProps {
    roles: PaginatedData;
}

interface PageProps {
    flash: {
        success?: string;
        error?: string;
    };
    [key: string]: unknown;
}

export default function Index({ roles }: RolePageProps) {
    const {
        flash: { success },
    } = usePage<PageProps>().props;

    const current = roles?.current_page;
    const last = roles?.last_page;
    const perPage = roles?.per_page ?? 10;

    useEffect(() => {
        if (success) {
            toast.success(success);
        }
    }, [success]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold">Roles</h1>
                    <Button onClick={() => router.visit(route('roles.create'))}>Add Role</Button>
                </div>

                <div className="flex items-center justify-between">
                    <Search />
                    {/* <Filters status={filters.status} year={filters.year} /> */}
                </div>

                <DataTable columns={columns} data={roles?.data} />

                {/* Page size */}
                <PageSize perPage={perPage} />

                <PaginationComp current={current} last={last} perPage={perPage} />
            </div>
        </AppLayout>
    );
}
