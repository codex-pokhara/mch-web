import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { Button } from '@/components/ui/button';
import {
    contact,
    MONTHLY_COST_USD,
} from '@/constants';

/** The close of every page: the reply slip, framed in the airmail border. */
function ReplyPanel({
    title = 'Write back to Dadagaun.',
    body = `$${MONTHLY_COST_USD} feeds, schools and cares for one child for a whole month. Tell us how you would like to help and we will reply personally.`,
}: {
    title?: string;
    body?: string;
}) {
    return (
        <section className="py-20 md:py-28" aria-labelledby="reply-title">
            <MaxWidthWrapper>
                <div className="airmail-frame bg-sheet">
                    <div className="grid gap-10 p-7 sm:p-10 md:grid-cols-[1.4fr_1fr] md:gap-16 md:p-14">
                        <div>
                            <h2 id="reply-title" className="text-4xl text-ink sm:text-5xl">{title}</h2>
                            <p className="mt-5 max-w-[52ch] text-lg text-ink-soft">{body}</p>
                            <div className="mt-8 flex flex-wrap gap-3">
                                <Button asChild variant="stamp" size="lg">
                                    <Link to="/get-involved#write">
                                        Sponsor a child
                                        <ArrowRight strokeWidth={1.75} />
                                    </Link>
                                </Button>
                                <Button asChild variant="outline" size="lg">
                                    <Link to="/transparency">See where money goes</Link>
                                </Button>
                            </div>
                        </div>
                        <address className="not-italic md:border-l md:border-ink/15 md:pl-10">
                            <p className="postal text-ink-faint">Reply to</p>
                            <p className="mt-3 font-serif text-lg leading-relaxed text-ink">
                                OHCDS Mountain Children&apos;s Home
                                {contact.addressLines.map((line) => (
                                    <span key={line} className="block">{line}</span>
                                ))}
                            </p>
                            <p className="mt-5 flex flex-col gap-1.5 text-ink">
                                <a className="w-fit break-all underline decoration-ink/30 hover:decoration-ink" href={`mailto:${contact.email}`}>
                                    {contact.email}
                                </a>
                                <a className="w-fit underline decoration-ink/30 hover:decoration-ink tabular" href={contact.phoneHref}>
                                    {contact.phone}
                                </a>
                            </p>
                        </address>
                    </div>
                </div>
            </MaxWidthWrapper>
        </section>
    );
}

export default ReplyPanel;
