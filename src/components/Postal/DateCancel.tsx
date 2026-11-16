import { cn } from '@/lib/utils';

/** A date as a small circular cancellation in postmark ink, kept machine readable by <time>. */
function DateCancel({ value, className }: { value: string; className?: string }) {
    const date = new Date(value);
    if (!value || Number.isNaN(date.getTime())) {
        return null;
    }
    const day = date.getDate();
    const month = date.toLocaleDateString('en-GB', { month: 'short' }).toUpperCase();
    const year = date.getFullYear();

    return (
        <time
            dateTime={value}
            className={cn(
                'flex size-[4.5rem] shrink-0 -rotate-6 flex-col items-center justify-center rounded-full border-2 border-postmark/85 text-postmark outline outline-offset-[3px] outline-postmark/45',
                className,
            )}
        >
            <span className="font-sans text-xl leading-none font-bold [font-stretch:112.5%] tabular">{day}</span>
            <span className="postal mt-1 text-[0.5625rem] leading-none tracking-[0.08em]">
                {month}
                {' '}
                {year}
            </span>
        </time>
    );
}

export default DateCancel;
