import { useId } from 'react';

import { cn } from '@/lib/utils';

interface PostmarkProps {
    ringTop: string;
    small?: string;
    big: string;
    waves?: boolean;
    className?: string;
}

const WAVE_ROWS = [34, 48, 62, 76, 90];

/*
 * Ring text runs along three quarters of a circle (r = 45), starting low on the left,
 * over the top and down to the right, so place names up to about 24 characters fit.
 */
const RING_PATH = 'M 30.2 93.8 A 45 45 0 1 1 93.8 93.8';

/** Rubber postmark with optional cancellation waves. Decorative; the page repeats its text. */
function Postmark({
    ringTop,
    small,
    big,
    waves = false,
    className,
}: PostmarkProps) {
    const id = useId();
    const ringId = `${id}-ring`;
    const width = waves ? 300 : 124;
    let bigSize = 20;
    if (big.length > 5) {
        bigSize = 13;
    } else if (big.length > 4) {
        bigSize = 16;
    }

    return (
        <svg
            viewBox={`0 0 ${width} 124`}
            className={cn('text-postmark', className)}
            aria-hidden="true"
            focusable="false"
        >
            <defs>
                <path id={ringId} d={RING_PATH} />
            </defs>
            <g fill="none" stroke="currentColor">
                <circle cx="62" cy="62" r="58" strokeWidth="2.5" />
                <circle cx="62" cy="62" r="34" strokeWidth="1.5" />
            </g>
            <g fill="currentColor" fontFamily="Archivo, sans-serif" fontWeight="700" style={{ fontStretch: '125%' }}>
                <text fontSize="10" letterSpacing="1.4">
                    <textPath href={`#${ringId}`} startOffset="50%" textAnchor="middle">
                        {ringTop}
                    </textPath>
                </text>
                {small && (
                    <text x="62" y="54" fontSize="7.5" textAnchor="middle" letterSpacing="1">
                        {small}
                    </text>
                )}
                <text x="62" y={small ? 74 : 69} fontSize={bigSize} textAnchor="middle" letterSpacing="0.5">
                    {big}
                </text>
            </g>
            {waves && (
                <g fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    {WAVE_ROWS.map((y) => (
                        <path
                            key={y}
                            d={`M 126 ${y} q 12 -7 24 0 t 24 0 t 24 0 t 24 0 t 24 0 t 24 0 t 24 0`}
                        />
                    ))}
                </g>
            )}
        </svg>
    );
}

export default Postmark;
