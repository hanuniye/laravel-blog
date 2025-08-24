import { useQueryParams } from '@/hooks/useQueryParams';
import { router } from '@inertiajs/react';
import React from 'react';
import { Input } from './ui/input';

function Search() {
    const { getParams, setParams } = useQueryParams();
    const params = getParams();

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const href = setParams({ search: e.target.value, page: 1 }); // reset page when searching
        router.get(href, {}, { preserveScroll: true, preserveState: true });
    };

    return (
        <div>
            <Input type="text" placeholder="Search..." defaultValue={params.search || ''} onChange={handleSearch} />
        </div>
    );
}
export default Search;
