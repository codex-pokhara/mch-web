import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import GallerySection, { type Album } from './GallerySection';

import HeroSection from '@/components/HeroSection';
import { baseRequest } from '@/lib/base';

interface AlbumAPIResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Album[];
}

export interface Photo {
    id: number;
    image: string;
    caption: string;
    created_at: string;
    album: number;
  }

const galleryService = {
    async getAlbums(): Promise<AlbumAPIResponse> {
        const response = await baseRequest({
            url: '/cms/albums/',
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch albums: ${response.statusText}`);
        }

        return response.data;
    },
};

const QUERY_KEYS = {
    photos: ['photos'] as const,
    albums: ['albums'] as const,
} as const;

function Gallery() {
    const [selectedImage, setSelectedImage] = useState<number | null>(null);
    const [selectedAlbum, setSelectedAlbum] = useState<string | null>(null);
    const title = 'Our Gallery';
    const description = 'Explore the moments of joy, learning, and growth at Mountain Children Home through our photo gallery.';

    const {
        data: albumsResponse,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: QUERY_KEYS.albums, // Add this to your QUERY_KEYS constant
        queryFn: galleryService.getAlbums,
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes
        retry: 2,
        refetchOnWindowFocus: false,
    });

    // Use API data directly to match GallerySection component types
    const albums = albumsResponse?.results || [];

    const currentAlbum = albums.find((album) => album.slug === selectedAlbum);
    const currentImages = currentAlbum?.photos || [];

    const openImage = (index: number) => {
        setSelectedImage(index);
    };

    const closeImage = () => {
        setSelectedImage(null);
    };

    const nextImage = () => {
        if (selectedImage !== null && selectedImage < currentImages.length - 1) {
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

    // Handle loading state
    if (isLoading) {
        return (
            <>
                <HeroSection title={title} description={description} />
                <div className="container mx-auto px-4 py-8">
                    <div className="flex items-center justify-center min-h-[400px]">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
                            <p className="text-gray-600">Loading gallery...</p>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    // Handle error state
    if (isError) {
        return (
            <>
                <HeroSection title={title} description={description} />
                <div className="container mx-auto px-4 py-8">
                    <div className="flex items-center justify-center min-h-[400px]">
                        <div className="text-center">
                            <p className="text-red-600 mb-4">Failed to load gallery</p>
                            <p className="text-gray-600">
                                {error instanceof Error ? error.message : 'An unexpected error occurred'}
                            </p>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    // Handle empty state
    if (albums.length === 0) {
        return (
            <>
                <HeroSection title={title} description={description} />
                <div className="container mx-auto px-4 py-8">
                    <div className="flex items-center justify-center min-h-[400px]">
                        <div className="text-center">
                            <p className="text-gray-600">No albums found</p>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            {/* Hero Section */}
            <HeroSection title={title} description={description} />

            {/* Gallery Content */}
            <GallerySection
                selectedAlbum={selectedAlbum}
                setSelectedAlbum={setSelectedAlbum}
                albums={albums}
                currentAlbum={currentAlbum}
                currentImages={currentImages}
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
