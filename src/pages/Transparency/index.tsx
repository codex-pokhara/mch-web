import { Link } from 'react-router-dom';
import { Download } from 'lucide-react';

import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import PageHeader from '@/components/PageHeader';
import ReplyPanel from '@/components/ReplyPanel';
import BudgetLedger from '@/components/Sections/BudgetLedger';
import Credentials from '@/components/Sections/Credentials';
import { Button } from '@/components/ui/button';
import { MONTHLY_COST_USD } from '@/constants';
import { usePageTitle } from '@/hooks/usePageTitle';

function Transparency() {
    usePageTitle('Transparency');
    return (
        <>
            <PageHeader
                title="Transparency."
                lead="Full accountability, every rupee accounted for. Your trust is what keeps this home running."
                mark={{ ringTop: 'AUDITED · EVERY YEAR', small: 'PER CHILD', big: `$${MONTHLY_COST_USD}` }}
            />

            <section aria-labelledby="budget-title" className="py-20 md:py-28">
                <MaxWidthWrapper className="grid gap-14 lg:grid-cols-[1fr_1.3fr] lg:gap-24">
                    <div>
                        <h2 id="budget-title" className="text-4xl text-ink sm:text-5xl">How the budget is spent.</h2>
                        <p className="mt-6 max-w-[44ch] text-lg text-ink-soft">
                            Caring for one child costs $
                            {MONTHLY_COST_USD}
                            {' '}
                            a month. Food comes first, then school, clothing, the building,
                            healthcare and the people
                            who run the home.
                        </p>
                        <div className="mt-9 border-t border-ink/20 pt-6">
                            <p className="font-sans font-semibold text-ink [font-stretch:106%]">Budget and project report</p>
                            <p className="mt-1 text-ink-soft">The full breakdown and project documents, updated August 2025.</p>
                            <Button asChild variant="outline" className="mt-5">
                                <a href="/MCH.pdf" download="Mountain-Childrens-Home-budget-report.pdf">
                                    <Download strokeWidth={1.75} />
                                    Download the PDF (1.4 MB)
                                </a>
                            </Button>
                        </div>
                    </div>
                    <BudgetLedger />
                </MaxWidthWrapper>
            </section>

            <section aria-labelledby="registration-title" className="border-y border-ink/15 bg-sheet py-20 md:py-28">
                <MaxWidthWrapper>
                    <h2 id="registration-title" className="max-w-2xl text-4xl text-ink sm:text-5xl">
                        Registration and checks.
                    </h2>
                    <p className="mt-5 max-w-[56ch] text-lg text-ink-soft">
                        OHCDS operates in full legal compliance and is verified by government and
                        international bodies.
                        We have done so for 23 years, since 2002.
                    </p>
                    <Credentials className="mt-14" />
                </MaxWidthWrapper>
            </section>

            <section aria-labelledby="solar-title" className="py-20 md:py-28">
                <MaxWidthWrapper className="grid gap-12 md:grid-cols-[1.3fr_1fr] md:gap-20">
                    <div>
                        <h2 id="solar-title" className="text-4xl text-ink sm:text-5xl">Solar panels for the home.</h2>
                        <p className="mt-6 max-w-[54ch] text-lg text-ink-soft">
                            This is the project we are raising money for now. Solar panels on the
                            children&apos;s home will cut our electricity costs by 60% and give the
                            children reliable power for evening study and the computer room.
                        </p>
                    </div>
                    <div className="self-end border-t-2 border-ink pt-6">
                        <p className="postal text-ink-faint">Fundraising goal</p>
                        <p className="mt-2 font-sans text-5xl font-bold text-ink [font-stretch:125%] tabular">$10,385</p>
                        <p className="mt-1 text-ink-soft tabular">NPR 1,350,000</p>
                        <Button asChild variant="stamp" className="mt-7">
                            <Link to="/get-involved#write">Support the solar project</Link>
                        </Button>
                    </div>
                </MaxWidthWrapper>
            </section>

            <ReplyPanel />
        </>
    );
}

export default Transparency;
