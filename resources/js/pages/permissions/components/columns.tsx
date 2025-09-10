import { ColumnDef } from '@tanstack/react-table';
import CellAction from './cell-action';

export type PermissionsColumn = {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

export const columns: ColumnDef<PermissionsColumn>[] = [
    {
        accessorKey: 'name',
        header: 'Name',
    },
    // {
    //     accessorKey: 'totalAmount',
    //     header: () => <div className="text-right font-bold">TotalAmount</div>,
    //     cell: ({ row }) => {
    //         const amount = parseFloat(row.getValue('totalAmount'));
    //         const formatted = new Intl.NumberFormat('en-US', {
    //             style: 'currency',
    //             currency: 'USD',
    //         }).format(amount);

    //         return <div className="text-right font-medium">{formatted}</div>;
    //     },
    // },
    {
        id: 'actions',
        cell: ({ row }) => {
            return <CellAction data={row.original} />;
        },
    },
];
