import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

import childrenAtHome from '@/assets/children-at-home.jpg';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import FrankedFigures from '@/components/Postal/FrankedFigures';
import Postmark from '@/components/Postal/Postmark';
import Stamp from '@/components/Postal/Stamp';
import { Button } from '@/components/ui/button';
import { MONTHLY_COST_USD } from '@/constants';

function AirmailLabel() {
    return (
        <span className="inline-flex flex-col whitespace-nowrap rounded-[2px] bg-airmail-navy px-3 py-1.5 text-sheet">
            <span className="postal text-[0.625rem]">By air mail</span>
            <span className="postal text-[0.625rem] text-sheet/70">Par avion</span>
        </span>
    );
}

function Hero() {
    return (
        <section aria-labelledby="hero-title" className="pt-6 sm:pt-10">
            <MaxWidthWrapper>
                <div className="airmail-frame bg-sheet">
                    <div className="grid gap-12 p-6 sm:p-10 lg:grid-cols-12 lg:gap-10 lg:p-14">
                        <div className="rise-in min-w-0 lg:col-span-7">
                            <div className="flex items-start justify-between gap-4">
                                <AirmailLabel />
                                <p className="postal hidden text-right text-ink-faint sm:block">
                                    Budhanilkantha, Dadagaun
                                    <span className="block">Kathmandu, Nepal</span>
                                </p>
                            </div>

                            <p className="mt-10 font-serif text-2xl italic text-ink-soft sm:text-3xl">Dear friend,</p>
                            <h1 id="hero-title" className="mt-3 text-[2.6rem] leading-[1.02] text-ink sm:text-6xl xl:text-7xl">
                                Forty children here call us Mummy and Daddy.
                            </h1>
                            <p className="mt-7 max-w-[52ch] text-lg leading-relaxed text-ink-soft sm:text-xl">
                                In 2002 Ramesh, orphaned at seven, rented four small rooms and took
                                in his first child.
                                More than 200 children later, this is still a home, not an
                                institution.
                            </p>
                            <p className="mt-6 font-serif text-lg italic text-ink">
                                With love, Ramesh and Gita
                            </p>

                            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                                <Button asChild variant="stamp" size="lg" className="h-auto min-h-13 py-3 whitespace-normal text-center">
                                    <Link to="/get-involved">
                                        Sponsor a child for $
                                        {MONTHLY_COST_USD}
                                        {' '}
                                        a month
                                        <ArrowRight strokeWidth={1.75} />
                                    </Link>
                                </Button>
                                <Button asChild variant="outline" size="lg">
                                    <Link to="/our-family">Read our story</Link>
                                </Button>
                            </div>
                        </div>

                        <div className="relative mt-12 min-w-0 self-center sm:mt-6 lg:col-span-5 lg:mt-0">
                            <Stamp
                                src={childrenAtHome}
                                alt="The children and carers of OHCDS outside the home in Budhanilkantha, waving at the camera"
                                country="Nepal · Dadagaun"
                                denomination={`$${MONTHLY_COST_USD}`}
                                caption="One child, one month of care"
                                imgClassName="aspect-[3/2] object-[50%_28%]"
                                className="mx-auto max-w-md rotate-[1.5deg] lg:max-w-none"
                                priority
                            />
                            <Postmark
                                ringTop="DADAGAUN · KATHMANDU"
                                small="EST."
                                big="2002"
                                waves
                                className="postmark-strike pointer-events-none absolute -top-[4.5rem] -left-1 w-52 mix-blend-multiply sm:-top-14 sm:-left-20 sm:w-72"
                            />
                        </div>
                    </div>
                </div>

                <FrankedFigures className="mt-14" />
            </MaxWidthWrapper>
        </section>
    );
}

export default Hero;
