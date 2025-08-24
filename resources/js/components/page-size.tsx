import { useQueryParams } from '@/hooks/useQueryParams';
import { router } from '@inertiajs/react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface PageSizeProps {
    perPage: number;
}

const PageSize = ({ perPage }: PageSizeProps) => {
    const { setParams } = useQueryParams();

    const changePageSize = (value: string) => {
        const href = setParams({ per_page: value, page: 1 });
        // go to page 1 when page size changes
        router.get(href, {}, { preserveScroll: true, preserveState: true });
    };

    return (
        <div className="mt-2 flex items-center justify-center gap-2">
            <span className="text-sm">Rows per page:</span>
            <Select defaultValue={String(perPage)} onValueChange={changePageSize}>
                <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Rows per page" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="25">25</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
};
export default PageSize;
