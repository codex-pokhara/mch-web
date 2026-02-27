import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { Button } from '@/components/ui/button';
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

function GalleryPreview({ maxImages = 4 }: GalleryProps) {
    const { data: photosResponse, isLoading } = useQuery({
        queryKey: ['photos'],
        queryFn: galleryService.getPhotos,
    });

    const displayPhotos = useMemo(() => {
        const photos = photosResponse?.results || [];
        return photos.slice(0, maxImages);
    }, [photosResponse?.results, maxImages]);

    const loadingSkeleton = useMemo(() => (
        <section className="py-24 md:py-32 bg-muted">
            <MaxWidthWrapper>
                <div className="text-center mb-16">
                    <p className="text-xs font-semibold text-accent uppercase tracking-[0.2em] mb-4">
                        Life at OHCDS
                    </p>
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 tracking-tight">Our Gallery</h2>
                    <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                        Take a glimpse into the daily lives of our children and see the joy,
                        learning, and growth happening at Mountain Children Home.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    {Array.from({ length: maxImages }, (_, index) => (
                        <div key={index} className="relative overflow-hidden rounded-2xl">
                            <div className="w-full h-64 bg-border animate-pulse" />
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
        <section className="py-24 md:py-32 bg-muted">
            <MaxWidthWrapper>
                <div className="text-center mb-16">
                    <p className="text-xs font-semibold text-accent uppercase tracking-[0.2em] mb-4">
                        Life at OHCDS
                    </p>
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 tracking-tight">Our Gallery</h2>
                    <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                        Take a glimpse into the daily lives of our children and see the joy,
                        learning, and growth happening at Mountain Children Home.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    {displayPhotos.map((photo) => (
                        <div
                            key={photo.id}
                            className="relative group overflow-hidden rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300"
                        >
                            <img
                                src={photo.image}
                                alt={photo.caption || `Gallery image ${photo.id}`}
                                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                                loading="lazy"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = '/placeholder-image.jpg';
                                }}
                            />
                            {photo.caption && (
                                <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/70 via-black/20 to-transparent text-white p-4 text-sm">
                                    {photo.caption}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="text-center">
                    <Link to="/gallery">
                        <Button size="lg">
                            View Full Gallery
                        </Button>
                    </Link>
                </div>
            </MaxWidthWrapper>
        </section>
    );
}

export default GalleryPreview;
