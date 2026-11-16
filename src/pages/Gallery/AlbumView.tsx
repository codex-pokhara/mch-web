import { useState } from 'react';
import {
    keepPreviousData,
    useQuery,
} from '@tanstack/react-query';
import { ArrowLeft } from 'lucide-react';

import Lightbox from './Lightbox';
import Pagination from './Pagination';

import SafeImage from '@/components/SafeImage';
import {
    EmptyNote,
    ErrorNote,
    SkeletonGrid,
} from '@/components/States';
import {
    getAlbumPhotos,
    PHOTOS_PAGE_SIZE,
    queryKeys,
} from '@/lib/api';

function AlbumView({
    albumId,
    title,
    onBack,
}: {
    albumId: number;
    title: string;
    onBack: () => void;
}) {
    const [page, setPage] = useState(1);
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const {
        data,
        isPending,
        isError,
        error,
        refetch,
    } = useQuery({
        queryKey: queryKeys.albumPhotos(albumId, page),
        queryFn: () => getAlbumPhotos(albumId, page),
        placeholderData: keepPreviousData,
    });

    const photos = data?.results ?? [];
    const totalPages = data ? Math.ceil(data.count / PHOTOS_PAGE_SIZE) : 0;

    let body = null;
    if (isPending) {
        body = <SkeletonGrid count={6} itemClassName="aspect-square" />;
    } else if (isError) {
        body = <ErrorNote message={error.message} onRetry={() => refetch()} />;
    } else if (photos.length === 0) {
        body = <EmptyNote title="This album is still empty." />;
    } else {
        body = (
            <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
                {photos.map((photo, position) => (
                    <li key={photo.id}>
                        <button
                            type="button"
                            onClick={() => setOpenIndex(position)}
                            className="group block aspect-square w-full cursor-zoom-in overflow-hidden rounded-[2px] bg-paper-deep"
                        >
                            <SafeImage
                                src={photo.image}
                                alt={photo.caption || `Photo ${position + 1} in ${title}`}
                                className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                                loading="lazy"
                                decoding="async"
                            />
                        </button>
                    </li>
                ))}
            </ul>
        );
    }

    return (
        <div>
            <button
                type="button"
                onClick={onBack}
                className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-airmail-red [font-stretch:106%] hover:underline"
            >
                <ArrowLeft className="size-4" strokeWidth={1.75} />
                All albums
            </button>
            <h2 className="mt-4 mb-10 text-4xl text-ink sm:text-5xl">{title}</h2>
            {body}
            <Pagination
                label="Photo pages"
                page={page}
                totalPages={totalPages}
                onPageChange={(next) => {
                    setPage(next);
                    setOpenIndex(null);
                    window.scrollTo({ top: 0 });
                }}
            />
            <Lightbox
                photos={photos}
                index={openIndex}
                onIndexChange={setOpenIndex}
                onClose={() => setOpenIndex(null)}
            />
        </div>
    );
}

export default AlbumView;
