import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
                <Card className="w-full max-w-xl">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <Button variant="outline" type="button" onClick={() => window.history.back()}>
                            <ArrowLeft /> back
                        </Button>
                        <CardTitle>Create new permission</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit}>
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
                                <div className="grid flex-1 gap-2">
                                    <Label htmlFor="email">Name</Label>
                                    <Input value={data.name} onChange={(e) => setData('name', e.target.value)} required />
                                    {errors.name && <span className="text-sm text-red-500">{errors.name}</span>}
                                </div>
                                <Button disabled={processing} type="submit" className="w-full sm:w-auto">
                                    Create
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
