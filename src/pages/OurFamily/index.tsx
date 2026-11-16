import { type ReactNode } from 'react';

import gitaPortrait from '@/assets/gita.jpg';
import rameshPortrait from '@/assets/ramesh.jpg';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import PageHeader from '@/components/PageHeader';
import Stamp from '@/components/Postal/Stamp';
import ReplyPanel from '@/components/ReplyPanel';
import { usePageTitle } from '@/hooks/usePageTitle';
import { cn } from '@/lib/utils';

const beliefs = [
    { title: 'One family', text: 'Every child belongs to one household, with the same two parents.' },
    { title: 'Every child graduates', text: 'One hundred percent of our children complete their education.' },
    { title: 'Alumni come home', text: 'Graduates return to visit their parents and their brothers and sisters.' },
];

function Parent({
    name,
    caption,
    photo,
    alt,
    flip = false,
    children,
}: {
    name: string;
    caption: string;
    photo: string;
    alt: string;
    flip?: boolean;
    children: ReactNode;
}) {
    return (
        <section aria-label={name} className="py-20 md:py-28">
            <MaxWidthWrapper className="grid items-center gap-12 md:grid-cols-[0.8fr_1fr] md:gap-20">
                <Stamp
                    src={photo}
                    alt={alt}
                    country="Nepal"
                    caption={caption}
                    imgClassName="aspect-[4/5] object-top"
                    className={cn('mx-auto w-full max-w-sm', flip ? 'md:order-2 rotate-[1.5deg]' : '-rotate-[1.5deg]')}
                />
                <div className={cn(flip && 'md:order-1')}>
                    <h2 className="text-4xl text-ink sm:text-5xl">{name}</h2>
                    <div className="mt-6 flex max-w-[60ch] flex-col gap-5 text-lg text-ink-soft">{children}</div>
                </div>
            </MaxWidthWrapper>
        </section>
    );
}

function OurFamily() {
    usePageTitle('Our family');
    return (
        <>
            <PageHeader
                title="Our family."
                lead="Not an institution. A family. Every child here has a Mummy and a Daddy."
                mark={{ ringTop: 'OUR FAMILY · DADAGAUN', small: 'SINCE', big: '2002' }}
            />

            <Parent
                name="Ramesh Dev Sunar"
                caption="Founder and chairman. Daddy to every child here."
                photo={rameshPortrait}
                alt="Ramesh Dev Sunar in a dhaka topi and marigold garland, standing in front of a pagoda"
            >
                <p>
                    Ramesh lost both parents at seven and spent years as a street child in
                    Kathmandu. In 2002 he opened
                    his home to his first child, a seven-year-old boy, the same age Ramesh was when
                    he became an orphan.
                </p>
                <p>
                    Today every child calls him Daddy, because that is exactly what he is to them.
                    From a boy with
                    nothing to a father of hundreds, his story is one of resilience and a love that
                    has no limit.
                </p>
                <blockquote className="mt-2 border-t border-ink/20 pt-5 font-serif text-xl italic leading-snug text-ink">
                    &ldquo;I know what it means to be hungry. I know what it means to have no one.
                    That is why every
                    child who comes to me&hellip; they become mine.&rdquo;
                </blockquote>
            </Parent>

            <div className="bg-paper-deep/60">
                <Parent
                    name="Gita B.K."
                    caption="Co-founder. Mummy to every child here."
                    photo={gitaPortrait}
                    alt="Gita B.K. in an embroidered magenta kurta, seated on a boat"
                    flip
                >
                    <p>
                        Gita has been at Ramesh&apos;s side since the beginning. She runs the
                        household day to day and
                        makes sure every child is fed, healthy and cared for.
                    </p>
                    <p>
                        To the children she is simply Mummy. Her warmth and tireless care are what
                        make OHCDS a real home,
                        a place where children feel safe and loved, rather than a shelter.
                    </p>
                </Parent>
            </div>

            <section aria-labelledby="belief-title" className="bg-ink py-24 text-sheet md:py-32">
                <MaxWidthWrapper className="grid gap-14 lg:grid-cols-[1fr_1.3fr] lg:gap-24">
                    <div>
                        <h2 id="belief-title" className="text-4xl sm:text-5xl">Children need a family.</h2>
                        <p className="mt-6 max-w-[46ch] text-lg text-sheet/75">
                            Our forty children do not have caretakers. They have Mummy and Daddy.
                            They do not live in a
                            facility. They live at home. A team of carers, teachers and staff keeps
                            them safe, schooled
                            and well.
                        </p>
                    </div>
                    <dl className="border-t border-sheet/20">
                        {beliefs.map((belief) => (
                            <div key={belief.title} className="grid gap-2 border-b border-sheet/20 py-7 sm:grid-cols-[13rem_1fr] sm:gap-8">
                                <dt className="font-sans text-xl font-semibold [font-stretch:112.5%]">{belief.title}</dt>
                                <dd className="text-lg text-sheet/75">{belief.text}</dd>
                            </div>
                        ))}
                    </dl>
                </MaxWidthWrapper>
            </section>

            <ReplyPanel title="Become part of the family." />
        </>
    );
}

export default OurFamily;
