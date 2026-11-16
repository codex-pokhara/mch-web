import childrenAtHome from '@/assets/children-at-home.jpg';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import PageHeader from '@/components/PageHeader';
import FrankedFigures from '@/components/Postal/FrankedFigures';
import Postmark from '@/components/Postal/Postmark';
import ReplyPanel from '@/components/ReplyPanel';
import { usePageTitle } from '@/hooks/usePageTitle';
import { cn } from '@/lib/utils';

const alumni = [
    {
        name: 'Jeevan Tamang',
        role: 'Agriculture Officer',
        place: 'Khaniyabas Rural Municipality, Dhading',
        crop: 'object-[12%_60%]',
        quote: 'OHCDS gave me not just food and shelter, but a family that believed in me.',
    },
    {
        name: 'Shova Sunar',
        role: 'Restaurant Manager',
        place: 'KFC, Kathmandu',
        crop: 'object-[52%_62%]',
        quote: 'Mummy and Daddy taught me that my background doesn’t define my future.',
    },
    {
        name: 'Yubraj Malla',
        role: 'Professional Chef',
        place: 'Cyprus',
        crop: 'object-[88%_60%]',
        quote: 'I learned to cook at OHCDS. Now I cook for people around the world, but my heart is always in Dadagaun.',
    },
];

function Postcard({ person }: { person: typeof alumni[number] }) {
    return (
        <li className="max-w-3xl bg-sheet shadow-[0_18px_40px_-24px_rgb(22_34_74/0.45)] md:odd:-rotate-[0.6deg] md:even:ml-auto md:even:rotate-[0.7deg]">
            <figure className="grid h-full md:grid-cols-[1.25fr_1fr]">
                <blockquote className="flex p-7 sm:p-9">
                    <p className="font-serif text-xl leading-snug italic text-ink sm:text-2xl">
                        &ldquo;
                        {person.quote}
                        &rdquo;
                    </p>
                </blockquote>
                <figcaption className="flex flex-col border-t border-ink/15 p-7 sm:p-9 md:border-t-0 md:border-l">
                    <span aria-hidden="true" className="relative ml-auto block w-16">
                        <span className="stamp-shadow block">
                            <span className="stamp block [--hole:3px] [--step:9px] !p-[6px]">
                                <img
                                    src={childrenAtHome}
                                    alt=""
                                    className={cn('block aspect-[4/5] w-full object-cover', person.crop)}
                                    loading="lazy"
                                />

                            </span>
                        </span>
                        <Postmark
                            ringTop="DADAGAUN · NEPAL"
                            big="OHCDS"
                            className="pointer-events-none absolute top-3 -left-9 w-16 -rotate-12 mix-blend-multiply"
                        />
                    </span>
                    <span className="mt-6 flex flex-col md:mt-auto">
                        <span className="border-b border-ink/20 pb-2 font-sans text-lg font-semibold text-ink [font-stretch:112.5%]">
                            {person.name}
                        </span>
                        <span className="border-b border-ink/20 py-2 text-ink-soft">{person.role}</span>
                        <span className="py-2 text-ink-soft">{person.place}</span>
                    </span>
                </figcaption>
            </figure>
        </li>
    );
}

function Impact() {
    usePageTitle('Impact');
    return (
        <>
            <PageHeader
                title="Our impact."
                lead="Real people and real numbers. This is what twenty-three years of family life in Dadagaun adds up to."
                mark={{ ringTop: 'IMPACT · KATHMANDU', small: 'YEARS', big: '23' }}
            />

            <section aria-label="Figures" className="py-16 md:py-20">
                <MaxWidthWrapper>
                    <FrankedFigures />
                </MaxWidthWrapper>
            </section>

            <section aria-labelledby="alumni-title" className="pb-24 md:pb-32">
                <MaxWidthWrapper>
                    <div className="max-w-2xl">
                        <h2 id="alumni-title" className="text-4xl text-ink sm:text-5xl">Postcards from our alumni.</h2>
                        <p className="mt-5 text-lg text-ink-soft">
                            Each of them grew up at OHCDS and now lives as an independent adult, in
                            Nepal and abroad.
                        </p>
                    </div>
                    <ul className="mt-14 flex flex-col gap-10 md:gap-12">
                        {alumni.map((person) => <Postcard key={person.name} person={person} />)}
                    </ul>
                </MaxWidthWrapper>
            </section>

            <section className="bg-ink py-20 text-sheet md:py-24">
                <MaxWidthWrapper>
                    <p className="max-w-4xl font-sans text-3xl font-bold leading-tight [font-stretch:112.5%] sm:text-5xl">
                        More than 200 children have grown up at OHCDS in twenty-three years.
                    </p>
                    <p className="mt-6 max-w-[58ch] text-lg text-sheet/75">
                        Our alumni include engineers, teachers, healthcare workers and professionals
                        across Nepal and
                        around the world.
                    </p>
                </MaxWidthWrapper>
            </section>

            <ReplyPanel title="Help the next child finish school." />
        </>
    );
}

export default Impact;
