import PageSize from '@/components/page-size';
import PaginationComp from '@/components/pagination';
import Search from '@/components/search';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { PermissionsColumn, columns } from './components/columns';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Permissions',
        href: '/permissions',
    },
];

interface Links {
    url: string | null;
    label: string;
    active: boolean;
    page: number | null;
}

interface PaginatedData {
    data: PermissionsColumn[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: Links[];
}

interface RolePageProps {
    permissions: PaginatedData;
}

interface PageProps {
    flash: {
        success?: string;
        error?: string;
    };
    [key: string]: unknown;
}

export default function Index({ permissions }: RolePageProps) {
    const {
        flash: { success },
    } = usePage<PageProps>().props;

    const current = permissions?.current_page;
    const last = permissions?.last_page;
    const perPage = permissions?.per_page ?? 10;

    useEffect(() => {
        if (success) {
            toast.success(success);
        }
    }, [success]);

    // const onOpen = () => {
    //     setIsOpen(true);
    // };

    // const onClose = () => {
    //     setIsOpen(false);
    // };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold">Permissions</h1>
                    <Button>
                        <Link href={route('permissions.create')}>Add Permission</Link>
                    </Button>
                </div>

                <div className="flex items-center justify-between">
                    <Search />
                    {/* <Filters status={filters.status} year={filters.year} /> */}
                </div>

                <DataTable columns={columns} data={permissions?.data} />

                {/* Page size */}
                <PageSize perPage={perPage} />

                <PaginationComp current={current} last={last} perPage={perPage} />
            </div>

            {/* <PermissionModal isOpen={isOpen} onClose={onClose} /> */}
        </AppLayout>
    );
}
