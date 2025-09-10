import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Modal } from '@/components/ui/modal';
import { PermissionsColumn } from '@/pages/permissions/components/columns';
import { useForm } from '@inertiajs/react';
import { toast } from 'sonner';

type RoleModalProps = {
    permission?: PermissionsColumn;
    isOpen: boolean;
    onClose: () => void;
};

export default function CategoryModal({ isOpen, onClose, permission }: RoleModalProps) {
    const { data, setData, post, processing, errors, reset, patch, clearErrors } = useForm({
        name: '',
    });

    const title = permission ? 'Edit permission' : 'Create permission';
    const action = permission ? 'Save changes' : 'Create';

    function submit(e: React.FormEvent) {
        e.preventDefault();
        post(route('permissions.store'), {
            onSuccess: () => {
                reset();
                onClose();
                toast.success('Permission created.');
            },
            onError: () => {
                toast.error('error occured');
            },
        });
    }

    function update(e: React.FormEvent) {
        e.preventDefault();
        patch(route('permissions.update', permission?.id), {
            onSuccess: () => {
                reset();
                onClose();
                toast.success('Permission updated.');
            },
            onError: () => {
                toast.error('error occured');
            },
        });
    }

    const handleClose = () => {
        reset();
        clearErrors();
        onClose();
    };

    if (!permission)
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

    return (
        <Modal title={title} isOpen={isOpen} onClose={handleClose}>
            <form onSubmit={update}>
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
