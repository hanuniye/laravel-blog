import ImageUpload from '@/components/image-upload';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { useCallback } from 'react';
import { toast } from 'sonner';

type CreateProps = {
    categories: {
        id: number;
        name: string;
    }[];
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create roles',
        href: '/roles/create',
    },
];

export default function Create({ categories }: CreateProps) {
    console.log(categories);
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        content: '',
        category_id: '',
        image: {},
    });

    const handleFilesChange = useCallback((files: File[]) => {
        setData('image', files[0]);
    }, []);

    function submit(e: React.FormEvent) {
        e.preventDefault();
        post(route('posts.store'), {
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
                    <h1 className="text-lg font-semibold">Create new post</h1>
                    <Button variant="outline" type="button" onClick={() => window.history.back()}>
                        <ArrowLeft /> back
                    </Button>
                </div>

                <form onSubmit={submit} className="space-y-6">
                    <ImageUpload multiple={false} onFilesChange={handleFilesChange} />
                    <div className="grid grid-cols-3 gap-6">
                        <div className="grid flex-1 gap-2">
                            <Label htmlFor="email">Title</Label>
                            <Input value={data.title} onChange={(e) => setData('title', e.target.value)} required />
                            {errors.title && <span className="text-sm text-red-500">{errors.title}</span>}
                        </div>
                        <div className="grid flex-1 gap-2">
                            <Label htmlFor="email">Content</Label>
                            <Input value={data.content} onChange={(e) => setData('content', e.target.value)} required />
                            {errors.content && <span className="text-sm text-red-500">{errors.content}</span>}
                        </div>
                        <div className="grid flex-1 gap-2">
                            <Label htmlFor="email">Category</Label>
                            <Select value={data.category_id} onValueChange={(value) => setData('category_id', value)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((cat) => (
                                        <SelectItem key={cat.id} value={String(cat.id)}>
                                            {cat.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.category_id && <span className="text-sm text-red-500">{errors.category_id}</span>}
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
