import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { baseRequest } from '@/lib/base';

interface Photo {
    id: number;
    image: string;
    caption: string;
    created_at: string;
    album: number;
}

interface PhotoResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Photo[];
}

// Move service outside component to prevent recreation on each render
const galleryService = {
    async getPhotos(): Promise<PhotoResponse> {
        const response = await baseRequest({
            url: '/cms/photos/',
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch photos: ${response.statusText}`);
        }

        return response.data;
    },
};

interface GalleryProps {
    maxImages?: number;
}

function GalleryPreview({ maxImages = 5 }: GalleryProps) {
    const { data: photosResponse, isLoading } = useQuery({
        queryKey: ['photos'],
        queryFn: galleryService.getPhotos,
    });

    // Memoize the display photos to prevent unnecessary recalculations
    const displayPhotos = useMemo(() => {
        const photos = photosResponse?.results || [];
        return photos.slice(0, maxImages);
    }, [photosResponse?.results, maxImages]);

    // Memoize loading skeleton to prevent recreation
    const loadingSkeleton = useMemo(() => (
        <section className="py-16 bg-gray-50">
            <MaxWidthWrapper>
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Gallery</h2>
                    <p className="text-lg text-gray-600">
                        Take a glimpse into the daily lives of our children and see the joy,
                        learning, and growth happening at Mountain Children Home.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {Array.from({ length: maxImages }, (_, index) => (
                        <div key={index} className="relative overflow-hidden rounded-lg shadow-md">
                            <div className="w-full h-64 bg-gray-300 animate-pulse" />
                        </div>
                    ))}
                </div>
            </MaxWidthWrapper>
        </section>
    ), [maxImages]);

    if (isLoading) {
        return loadingSkeleton;
    }

    return (
        <section className="py-16 bg-gray-50">
            <MaxWidthWrapper>
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Gallery</h2>
                    <p className="text-lg text-gray-600">
                        Take a glimpse into the daily lives of our children and see the joy,
                        learning, and growth happening at Mountain Children Home.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {displayPhotos.map((photo) => (
                        <div
                            key={photo.id}
                            className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow"
                        >
                            <img
                                src={photo.image}
                                alt={photo.caption || `Gallery image ${photo.id}`}
                                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                                loading="lazy"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = '/placeholder-image.jpg';
                                }}
                            />
                            {photo.caption && (
                                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-sm">
                                    {photo.caption}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="text-center">
                    <Link
                        to="/gallery"
                        className="inline-block bg-primary hover:brightness-90 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                    >
                        View Full Gallery
                    </Link>
                </div>
            </MaxWidthWrapper>
        </section>
    );
}

export default GalleryPreview;
