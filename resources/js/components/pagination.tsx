import { useQueryParams } from '@/hooks/useQueryParams';
import { Link } from '@inertiajs/react';
import { Button } from './ui/button';
import { Pagination, PaginationContent } from './ui/pagination';

interface PaginationProps {
    current: number;
    perPage: number;
    last: number;
}

// This function generates page numbers for compact pagination like  this //Previous 1 2 3 4 5 6 .... Next.
// Example: getPageNumbers(5, 10) -> [1, "...", 3, 4, 5, 6, 7, "...", 10]
function getPageNumbers(current: number, last: number): (number | string)[] {
    const delta = 2;
    const range: number[] = [];
    const result: (number | string)[] = [];

    for (let i = 1; i <= last; i++) {
        if (i === 1 || i === last || (i >= current - delta && i <= current + delta)) {
            range.push(i);
        }
    }

    let prev: number | null = null;
    for (const n of range) {
        if (prev !== null) {
            if (n - prev === 2) result.push(prev + 1);
            else if (n - prev > 2) result.push('…');
        }
        result.push(n);
        prev = n;
    }
    return result;
}
const PaginationComp: React.FC<PaginationProps> = ({ current, last, perPage }: PaginationProps) => {
    const { setParams } = useQueryParams();
    const pages = getPageNumbers(current, last);

    return (
        <Pagination className="mt-2">
            <PaginationContent>
                <Button variant="outline" size="sm" disabled={current === 1} className="mr-7">
                    <Link href={setParams({ page: current - 1 })} preserveState preserveScroll>
                        Previous
                    </Link>
                </Button>

                {/* {Array.from({ length: last }, (_, i) => (
                            <Button variant="ghost" size="sm" key={i + 1}>
                                <Link href={makeHref(i + 1)} className={current === i + 1 ? 'font-bold' : ''}>
                                    {i + 1}
                                </Link>
                            </Button>
                        ))} */}

                {pages.map((p, i) =>
                    p === '…' ? (
                        <span key={`dots-${i}`} className="px-2 text-gray-500">
                            …
                        </span>
                    ) : (
                        <Button key={p} size="sm" variant={p === current ? 'default' : 'outline'} asChild>
                            <Link href={setParams({ page: p })} preserveState preserveScroll>
                                {p}
                            </Link>
                        </Button>
                    ),
                )}

                <Button variant="outline" size="sm" disabled={current === last} className="ml-7">
                    <Link href={setParams({ page: current + 1 })} preserveState preserveScroll>
                        Next
                    </Link>
                </Button>
            </PaginationContent>
        </Pagination>
    );
};

export default PaginationComp;
