import Filter from '@/components/filter';
import PageSize from '@/components/page-size';
import PaginationComp from '@/components/pagination';
import Search from '@/components/search';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Userl, columns } from './columns';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: '/users',
    },
];

interface Links {
    url: string | null;
    label: string;
    active: boolean;
    page: number | null;
}

interface PaginatedData {
    data: Userl[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: Links[];
}

interface UsersPageProps {
    users: PaginatedData;
    filters: any;
}

export default function Index({ users, filters }: UsersPageProps) {
    console.log(users);
    console.log(filters);
    const current = users?.current_page;
    const last = users?.last_page;
    const perPage = users?.per_page ?? 10;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold">User</h1>
                    <Button>Add User</Button>
                </div>

                <div className="flex">
                    <div className="mr-auto">
                        <Search />
                    </div>
                    <Filter />
                </div>

                <DataTable columns={columns} data={users?.data} />

                {/* Page size */}
                <PageSize perPage={perPage} />

                <PaginationComp current={current} last={last} perPage={perPage} />
            </div>
        </AppLayout>
    );
}
