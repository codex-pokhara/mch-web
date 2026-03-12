import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import GallerySection, { type Album, type Photo } from './GallerySection';

import HeroSection from '@/components/HeroSection';
import { baseRequest } from '@/lib/base';

interface PaginatedResponse<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
}

const ALBUMS_PAGE_SIZE = 10;
const PHOTOS_PAGE_SIZE = 12;

const galleryService = {
    async getAlbums(page: number): Promise<PaginatedResponse<Album>> {
        const response = await baseRequest({
            url: `/cms/albums/?page=${page}&size=${ALBUMS_PAGE_SIZE}`,
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch albums: ${response.statusText}`);
        }

        return response.data;
    },

    async getPhotos(albumId: number, page: number): Promise<PaginatedResponse<Photo>> {
        const response = await baseRequest({
            url: `/cms/photos/?album=${albumId}&page=${page}&size=${PHOTOS_PAGE_SIZE}`,
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch photos: ${response.statusText}`);
        }

        return response.data;
    },
};

function Gallery() {
    const [selectedImage, setSelectedImage] = useState<number | null>(null);
    const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
    const [albumsPage, setAlbumsPage] = useState(1);
    const [photosPage, setPhotosPage] = useState(1);

    const title = 'Our Gallery';
    const description = 'Explore the moments of joy, learning, and growth at Mountain Children Home through our photo gallery.';

    const {
        data: albumsResponse,
        isLoading: albumsLoading,
        isError: albumsError,
        error: albumsErrorObj,
    } = useQuery({
        queryKey: ['albums', albumsPage],
        queryFn: () => galleryService.getAlbums(albumsPage),
    });

    const {
        data: photosResponse,
        isLoading: photosLoading,
    } = useQuery({
        queryKey: ['photos', selectedAlbum?.id, photosPage],
        queryFn: () => galleryService.getPhotos(selectedAlbum!.id, photosPage),
        enabled: !!selectedAlbum,
    });

    const albums = albumsResponse?.results || [];
    // eslint-disable-next-line max-len
    const albumsTotalPages = albumsResponse ? Math.ceil(albumsResponse.count / ALBUMS_PAGE_SIZE) : 0;

    const photos = photosResponse?.results || [];
    // eslint-disable-next-line max-len
    const photosTotalPages = photosResponse ? Math.ceil(photosResponse.count / PHOTOS_PAGE_SIZE) : 0;

    const handleSelectAlbum = (album: Album) => {
        setSelectedAlbum(album);
        setPhotosPage(1);
        setSelectedImage(null);
    };

    const handleBackToAlbums = () => {
        setSelectedAlbum(null);
        setPhotosPage(1);
        setSelectedImage(null);
    };

    const openImage = (index: number) => {
        setSelectedImage(index);
    };

    const closeImage = () => {
        setSelectedImage(null);
    };

    const nextImage = () => {
        if (selectedImage !== null && selectedImage < photos.length - 1) {
            setSelectedImage(selectedImage + 1);
        }
    };

    const prevImage = () => {
        if (selectedImage !== null && selectedImage > 0) {
            setSelectedImage(selectedImage - 1);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'Escape') closeImage();
    };

    if (albumsLoading) {
        return (
            <>
                <HeroSection title={title} description={description} />
                <div className="container mx-auto px-4 py-8">
                    <div className="flex items-center justify-center min-h-[400px]">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
                            <p className="text-muted-foreground">Loading gallery...</p>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    if (albumsError) {
        return (
            <>
                <HeroSection title={title} description={description} />
                <div className="container mx-auto px-4 py-8">
                    <div className="flex items-center justify-center min-h-[400px]">
                        <div className="text-center">
                            <p className="text-red-600 mb-4">Failed to load gallery</p>
                            <p className="text-muted-foreground">
                                {albumsErrorObj instanceof Error ? albumsErrorObj.message : 'An unexpected error occurred'}
                            </p>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    if (albums.length === 0) {
        return (
            <>
                <HeroSection title={title} description={description} />
                <div className="container mx-auto px-4 py-8">
                    <div className="flex items-center justify-center min-h-[400px]">
                        <div className="text-center">
                            <p className="text-muted-foreground">No albums found</p>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <HeroSection title={title} description={description} />

            <GallerySection
                selectedAlbum={selectedAlbum}
                onSelectAlbum={handleSelectAlbum}
                onBackToAlbums={handleBackToAlbums}
                albums={albums}
                albumsPage={albumsPage}
                albumsTotalPages={albumsTotalPages}
                onAlbumsPageChange={setAlbumsPage}
                photos={photos}
                photosLoading={photosLoading}
                photosPage={photosPage}
                photosTotalPages={photosTotalPages}
                onPhotosPageChange={setPhotosPage}
                selectedImage={selectedImage}
                openImage={openImage}
                closeImage={closeImage}
                handleKeyDown={handleKeyDown}
                prevImage={prevImage}
                nextImage={nextImage}
            />
        </>
    );
}

export default Gallery;
