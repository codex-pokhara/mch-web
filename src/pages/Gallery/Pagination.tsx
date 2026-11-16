import {
    ArrowLeft,
    ArrowRight,
} from 'lucide-react';

import { Button } from '@/components/ui/button';

function Pagination({
    page,
    totalPages,
    onPageChange,
    label,
}: {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    label: string;
}) {
    if (totalPages <= 1) {
        return null;
    }
    return (
        <nav aria-label={label} className="mt-12 flex items-center justify-between gap-4 border-t border-ink/15 pt-6">
            <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
                <ArrowLeft strokeWidth={1.75} />
                Previous
            </Button>
            <p className="font-sans text-sm text-ink-soft tabular" aria-live="polite">
                Page
                {' '}
                {page}
                {' '}
                of
                {' '}
                {totalPages}
            </p>
            <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => onPageChange(page + 1)}>
                Next
                <ArrowRight strokeWidth={1.75} />
            </Button>
        </nav>
    );
}

export default Pagination;
