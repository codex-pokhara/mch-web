/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

import MaxWidthWrapper from '@/components/MaxWidthWrapper';

export interface Photo {
    id: number;
    image: string;
    caption: string;
    created_at: string;
    album: number;
}

export interface Album {
    id: number;
    title: string;
    slug: string;
    description: string;
    cover_image: string;
    created_at: string;
    photo_count: number;
}

interface GalleryProps {
    selectedAlbum: Album | null;
    onSelectAlbum: (album: Album) => void;
    onBackToAlbums: () => void;
    albums: Album[];
    albumsPage: number;
    albumsTotalPages: number;
    onAlbumsPageChange: (page: number) => void;
    photos: Photo[];
    photosLoading: boolean;
    photosPage: number;
    photosTotalPages: number;
    onPhotosPageChange: (page: number) => void;
    selectedImage: number | null;
    openImage: (index: number) => void;
    closeImage: () => void;
    handleKeyDown: (e: React.KeyboardEvent<HTMLElement>) => void;
    prevImage: () => void;
    nextImage: () => void;
}

function Pagination({
    page,
    totalPages,
    onPageChange,
}: {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}) {
    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-center gap-2 mt-10">
            <button
                type="button"
                onClick={() => onPageChange(page - 1)}
                disabled={page <= 1}
                className="p-2 rounded-lg border border-border bg-background text-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
                <ChevronLeft size={18} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                    key={p}
                    type="button"
                    onClick={() => onPageChange(p)}
                    className={`min-w-[36px] h-9 rounded-lg text-sm font-medium transition-colors ${
                        p === page
                            ? 'bg-primary text-primary-foreground'
                            : 'border border-border bg-background text-foreground hover:bg-muted'
                    }`}
                >
                    {p}
                </button>
            ))}

            <button
                type="button"
                onClick={() => onPageChange(page + 1)}
                disabled={page >= totalPages}
                className="p-2 rounded-lg border border-border bg-background text-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
                <ChevronRight size={18} />
            </button>
        </div>
    );
}

function GallerySection(props: GalleryProps) {
    const {
        selectedAlbum,
        onSelectAlbum,
        onBackToAlbums,
        albums,
        albumsPage,
        albumsTotalPages,
        onAlbumsPageChange,
        photos,
        photosLoading,
        photosPage,
        photosTotalPages,
        onPhotosPageChange,
        selectedImage,
        openImage,
        closeImage,
        handleKeyDown,
        prevImage,
        nextImage,
    } = props;

    return (
        <>
            <section className="py-16 bg-background">
                <MaxWidthWrapper>
                    {!selectedAlbum ? (
                        // Album Grid
                        <>
                            <div className="text-center mb-12">
                                <h2 className="text-3xl font-bold text-foreground mb-4">Photo Albums</h2>
                                <p className="text-lg text-muted-foreground">
                                    Browse through our collection of memories organized by category.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {albums.map((album) => (
                                    <div
                                        key={album.id}
                                        className="relative group cursor-pointer"
                                        onClick={() => onSelectAlbum(album)}
                                    >
                                        <div className="relative overflow-hidden rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
                                            <img
                                                src={album.cover_image}
                                                alt={album.title}
                                                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                                                <h3 className="text-white font-semibold text-lg">{album.title}</h3>
                                                <p className="text-gray-200 text-sm">
                                                    {album.photo_count}
                                                    {' '}
                                                    photos
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <Pagination
                                page={albumsPage}
                                totalPages={albumsTotalPages}
                                onPageChange={onAlbumsPageChange}
                            />
                        </>
                    ) : (
                        // Selected Album View
                        <>
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <button
                                        type="button"
                                        onClick={onBackToAlbums}
                                        className="text-primary hover:text-blue-700 font-medium mb-2"
                                    >
                                        ← Back to Albums
                                    </button>
                                    <h2 className="text-3xl font-bold text-foreground">{selectedAlbum.title}</h2>
                                </div>
                            </div>

                            {photosLoading ? (
                                <div className="flex items-center justify-center min-h-[300px]">
                                    <div className="text-center">
                                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mx-auto mb-4" />
                                        <p className="text-muted-foreground">Loading photos...</p>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                        {photos.map((image, index) => (
                                            <div
                                                key={image.id}
                                                className="relative group cursor-pointer"
                                                onClick={() => openImage(index)}
                                            >
                                                <div className="relative overflow-hidden rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
                                                    <img
                                                        src={image.image}
                                                        alt={image.caption}
                                                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <Pagination
                                        page={photosPage}
                                        totalPages={photosTotalPages}
                                        onPageChange={onPhotosPageChange}
                                    />
                                </>
                            )}
                        </>
                    )}
                </MaxWidthWrapper>
            </section>

            {/* Image Modal */}
            {selectedImage !== null && photos[selectedImage] && (
                <div
                    className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    onClick={closeImage}
                    onKeyDown={handleKeyDown}
                >
                    <div className="relative max-w-4xl max-h-full">
                        <button
                            type="button"
                            onClick={closeImage}
                            className="absolute top-4 right-4 text-white rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 p-2 transition-colors z-10"
                        >
                            <X size={24} />
                        </button>

                        <img
                            src={photos[selectedImage].image}
                            alt={photos[selectedImage].caption}
                            className="max-w-full max-h-full object-contain"
                            onClick={(e) => e.stopPropagation()}
                        />

                        {/* Navigation Buttons */}
                        {selectedImage > 0 && (
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    prevImage();
                                }}
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 p-2 transition-colors"
                            >
                                ←
                            </button>
                        )}

                        {selectedImage < photos.length - 1 && (
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    nextImage();
                                }}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 p-2 transition-colors"
                            >
                                →
                            </button>
                        )}

                        {/* Image Counter */}
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-white/10 backdrop-blur-sm px-3 py-1 rounded">
                            {selectedImage + 1}
                            {' '}
                            /
                            {photos.length}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default GallerySection;
