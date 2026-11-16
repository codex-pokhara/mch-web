import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { MapPin } from 'lucide-react';

import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import PageHeader from '@/components/PageHeader';
import DateCancel from '@/components/Postal/DateCancel';
import Postmark from '@/components/Postal/Postmark';
import SafeImage from '@/components/SafeImage';
import {
    EmptyNote,
    ErrorNote,
    SkeletonGrid,
} from '@/components/States';
import { usePageTitle } from '@/hooks/usePageTitle';
import {
    type EventItem,
    getEvents,
    queryKeys,
} from '@/lib/api';
import {
    excerpt,
    formatDateRange,
} from '@/lib/format';

/** Shown when an event has no cover, or its file fails to load: a postmark of place and year. */
function NoPhoto({ event }: { event: EventItem }) {
    const year = new Date(event.start_date).getFullYear();
    const place = (event.location || 'Dadagaun').toUpperCase();
    return (
        <span className="flex h-full w-full items-center justify-center">
            <Postmark
                ringTop={`${place} · NEPAL`}
                small="EVENT"
                big={Number.isNaN(year) ? 'OHCDS' : String(year)}
                className="w-24 -rotate-12 opacity-80"
            />
        </span>
    );
}

function EventRow({ event }: { event: EventItem }) {
    return (
        <li className="border-b border-ink/15">
            <Link to={`/event/${event.id}`} className="group grid gap-6 py-8 sm:grid-cols-[5rem_1fr] md:grid-cols-[5rem_1fr_16rem] md:items-center md:gap-10">
                <DateCancel value={event.start_date} className="size-20" />
                <span className="block">
                    {event.event_type && <span className="postal text-airmail-red">{event.event_type}</span>}
                    <span className="mt-1.5 block font-sans text-2xl font-semibold text-ink [font-stretch:106%] group-hover:underline">
                        {event.title}
                    </span>
                    <span className="mt-2 block text-ink-soft">{formatDateRange(event.start_date, event.end_date)}</span>
                    {event.location && (
                        <span className="mt-1 flex items-center gap-1.5 text-ink-soft">
                            <MapPin className="size-4" strokeWidth={1.75} aria-hidden="true" />
                            {event.location}
                        </span>
                    )}
                    <span className="mt-3 block max-w-[60ch] text-ink-soft">{excerpt(event.description, 140)}</span>
                </span>
                <span className="hidden aspect-[4/3] overflow-hidden rounded-[2px] bg-paper-deep md:block">
                    <SafeImage
                        src={event.cover_image}
                        alt=""
                        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                        loading="lazy"
                        decoding="async"
                        fallback={<NoPhoto event={event} />}
                    />
                </span>
            </Link>
        </li>
    );
}

function Events() {
    usePageTitle('Events');
    const {
        data,
        isPending,
        isError,
        error,
        refetch,
    } = useQuery({ queryKey: queryKeys.events, queryFn: getEvents });

    const events = data?.results ?? [];

    let body = null;
    if (isPending) {
        body = <SkeletonGrid count={3} itemClassName="h-28" className="lg:grid-cols-1" />;
    } else if (isError) {
        body = <ErrorNote message={error.message} onRetry={() => refetch()} />;
    } else if (events.length === 0) {
        body = (
            <EmptyNote title="No events on the calendar right now.">
                Follow us on Facebook or write to us to hear about the next one.
            </EmptyNote>
        );
    } else {
        body = (
            <ul className="border-t border-ink/20">
                {events.map((event) => <EventRow key={event.id} event={event} />)}
            </ul>
        );
    }

    return (
        <>
            <PageHeader
                title="Events."
                lead="Celebrations, fundraisers and open days. Come and meet the children, or support them from wherever you are."
            />
            <section className="py-16 md:py-20">
                <MaxWidthWrapper>{body}</MaxWidthWrapper>
            </section>
        </>
    );
}

export default Events;
