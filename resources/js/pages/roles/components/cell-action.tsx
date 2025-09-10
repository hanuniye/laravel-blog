import { Edit, MoreHorizontal, Trash } from 'lucide-react';
import { useState } from 'react';

import AlertModel from '@/components/modals/alert-modal';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { router, useForm } from '@inertiajs/react';
import { toast } from 'sonner';
import { RoleColumn } from './columns';
import RoleModal from '@/components/modals/role-modal';

interface CellActionPropss {
    data: RoleColumn;
}


const CellAction = ({ data }: CellActionPropss) => {
    const [open, setOpen] = useState(false);

    const { processing, delete: destroy } = useForm({});

    const deleteCategory = () => {
        destroy(route('roles.destroy', data?.id), {
            onSuccess: () => {
                setOpen(false);
            },
            onError: () => {
                toast.error('error occured');
            },
        });
    };

    return (
        <>
            <AlertModel isOpen={open} loading={processing} onClose={() => setOpen(false)} onConfirm={deleteCategory} />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() =>  router.visit(`roles/${data?.id}/edit`)} >
                        <Edit className="mr-2 h-4 w-4" />
                        Update
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setOpen(true)}>
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};

export default CellAction;
