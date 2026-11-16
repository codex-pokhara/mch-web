import { type ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface StampProps {
    src: string;
    alt: string;
    country?: string;
    denomination?: string;
    caption?: ReactNode;
    className?: string;
    imgClassName?: string;
    priority?: boolean;
}

/** A photograph printed as a perforated postage stamp. */
function Stamp({
    src,
    alt,
    country = 'Nepal',
    denomination,
    caption,
    className,
    imgClassName,
    priority = false,
}: StampProps) {
    return (
        <figure className={cn('stamp-shadow', className)}>
            <div className="stamp">
                <div className="relative overflow-hidden bg-paper-deep">
                    <img
                        src={src}
                        alt={alt}
                        className={cn('block h-full w-full object-cover', imgClassName)}
                        loading={priority ? 'eager' : 'lazy'}
                        fetchPriority={priority ? 'high' : 'auto'}
                        decoding="async"
                    />
                </div>
                <div className="mt-2.5 flex items-end justify-between gap-4 text-ink">
                    <span className="postal">{country}</span>
                    {denomination && (
                        <span className="font-sans text-2xl font-bold leading-none [font-stretch:112.5%] tabular">
                            {denomination}
                        </span>
                    )}
                </div>
                {caption && (
                    <figcaption className="mt-1 font-serif text-xs italic leading-snug text-ink-soft">
                        {caption}
                    </figcaption>
                )}
            </div>
        </figure>
    );
}

export default Stamp;
