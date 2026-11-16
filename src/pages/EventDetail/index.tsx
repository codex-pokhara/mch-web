/* The event description is sanitized with DOMPurify before rendering. */
/* eslint-disable react/no-danger */
import {
    Link,
    useParams,
} from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft } from 'lucide-react';

import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import ReplyPanel from '@/components/ReplyPanel';
import SafeImage from '@/components/SafeImage';
import { ErrorNote } from '@/components/States';
import { contact } from '@/constants';
import { usePageTitle } from '@/hooks/usePageTitle';
import {
    getEvent,
    queryKeys,
} from '@/lib/api';
import {
    formatDateRange,
    sanitizeHtml,
} from '@/lib/format';

function BackLink() {
    return (
        <Link to="/event" className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-airmail-red [font-stretch:106%] hover:underline">
            <ArrowLeft className="size-4" strokeWidth={1.75} />
            All events
        </Link>
    );
}

function EventDetail() {
    const { id = '' } = useParams();
    const {
        data: event,
        isPending,
        isError,
        error,
        refetch,
    } = useQuery({
        queryKey: queryKeys.event(id),
        queryFn: () => getEvent(id),
        enabled: !!id,
    });
    usePageTitle(event?.title ?? 'Event');

    if (isPending) {
        return (
            <MaxWidthWrapper className="py-16">
                <div aria-busy="true">
                    <span className="sr-only">Loading</span>
                    <div className="skeleton h-4 w-32 rounded-[2px]" />
                    <div className="skeleton mt-6 h-14 w-3/4 rounded-[2px]" />
                    <div className="skeleton mt-10 aspect-[21/9] w-full rounded-[2px]" />
                </div>
            </MaxWidthWrapper>
        );
    }

    if (isError) {
        return (
            <MaxWidthWrapper className="py-20">
                <BackLink />
                <ErrorNote className="mt-8" message={error.message} onRetry={() => refetch()} />
            </MaxWidthWrapper>
        );
    }

    const facts = [
        { label: 'When', value: formatDateRange(event.start_date, event.end_date) },
        { label: 'Where', value: event.location },
        { label: 'Type', value: event.event_type },
        { label: 'Organiser', value: 'Mountain Children’s Home' },
    ].filter((fact) => fact.value);

    return (
        <>
            <article className="pt-10 pb-16 md:pt-14">
                <MaxWidthWrapper>
                    <BackLink />
                    <h1 className="mt-8 max-w-4xl text-4xl leading-[1.05] text-ink sm:text-5xl lg:text-6xl">{event.title}</h1>
                    {event.cover_image && (
                        <SafeImage
                            src={event.cover_image}
                            alt=""
                            className="mt-12 aspect-[21/9] w-full rounded-[2px] object-cover"
                            decoding="async"
                        />
                    )}
                    <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_20rem] lg:gap-20">
                        <div
                            className="letter-prose"
                            dangerouslySetInnerHTML={{ __html: sanitizeHtml(event.description) }}
                        />
                        <aside className="lg:sticky lg:top-28 lg:self-start">
                            <dl className="border-t-2 border-ink">
                                {facts.map((fact) => (
                                    <div key={fact.label} className="border-b border-ink/15 py-4">
                                        <dt className="postal text-ink-faint">{fact.label}</dt>
                                        <dd className="mt-1 text-ink">{fact.value}</dd>
                                    </div>
                                ))}
                                <div className="py-4">
                                    <dt className="postal text-ink-faint">Questions</dt>
                                    <dd className="mt-1">
                                        <a className="break-all text-ink underline decoration-ink/30 hover:decoration-ink" href={`mailto:${contact.email}`}>
                                            {contact.email}
                                        </a>
                                    </dd>
                                </div>
                            </dl>
                        </aside>
                    </div>
                </MaxWidthWrapper>
            </article>
            <ReplyPanel title="Cannot make it in person?" />
        </>
    );
}

export default EventDetail;
