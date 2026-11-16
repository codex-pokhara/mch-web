import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowRight } from 'lucide-react';

import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import SafeImage from '@/components/SafeImage';
import {
    EmptyNote,
    ErrorNote,
    SkeletonGrid,
} from '@/components/States';
import {
    getRecentPhotos,
    queryKeys,
} from '@/lib/api';
import { cn } from '@/lib/utils';

const COUNT = 5;

function RecentPhotos() {
    const {
        data,
        isPending,
        isError,
        error,
        refetch,
    } = useQuery({
        queryKey: queryKeys.recentPhotos(COUNT),
        queryFn: () => getRecentPhotos(COUNT),
    });

    const photos = (data?.results ?? []).slice(0, COUNT);

    let body = null;
    if (isPending) {
        body = <SkeletonGrid count={3} itemClassName="aspect-square" />;
    } else if (isError) {
        body = <ErrorNote message={error.message} onRetry={() => refetch()} />;
    } else if (photos.length === 0) {
        body = <EmptyNote title="New photos are on their way.">The gallery fills up after every celebration and school term.</EmptyNote>;
    } else {
        body = (
            <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 md:grid-rows-2">
                {photos.map((photo, order) => (
                    <li
                        key={photo.id}
                        className={cn(
                            'overflow-hidden rounded-[2px] bg-paper-deep',
                            order === 0 ? 'col-span-2 row-span-2 aspect-square md:aspect-auto' : 'aspect-square',
                        )}
                    >
                        <SafeImage
                            src={photo.image}
                            alt={photo.caption || 'A moment from daily life at the home'}
                            className="h-full w-full object-cover"
                            loading="lazy"
                            decoding="async"
                        />
                    </li>
                ))}
            </ul>
        );
    }

    return (
        <section aria-labelledby="photos-title" className="border-t border-ink/15 py-24 md:py-32">
            <MaxWidthWrapper>
                <div className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
                    <div>
                        <h2 id="photos-title" className="text-4xl text-ink sm:text-5xl">Life at home.</h2>
                        <p className="mt-4 max-w-[46ch] text-lg text-ink-soft">
                            Homework, birthdays, festivals and days out, as the children live them.
                        </p>
                    </div>
                    <Link
                        to="/gallery"
                        className="group inline-flex w-fit items-center gap-2 font-sans font-semibold text-airmail-red [font-stretch:106%]"
                    >
                        Open the gallery
                        <ArrowRight className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-1" strokeWidth={1.75} />
                    </Link>
                </div>
                {body}
            </MaxWidthWrapper>
        </section>
    );
}

export default RecentPhotos;
