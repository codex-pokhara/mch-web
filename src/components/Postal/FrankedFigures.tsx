import { figures } from '@/constants';
import { useInView } from '@/hooks/useInView';
import { cn } from '@/lib/utils';

const DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

/** One digit that rolls from 0 to its value once, transform-only. */
function RollingDigit({
    digit,
    position,
    rolled,
}: {
    digit: number;
    position: number;
    rolled: boolean;
}) {
    const offset = rolled ? digit * -10 : 0;
    return (
        <span className="relative inline-block h-[1em] overflow-hidden px-[0.02em] leading-none" aria-hidden="true">
            {/* The final digit, invisible, sizes the window to the real glyph width. */}
            <span className="invisible">{digit}</span>
            <span
                className="absolute inset-x-0 top-0 flex flex-col transition-transform duration-[1100ms] ease-out motion-reduce:transition-none"
                style={{
                    transform: `translateY(${offset}%)`,
                    transitionDelay: `${position * 90}ms`,
                }}
            >
                {DIGITS.map((glyph) => (
                    <span key={glyph} className="block h-[1em] text-center leading-none">{glyph}</span>
                ))}
            </span>
        </span>
    );
}

function RollingValue({ value, rolled }: { value: string; rolled: boolean }) {
    const glyphs = value.split('').map((glyph, position) => ({ glyph, position }));
    return (
        <span className="inline-flex items-start leading-none tabular">
            <span className="sr-only">{value}</span>
            {glyphs.map(({ glyph, position }) => {
                const digit = Number(glyph);
                if (glyph !== ' ' && !Number.isNaN(digit)) {
                    return (
                        <RollingDigit
                            key={`${glyph}-${position}`}
                            digit={digit}
                            position={position}
                            rolled={rolled}
                        />
                    );
                }
                return (
                    <span key={`${glyph}-${position}`} aria-hidden="true" className="ml-[0.04em] text-[0.5em] leading-none">
                        {glyph}
                    </span>
                );
            })}
        </span>
    );
}

/**
 * The approved figures, unboxed. The lead figure carries the block at display size;
 * the rest sit in a ruled column beside it. One column on phones.
 */
function FrankedFigures({ className }: { className?: string }) {
    const { ref, inView } = useInView<HTMLDivElement>();
    const lead = figures.find((figure) => figure.lead) ?? figures[0];
    const rest = figures.filter((figure) => figure !== lead);

    return (
        <div
            ref={ref}
            className={cn('grid gap-10 border-t border-ink/20 pt-10 md:grid-cols-[1.15fr_1fr] md:gap-16 lg:gap-24', className)}
        >
            <dl className="flex flex-col">
                <dt className="order-2 mt-5 max-w-[30ch]">
                    <span className="block font-sans text-2xl font-semibold text-ink [font-stretch:112.5%] sm:text-3xl">
                        {lead.label.charAt(0).toUpperCase() + lead.label.slice(1)}
                        .
                    </span>
                    <span className="mt-2 block text-lg text-ink-soft">{lead.note}</span>
                </dt>
                <dd className="order-1 font-sans text-[7rem] leading-[0.8] font-bold tracking-[-0.03em] text-airmail-red [font-stretch:125%] sm:text-[9.5rem] lg:text-[11rem]">
                    <RollingValue value={lead.value} rolled={inView} />
                </dd>
            </dl>

            <dl className="divide-y divide-ink/15 self-end border-y border-ink/15">
                {rest.map((figure) => (
                    <div key={figure.label} className="grid grid-cols-[8rem_1fr] items-center gap-5 py-5 sm:grid-cols-[10rem_1fr]">
                        <dt className="order-2">
                            <span className="block font-sans text-base font-semibold text-ink [font-stretch:106%]">
                                {figure.label.charAt(0).toUpperCase() + figure.label.slice(1)}
                            </span>
                            <span className="mt-0.5 block text-sm text-ink-faint italic">{figure.note}</span>
                        </dt>
                        <dd className="order-1 font-sans text-4xl font-bold text-airmail-red [font-stretch:125%] sm:text-5xl">
                            <RollingValue value={figure.value} rolled={inView} />
                        </dd>
                    </div>
                ))}
            </dl>
        </div>
    );
}

export default FrankedFigures;
