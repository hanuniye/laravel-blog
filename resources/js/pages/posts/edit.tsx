import ImageUpload from '@/components/image-upload';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { useCallback } from 'react';
import { toast } from 'sonner';

type EditProps = {
    postData: {
        id: number;
        content: string;
        title: string;
        category_id: string;
        published: string;
        image_path: string;
    };
    categories: {
        id: number;
        name: string;
    }[];
};

type PostForm = {
    title: string;
    content: string;
    category_id: string;
    image: File | null; // can be a File or null
    published: string;
    _method: string;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create roles',
        href: '/roles/create',
    },
];

export default function Edit({ categories, postData }: EditProps) {
    // console.log(postData);
    const { data, setData, post, processing, errors } = useForm<PostForm>({
        title: postData?.title || '',
        content: postData?.content || '',
        category_id: postData?.category_id.toString() || '',
        image: null,
        published: postData?.published || '0',
        _method: 'PATCH',
    });

    const handleFilesChange = useCallback((files: File[]) => {
        setData('image', files.length > 0 ? files[0] : null);
    }, []);

    console.log(data);
    function submit(e: React.FormEvent) {
        e.preventDefault();
        

        post(route('posts.update', postData?.id), {
            forceFormData: true,
            onSuccess: () => {
                toast.success('Updated post!');
            },
            onError: (error) => {
                if (error?.image) {
                    toast.error(error.image);
                } else {
                    toast.error('error occured');
                }
            },
        });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Permission" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <h1 className="text-lg font-semibold">Update post</h1>
                    <Button variant="outline" type="button" onClick={() => window.history.back()}>
                        <ArrowLeft /> back
                    </Button>
                </div>

                <form onSubmit={submit} className="space-y-6">
                    <ImageUpload
                        multiple={false}
                        onFilesChange={handleFilesChange}
                        initialImages={postData?.image_path ? [`/storage/${postData.image_path}`] : []} // ← pass DB image path
                    />
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                        <div className="grid flex-1 gap-2">
                            <Label htmlFor="email">Title</Label>
                            <Input value={data.title} onChange={(e) => setData('title', e.target.value)} required />
                            {errors.title && <span className="text-sm text-red-500">{errors.title}</span>}
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
                        {/* Content (full row) */}
                        <div className="grid gap-2 sm:col-span-3 lg:col-span-3">
                            <Label htmlFor="content">Content</Label>
                            <Textarea
                                value={data.content}
                                onChange={(e) => setData('content', e.target.value)}
                                placeholder="Write your blog content here..."
                                className="min-h-[150px]" // makes it taller by default
                                required
                            />
                            {errors.content && <span className="text-sm text-red-500">{errors.content}</span>}
                        </div>
                        <div className="grid flex-1 gap-2">
                            <div className="flex items-start gap-2">
                                <Label htmlFor="email">Published</Label>
                                <Checkbox
                                    className="border-gray-400"
                                    checked={data?.published === '1' ? true : false}
                                    onCheckedChange={(checked) => setData('published', checked === true ? '1' : '0')}
                                />
                            </div>
                            {errors.title && <span className="text-sm text-red-500">{errors.title}</span>}
                        </div>
                    </div>

                    <Button disabled={processing} type="submit" className="w-full sm:w-auto">
                        Update
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}
