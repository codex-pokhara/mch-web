import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
    keepPreviousData,
    useQuery,
} from '@tanstack/react-query';

import AlbumView from './AlbumView';
import Pagination from './Pagination';

import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import PageHeader from '@/components/PageHeader';
import SafeImage from '@/components/SafeImage';
import {
    EmptyNote,
    ErrorNote,
    SkeletonGrid,
} from '@/components/States';
import { usePageTitle } from '@/hooks/usePageTitle';
import {
    type Album,
    ALBUMS_PAGE_SIZE,
    getAlbums,
    queryKeys,
} from '@/lib/api';

function AlbumCard({ album, onOpen }: { album: Album; onOpen: () => void }) {
    return (
        <li>
            <button type="button" onClick={onOpen} className="group block w-full text-left">
                <span className="block overflow-hidden rounded-[2px] bg-paper-deep">
                    <SafeImage
                        src={album.cover_image}
                        alt=""
                        className="aspect-[4/3] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                        loading="lazy"
                        decoding="async"
                    />
                </span>
                <span className="mt-4 flex items-baseline justify-between gap-4">
                    <span className="font-sans text-xl font-semibold text-ink [font-stretch:106%] group-hover:underline">
                        {album.title}
                    </span>
                    <span className="postal shrink-0 text-ink-faint tabular">
                        {album.photo_count}
                        {' '}
                        {album.photo_count === 1 ? 'photo' : 'photos'}
                    </span>
                </span>
            </button>
        </li>
    );
}

function Gallery() {
    usePageTitle('Gallery');
    const [searchParams, setSearchParams] = useSearchParams();
    const [page, setPage] = useState(1);
    const albumParam = Number(searchParams.get('album'));
    const albumId = Number.isInteger(albumParam) && albumParam > 0 ? albumParam : null;

    const {
        data,
        isPending,
        isError,
        error,
        refetch,
    } = useQuery({
        queryKey: queryKeys.albums(page),
        queryFn: () => getAlbums(page),
        placeholderData: keepPreviousData,
    });

    const albums = data?.results ?? [];
    const totalPages = data ? Math.ceil(data.count / ALBUMS_PAGE_SIZE) : 0;
    const selected = albums.find((album) => album.id === albumId);

    const openAlbum = (album: Album) => {
        setSearchParams({ album: String(album.id) });
        window.scrollTo({ top: 0 });
    };

    let body = null;
    if (albumId) {
        body = (
            <AlbumView
                key={albumId}
                albumId={albumId}
                title={selected?.title ?? 'Album'}
                onBack={() => setSearchParams({})}
            />
        );
    } else if (isPending) {
        body = <SkeletonGrid count={6} />;
    } else if (isError) {
        body = <ErrorNote message={error.message} onRetry={() => refetch()} />;
    } else if (albums.length === 0) {
        body = <EmptyNote title="No albums yet.">Photos from the home will appear here soon.</EmptyNote>;
    } else {
        body = (
            <>
                <ul className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                    {albums.map((album) => (
                        <AlbumCard key={album.id} album={album} onOpen={() => openAlbum(album)} />
                    ))}
                </ul>
                <Pagination label="Album pages" page={page} totalPages={totalPages} onPageChange={setPage} />
            </>
        );
    }

    return (
        <>
            <PageHeader
                title="Gallery."
                lead="Moments of joy, learning and growing up at Mountain Children's Home, sorted into albums."
            />
            <section className="py-16 md:py-20">
                <MaxWidthWrapper>{body}</MaxWidthWrapper>
            </section>
        </>
    );
}

export default Gallery;
