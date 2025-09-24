import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
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
    published: string;
};

export const columns: ColumnDef<PostColumn>[] = [
    {
        accessorKey: 'title',
        header: 'Title',
    },
    {
        accessorKey: 'content',
        header: 'Content',
        cell: ({ row }) => {
            const content = row.original.content;

            // Option 1: Tailwind truncate
            // max-w-[300px] sets a max width for the cell.
            // truncate adds the ellipsis (...) automatically.
            // title={content} ensures users see the full text on hover.
            return (
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className="max-w-[300px] cursor-pointer truncate">{content}</div>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-sm">
                            <p>{content}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            );
        },
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

            return published === '1' ? (
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
