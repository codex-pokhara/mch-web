import { type ReactNode } from 'react';
import { RotateCcw } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function SkeletonGrid({
    count = 3,
    className,
    itemClassName = 'aspect-[4/3]',
}: {
    count?: number;
    className?: string;
    itemClassName?: string;
}) {
    const slots = Array.from({ length: count }, (_, slot) => `slot-${slot}`);
    return (
        <div className={cn('grid gap-6 sm:grid-cols-2 lg:grid-cols-3', className)} aria-busy="true" aria-live="polite">
            <span className="sr-only">Loading</span>
            {slots.map((slot) => (
                <div key={slot} className="flex flex-col gap-3">
                    <div className={cn('skeleton rounded-[2px]', itemClassName)} />
                    <div className="skeleton h-4 w-2/3 rounded-[2px]" />
                    <div className="skeleton h-4 w-1/3 rounded-[2px]" />
                </div>
            ))}
        </div>
    );
}

export function ErrorNote({
    message,
    onRetry,
    className,
}: {
    message: string;
    onRetry?: () => void;
    className?: string;
}) {
    return (
        <div role="alert" className={cn('max-w-xl border-t-2 border-airmail-red pt-5', className)}>
            <p className="font-sans text-lg font-semibold text-ink [font-stretch:112.5%]">
                Something went wrong on our side.
            </p>
            <p className="mt-2 text-ink-soft">{message}</p>
            {onRetry && (
                <Button variant="outline" size="sm" className="mt-5" onClick={onRetry}>
                    <RotateCcw strokeWidth={1.75} />
                    Try again
                </Button>
            )}
        </div>
    );
}

export function EmptyNote({
    title,
    children,
    className,
}: {
    title: string;
    children?: ReactNode;
    className?: string;
}) {
    return (
        <div className={cn('max-w-xl border-t border-ink/20 pt-5', className)}>
            <p className="font-sans text-lg font-semibold text-ink [font-stretch:112.5%]">{title}</p>
            {children && <div className="mt-2 text-ink-soft">{children}</div>}
        </div>
    );
}
