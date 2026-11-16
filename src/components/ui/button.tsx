import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import {
    cva,
    type VariantProps,
} from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
    [
        'press inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-[3px]',
        'font-sans font-semibold [font-stretch:112.5%] tracking-[0.01em] cursor-pointer select-none',
        'disabled:pointer-events-none disabled:opacity-50',
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    ].join(' '),
    {
        variants: {
            variant: {
                stamp: 'bg-airmail-red text-sheet hover:bg-airmail-red-deep',
                ink: 'bg-ink text-sheet hover:bg-airmail-navy',
                outline: 'border border-ink/70 text-ink hover:bg-ink hover:text-sheet',
                ghost: 'text-ink hover:bg-paper-deep',
                onInk: 'bg-sheet text-ink hover:bg-paper',
            },
            size: {
                default: 'h-11 px-5 text-[0.9375rem]',
                sm: 'h-9 px-4 text-sm',
                lg: 'h-13 px-7 text-base',
                icon: 'size-11',
            },
        },
        defaultVariants: {
            variant: 'ink',
            size: 'default',
        },
    },
);

type ButtonProps = React.ComponentProps<'button'>
    & VariantProps<typeof buttonVariants>
    & { asChild?: boolean };

function Button({
    className,
    variant,
    size,
    asChild = false,
    type,
    ...props
}: ButtonProps) {
    if (asChild) {
        return (
            <Slot
                className={cn(buttonVariants({ variant, size, className }))}
                {...props}
            />
        );
    }
    return (
        // Defaults to "button" so a stray button inside a form never submits it.
        <button
            type={type === 'submit' ? 'submit' : 'button'}
            className={cn(buttonVariants({ variant, size, className }))}
            {...props}
        />
    );
}

export { Button };
