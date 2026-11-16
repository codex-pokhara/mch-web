import {
    budget,
    MONTHLY_COST_USD,
} from '@/constants';
import { useInView } from '@/hooks/useInView';
import { cn } from '@/lib/utils';

const SWATCHES = [
    'bg-airmail-red',
    'bg-airmail-navy',
    'bg-brand-teal',
    'bg-postmark',
    'bg-airmail-red/45',
    'bg-airmail-navy/40',
];

function dollars(share: number) {
    return ((MONTHLY_COST_USD * share) / 100).toFixed(2);
}

/** Where one month of $197 goes, as a numbered sequence. Figures are the approved split. */
function BudgetLedger({ className }: { className?: string }) {
    const { ref, inView } = useInView<HTMLDivElement>();
    const rows = budget.map((item, index) => ({
        ...item,
        step: index + 1,
        swatch: SWATCHES[index],
    }));

    return (
        <div ref={ref} className={className}>
            <div
                className="flex h-4 w-full overflow-hidden rounded-[2px] bg-paper-deep"
                role="img"
                aria-label="One month of care split by spending category"
            >
                {rows.map((row) => (
                    <span
                        key={row.label}
                        className={cn(
                            'h-full origin-left transition-transform duration-700 ease-out motion-reduce:transition-none',
                            row.swatch,
                            inView ? 'scale-x-100' : 'scale-x-0',
                        )}
                        style={{ width: `${row.share}%`, transitionDelay: `${row.step * 70}ms` }}
                    />
                ))}
            </div>

            <ol className="mt-8 border-t border-ink/20">
                {rows.map((row) => (
                    <li
                        key={row.label}
                        className="grid grid-cols-[2rem_1fr_auto] items-baseline gap-x-3 border-b border-ink/15 py-4 sm:grid-cols-[2.5rem_1fr_5rem_6rem]"
                    >
                        <span className="font-sans text-sm font-semibold text-ink-faint tabular">{row.step}</span>
                        <span className="flex items-center gap-3 font-sans text-base font-medium text-ink [font-stretch:106%] sm:text-lg">
                            <span className={cn('size-2.5 shrink-0 rounded-full', row.swatch)} aria-hidden="true" />
                            {row.label}
                        </span>
                        <span className="text-right font-sans text-base text-ink-soft tabular sm:text-lg">
                            {row.share}
                            %
                        </span>
                        <span className="col-start-2 font-sans text-sm text-ink-faint tabular sm:col-start-auto sm:text-right sm:text-lg sm:font-semibold sm:text-ink">
                            $
                            {dollars(row.share)}
                        </span>
                    </li>
                ))}
            </ol>
            <p className="mt-4 flex justify-between font-sans text-sm text-ink-soft tabular">
                <span>One child, one month</span>
                <span className="font-semibold text-ink">
                    $
                    {MONTHLY_COST_USD}
                    .00
                </span>
            </p>
        </div>
    );
}

export default BudgetLedger;
