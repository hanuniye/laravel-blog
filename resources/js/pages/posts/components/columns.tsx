import { Badge } from '@/components/ui/badge';
import { ColumnDef } from '@tanstack/react-table';
import CellAction from './cell-action';

export type PostColumn = {
    id: number;
    title: string;
    content: string;
    category: {
        id: number;
        name: string;
    };
    user: {
        id: number;
        name: string;
    };
    published: boolean;
};

export const columns: ColumnDef<PostColumn>[] = [
    {
        accessorKey: 'title',
        header: 'Title',
    },
    {
        accessorKey: 'content',
        header: 'Content',
    },
    {
        header: 'Category',
        cell: ({ row }) => row.original.category?.name,
    },
    {
        header: 'Author',
        cell: ({ row }) => row.original.user?.name,
    },
    {
        header: 'Published',
        cell: ({ row }) => {
            const published = row.original.published;

            return published ? (
                <Badge variant="secondary" className="bg-green-500 text-white dark:bg-green-600">
                    Published
                </Badge>
            ) : (
                <Badge variant="destructive">un-published</Badge>
            );
        },
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            return <CellAction data={row.original} />;
        },
    },
];
