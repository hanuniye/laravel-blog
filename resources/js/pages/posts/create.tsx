import ImageUpload from '@/components/image-upload';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { ArrowLeft, Plus, X } from 'lucide-react';
import { useCallback, useState } from 'react';
import { toast } from 'sonner';

type CreateProps = {
    categories: {
        id: number;
        name: string;
    }[];
};

type PostForm = {
    title: string;
    content: string;
    category_id: string;
    image: File | {};
    tags: string[];
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create roles',
        href: '/roles/create',
    },
];

export default function Create({ categories }: CreateProps) {
    const [tagInput, setTagInput] = useState('');
    const { data, setData, post, processing, errors } = useForm<PostForm>({
        title: '',
        content: '',
        category_id: '',
        image: {},
        tags: [],
    });

    const handleFilesChange = useCallback((files: File[]) => {
        setData('image', files[0]);
    }, []);

    const handleAddTag = () => {
        if (tagInput.trim() && !data?.tags.includes(tagInput.trim()) && data?.tags.length < 5) {
            setData('tags', [...data.tags, tagInput.trim()]);
            setTagInput('');
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        const filteredTags = data?.tags.filter((tag) => tag !== tagToRemove)
        setData('tags', filteredTags);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && tagInput.trim()) {
            e.preventDefault();
            handleAddTag();
        }
    };

    function submit(e: React.FormEvent) {
        e.preventDefault();
        console.log(data)
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
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <h1 className="text-lg font-semibold">Create new post</h1>
                    <Button variant="outline" type="button" onClick={() => window.history.back()}>
                        <ArrowLeft /> back
                    </Button>
                </div>

                <form onSubmit={submit} className="space-y-6">
                    <ImageUpload multiple={false} onFilesChange={handleFilesChange} />
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

                        {/* tags (full row)  */}
                        <div className="grid gap-2 sm:col-span-3 lg:col-span-3">
                            <Label htmlFor="tags">Tags (up to 5)</Label>
                            <div className="flex gap-2">
                                <Input
                                    id="tags"
                                    placeholder="Add a tag..."
                                    value={tagInput}
                                    onChange={(e) => setTagInput(e.target.value)}
                                    onKeyUp={handleKeyPress}
                                    className="flex-1"
                                />
                                <Button type="button" variant="outline" onClick={handleAddTag}>
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>

                            {data?.tags.length > 0 && (
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {data?.tags.map((tag) => (
                                        <Badge
                                            key={tag}
                                            variant="secondary"
                                            className="flex items-center gap-1 bg-gradient-to-r from-primary/10 to-accent/10 hover:from-primary/20 hover:to-accent/20"
                                        >
                                            {tag}
                                            <button
                                                type="button"
                                                  onClick={() => handleRemoveTag(tag)}
                                                className="ml-1 hover:text-destructive"
                                            >
                                                <X className="h-3 w-3" />
                                            </button>
                                        </Badge>
                                    ))}
                                </div>
                            )}
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
