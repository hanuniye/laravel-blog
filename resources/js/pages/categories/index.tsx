import CategoryModal from '@/components/modals/category-modal';
import PageSize from '@/components/page-size';
import PaginationComp from '@/components/pagination';
import Search from '@/components/search';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { Category, columns } from './columns';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Categories',
        href: '/dashboard',
    },
];

interface Links {
    url: string | null;
    label: string;
    active: boolean;
    page: number | null;
}

interface PaginatedData {
    data: Category[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: Links[];
}

interface CategoriesPageProps {
    categories: PaginatedData;
    filters: any;
}

export default function Index({ categories, filters }: CategoriesPageProps) {
    const [isOpen, setIsOpen] = useState(false);
    const current = categories?.current_page;
    const last = categories?.last_page;
    const perPage = categories?.per_page ?? 10;

    const onOpen = () => {
        setIsOpen(true);
    };

    const onClose = () => {
        setIsOpen(false);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold">Category</h1>
                    <Button onClick={onOpen}>Add category</Button>
                </div>

                <div className="flex items-center justify-between">
                    <Search />
                    {/* <Filters status={filters.status} year={filters.year} /> */}
                </div>

                <DataTable columns={columns} data={categories?.data} />

                {/* Page size */}
                <PageSize perPage={perPage} />

                <PaginationComp current={current} last={last} perPage={perPage} />
            </div>

            <CategoryModal isOpen={isOpen} onClose={onClose} />
        </AppLayout>
    );
}
