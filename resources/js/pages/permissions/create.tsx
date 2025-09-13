import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create permissions',
        href: '/permissions/create',
    },
];

export default function Create() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();
        post(route('permissions.store'), {
            onError: () => {
                toast.error('error occured');
            },
        });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Permission" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-lg font-semibold">Create new permissions</h1>
                    <Button variant="outline" type="button" onClick={() => window.history.back()}>
                        <ArrowLeft /> back
                    </Button>
                </div>
                

                <form onSubmit={submit} className="space-y-6">
                    <div className="grid grid-cols-3">
                        <div className="grid flex-1 gap-2">
                            <Label htmlFor="email">Name</Label>
                            <Input value={data.name} onChange={(e) => setData('name', e.target.value)} required />
                            {errors.name && <span className="text-sm text-red-500">{errors.name}</span>}
                        </div>
                    </div>
                    <Button disabled={processing} type="submit" className="w-full sm:w-auto">
                        Create
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}
