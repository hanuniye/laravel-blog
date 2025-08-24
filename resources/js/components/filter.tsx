import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useQueryParams } from '@/hooks/useQueryParams';
import { router } from '@inertiajs/react';

export default function Filter() {
    const { getParams, setParams } = useQueryParams();
    const params = getParams();

    const handleFilterChange = (field: string, value: string) => {
        const href = setParams({ [field]: value, page: 1})
        router.get(href, {}, { preserveScroll: true, preserveState: true });
    };

    return (
        <div className="flex gap-4">
            <Select defaultValue={params?.role || ''} onValueChange={(value) => handleFilterChange('role', value)}>
                <SelectTrigger className="w-48">
                    <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="admin">admin</SelectItem>
                    <SelectItem value="user">user</SelectItem>
                </SelectContent>
            </Select>

            <Select defaultValue={params?.status || ''} onValueChange={(value) => handleFilterChange('status', value)}>
                <SelectTrigger className="w-48">
                    <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="1">active</SelectItem>
                    <SelectItem value="0">in-active</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}
