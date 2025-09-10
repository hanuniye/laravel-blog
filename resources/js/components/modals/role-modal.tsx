import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Modal } from '@/components/ui/modal';
import { RoleColumn } from '@/pages/roles/components/columns';
import { useForm } from '@inertiajs/react';
import { toast } from 'sonner';

type RoleModalProps = {
    role?: RoleColumn;
    isOpen: boolean;
    onClose: () => void;
};

export default function CategoryModal({ isOpen, onClose, role }: RoleModalProps) {
    const { data, setData, post, processing, errors, reset, patch, resetAndClearErrors } = useForm({
        name: role?.name || '',
    });

    const title = role ? 'Edit role' : 'Create role';
    const action = role ? 'Save changes' : 'Create';

    function submit(e: React.FormEvent) {
        e.preventDefault();
        if (role) {
            patch(route('roles.update', role?.id), {
                onSuccess: () => {
                    reset();
                    onClose();
                    toast.success('Role updated.');
                },
                onError: () => {
                    toast.error('error occured');
                },
            });
        } else {
            post(route('roles.store'), {
                onSuccess: () => {
                    reset();
                    onClose();
                    toast.success('Role created.');
                },
                onError: () => {
                    toast.error('error occured');
                },
            });
        }
    }

    const handleClose = () => {
        resetAndClearErrors();
        onClose();
    };

    return (
        <Modal title={title} isOpen={isOpen} onClose={handleClose}>
            <form onSubmit={submit}>
                <div className="grid gap-4">
                    <div className="grid gap-3">
                        <Label htmlFor="name-1">Name</Label>
                        <Input value={data.name} onChange={(e) => setData('name', e.target.value)} />
                        {errors.name && <span className="text-sm text-red-500">{errors.name}</span>}
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-6">
                        <Button disabled={processing} type="button" variant="outline" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button disabled={processing} type="submit">
                            {action}
                        </Button>
                    </div>
                </div>
            </form>
        </Modal>
    );
}
