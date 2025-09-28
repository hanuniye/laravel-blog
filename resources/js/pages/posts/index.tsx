import { Can } from '@/components/can';
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
import { PostColumn, columns } from './components/columns';

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
    data: PostColumn[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: Links[];
}

interface PostPageProps {
    posts: PaginatedData;
}

interface PageProps {
    flash: {
        success?: string;
        error?: string;
    };
    [key: string]: unknown;
}

export default function Index({ posts }: PostPageProps) {
    const { flash } = usePage<PageProps>().props;

    const current = posts?.current_page;
    const last = posts?.last_page;
    const perPage = posts?.per_page ?? 10;

    useEffect(() => {
        if (flash.success) {
            toast.success(flash?.success);
        }
        return () => {
            // 👇 clear flash when leaving this page
            flash.success = '';
        };
    }, [flash?.success]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold">Posts</h1>
                    <Can permission="create-post">
                        <Button onClick={() => router.visit(route('posts.create'))}>Add Post</Button>
                    </Can>
                </div>

                <div className="flex items-center justify-between">
                    <Search />
                    {/* <Filters status={filters.status} year={filters.year} /> */}
                </div>

                <DataTable columns={columns} data={posts?.data} />

                {/* Page size */}
                <PageSize perPage={perPage} />

                <PaginationComp current={current} last={last} perPage={perPage} />
            </div>
        </AppLayout>
    );
}
