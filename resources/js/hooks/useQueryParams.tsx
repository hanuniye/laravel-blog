import { usePage } from '@inertiajs/react';

export function useQueryParams() {
    const { url } = usePage(); // current URL from Inertia

    // helper: get current query params as object
    const getParams = () => {
        const searchParams = new URLSearchParams(url.split('?')[1] || '');
        return Object.fromEntries(searchParams.entries());
    };

    // helper: update query params (merge new values with old)
    const setParams = (newParams: Record<string, string | number | undefined>) => {
        const searchParams = new URLSearchParams(url.split('?')[1] || '');

        // merge existing + new values
        Object.entries(newParams).forEach(([key, value]) => {
            if (value === undefined || value === '') {
                searchParams.delete(key); // remove if empty
            } else {
                searchParams.set(key, String(value));
            }
        });

        return `?${searchParams.toString()}`;
    };

    return { getParams, setParams };
}
