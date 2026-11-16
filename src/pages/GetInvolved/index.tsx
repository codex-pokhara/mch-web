import ContactForm from './ContactForm';

import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import PageHeader from '@/components/PageHeader';
import {
    contact,
    MONTHLY_COST_USD,
} from '@/constants';
import { usePageTitle } from '@/hooks/usePageTitle';

const ways = [
    {
        title: 'Give',
        text: `Every dollar goes to caring for our forty children. $${MONTHLY_COST_USD} covers one child for a whole month: food, school, clothes and healthcare.`,
    },
    {
        title: 'Volunteer',
        text: 'Share your skills and time. We welcome teachers, mentors, healthcare professionals and willing hands.',
    },
    {
        title: 'Visit',
        text: 'Come and meet the family in Budhanilkantha, Dadagaun. Write to us first and we will arrange a time.',
    },
];

function GetInvolved() {
    usePageTitle('Get involved');
    return (
        <>
            <PageHeader
                title="Get involved."
                lead="Join our family. Give, volunteer or visit. Every act of kindness changes a child's life, and every letter gets a reply."
                mark={{ ringTop: 'REPLY · DADAGAUN', small: 'PER MONTH', big: `$${MONTHLY_COST_USD}` }}
            />

            <section id="ways" aria-labelledby="ways-title" className="scroll-mt-24 py-20 md:py-28">
                <MaxWidthWrapper className="grid gap-14 lg:grid-cols-[1fr_1.4fr] lg:gap-24">
                    <div>
                        <h2 id="ways-title" className="text-4xl text-ink sm:text-5xl">Three ways to help.</h2>
                        <p className="mt-6 max-w-[40ch] text-lg text-ink-soft">
                            There is no online payment yet. Write to us below and we will reply
                            personally with how to
                            give, or to arrange your visit.
                        </p>
                    </div>
                    <dl className="border-t border-ink/20">
                        {ways.map((way) => (
                            <div key={way.title} className="grid gap-2 border-b border-ink/15 py-7 sm:grid-cols-[10rem_1fr] sm:gap-8">
                                <dt className="font-sans text-2xl font-bold text-ink [font-stretch:112.5%]">{way.title}</dt>
                                <dd className="text-lg text-ink-soft">{way.text}</dd>
                            </div>
                        ))}
                    </dl>
                </MaxWidthWrapper>
            </section>

            <section id="write" aria-labelledby="write-title" className="scroll-mt-24 pb-24 md:pb-32">
                <MaxWidthWrapper>
                    <div className="airmail-frame bg-sheet">
                        <div className="grid gap-12 p-6 sm:p-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16 lg:p-14">
                            <div>
                                <h2 id="write-title" className="text-4xl text-ink sm:text-5xl">Write to us.</h2>
                                <p className="mt-5 text-lg text-ink-soft">
                                    Questions, a donation, a visit or a skill to share. We read
                                    every message.
                                </p>
                                <address className="mt-10 flex flex-col gap-6 border-t border-ink/15 pt-6 not-italic">
                                    <div>
                                        <p className="postal text-ink-faint">Address</p>
                                        <p className="mt-1.5 text-ink">
                                            {contact.addressLines.map((line) => <span key={line} className="block">{line}</span>)}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="postal text-ink-faint">Email</p>
                                        <a className="mt-1.5 block break-all text-ink underline decoration-ink/30 hover:decoration-ink" href={`mailto:${contact.email}`}>
                                            {contact.email}
                                        </a>
                                    </div>
                                    <div>
                                        <p className="postal text-ink-faint">Phone</p>
                                        <a className="mt-1.5 block text-ink underline decoration-ink/30 hover:decoration-ink tabular" href={contact.phoneHref}>
                                            {contact.phone}
                                        </a>
                                    </div>
                                </address>
                            </div>
                            <ContactForm />
                        </div>
                    </div>
                </MaxWidthWrapper>
            </section>
        </>
    );
}

export default GetInvolved;
