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
        <div
            className={cn(
                'mx-auto w-full max-w-[1312px] px-4 md:px-6',
                className,
            )}
        >
            {children}
        </div>
    );
}

export default MaxWidthWrapper;
