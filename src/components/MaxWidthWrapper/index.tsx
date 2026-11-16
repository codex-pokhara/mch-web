import { type ReactNode } from 'react';

import { cn } from '@/lib/utils';

function MaxWidthWrapper({
    className,
    children,
}: {
    className?: string;
    children: ReactNode;
}) {
    return (
        <div className={cn('mx-auto w-full max-w-[1240px] px-4 sm:px-6 lg:px-10', className)}>
            {children}
        </div>
    );
}

export default MaxWidthWrapper;
