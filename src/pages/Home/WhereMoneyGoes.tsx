import { Link } from 'react-router-dom';

import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import BudgetLedger from '@/components/Sections/BudgetLedger';
import { Button } from '@/components/ui/button';
import { MONTHLY_COST_USD } from '@/constants';

function WhereMoneyGoes() {
    return (
        <section aria-labelledby="money-title" className="py-24 md:py-32">
            <MaxWidthWrapper className="grid gap-14 lg:grid-cols-[1fr_1.3fr] lg:gap-24">
                <div>
                    <h2 id="money-title" className="text-4xl text-ink sm:text-5xl">
                        Where your $
                        {MONTHLY_COST_USD}
                        {' '}
                        goes.
                    </h2>
                    <p className="mt-6 max-w-[44ch] text-lg text-ink-soft">
                        It costs $
                        {MONTHLY_COST_USD}
                        {' '}
                        to care for one child for a month. This is how that money is spent, to the
                        cent.
                    </p>
                    <div className="mt-9 flex flex-wrap gap-3">
                        <Button asChild variant="stamp">
                            <Link to="/get-involved">Sponsor a child</Link>
                        </Button>
                        <Button asChild variant="outline">
                            <Link to="/transparency">Full transparency report</Link>
                        </Button>
                    </div>
                </div>
                <BudgetLedger />
            </MaxWidthWrapper>
        </section>
    );
}

export default WhereMoneyGoes;
