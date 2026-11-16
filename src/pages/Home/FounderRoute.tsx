import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

import chandragiriTrip from '@/assets/chandragiri-trip.jpg';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';

const stops = [
    {
        when: '1983',
        where: 'Surkhet',
        text: 'Ramesh Dev Sunar is seven when he stands at his parents’ graves. A relative takes him in, then puts him to work instead of school.',
    },
    {
        when: 'Age 10',
        where: 'The bus to Kathmandu',
        text: 'He is put on a bus to the capital with nothing but the clothes he wears. The streets become his home. He works in shops and butcheries, any job he can find.',
    },
    {
        when: '2002',
        where: 'Dadagaun',
        text: 'With almost no money, he rents four small rooms. The first child he welcomes is Prithivi, seven years old, the same age Ramesh was when he lost everything.',
    },
    {
        when: 'Today',
        where: 'Budhanilkantha',
        text: 'More than 200 children have called OHCDS home. Forty live here now as one family. They do not call him sir. They call him Daddy.',
    },
];

function FounderRoute() {
    return (
        <section aria-labelledby="route-title" className="py-24 md:py-32">
            <MaxWidthWrapper className="grid gap-16 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
                <div>
                    <h2 id="route-title" className="text-4xl text-ink sm:text-5xl">From Surkhet to Dadagaun.</h2>
                    <p className="mt-5 max-w-[50ch] text-lg text-ink-soft">
                        The home exists because its founder knows exactly what it is like to have no
                        one.
                    </p>

                    <ol className="relative mt-12">
                        <span aria-hidden="true" className="absolute top-3 bottom-3 left-[1.6rem] border-l-2 border-dashed border-ink/25" />
                        {stops.map((stop) => (
                            <li key={stop.when} className="relative grid grid-cols-[3.25rem_1fr] gap-5 pb-10 last:pb-0">
                                <span className="relative flex size-[3.25rem] items-center justify-center rounded-full border-2 border-postmark bg-paper text-postmark">
                                    <span className="font-sans text-[0.6875rem] font-bold leading-none [font-stretch:125%]">{stop.when}</span>
                                </span>
                                <div className="pt-1">
                                    <h3 className="text-xl text-ink">{stop.where}</h3>
                                    <p className="mt-2 max-w-[56ch] text-ink-soft">{stop.text}</p>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>

                <div className="flex flex-col gap-10 lg:pt-24">
                    <figure className="rotate-[-1.2deg] bg-sheet p-3 pb-4 shadow-[0_14px_30px_-12px_rgb(22_34_74/0.35)]">
                        <img
                            src={chandragiriTrip}
                            alt="The children and their carers on a family trip to Chandragiri Hills"
                            className="aspect-square w-full object-cover"
                            loading="lazy"
                            decoding="async"
                        />
                        <figcaption className="mt-3 font-serif text-sm italic text-ink-soft">
                            A family day out at Chandragiri Hills.
                        </figcaption>
                    </figure>
                    <blockquote className="border-t border-ink/20 pt-6">
                        <p className="font-serif text-2xl leading-snug text-ink italic sm:text-[1.7rem]">
                            &ldquo;I know what it means to be hungry. I know what it means to have
                            no one.
                            That is why every child who comes to me&hellip; they become mine.&rdquo;
                        </p>
                        <footer className="postal mt-4 text-ink-faint">Ramesh Dev Sunar, founder</footer>
                    </blockquote>
                    <Link
                        to="/our-family"
                        className="group inline-flex w-fit items-center gap-2 font-sans font-semibold text-airmail-red [font-stretch:106%]"
                    >
                        Meet the whole family
                        <ArrowRight className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-1" strokeWidth={1.75} />
                    </Link>
                </div>
            </MaxWidthWrapper>
        </section>
    );
}

export default FounderRoute;
