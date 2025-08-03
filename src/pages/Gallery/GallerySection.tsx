/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { X } from 'lucide-react';

import MaxWidthWrapper from '@/components/MaxWidthWrapper';

// Define interfaces - make sure these match the parent component
interface Image {
  src: string;
  alt: string;
}

interface Album {
  id: string; // Changed from string | number to just string to match parent
  cover: string;
  name: string;
  images: Image[];
}

interface GalleryProps {
  selectedAlbum: string | null; // Changed from string | number | null to string | null
  setSelectedAlbum: (id: string | null) => void; // Changed from string | number | null
  albums: Album[];
  currentAlbum: Album | undefined;
  currentImages: Image[];
  selectedImage: number | null;
  openImage: (index: number) => void;
  closeImage: () => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLElement>) => void;
  prevImage: () => void;
  nextImage: () => void;
}

function GallerySection(props: GalleryProps) {
    const {
        selectedAlbum,
        setSelectedAlbum,
        albums,
        currentAlbum,
        currentImages,
        selectedImage,
        openImage,
        closeImage,
        handleKeyDown,
        prevImage,
        nextImage,
    } = props;

    return (
        <>
            <section className="py-16 bg-white">
                <MaxWidthWrapper>
                    {!selectedAlbum ? (
                        // Album Grid
                        <>
                            <div className="text-center mb-12">
                                <h2 className="text-3xl font-bold text-gray-900 mb-4">Photo Albums</h2>
                                <p className="text-lg text-gray-600">
                                    Browse through our collection of memories organized by category.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {albums.map((album) => (
                                    <div
                                        key={album.id}
                                        className="relative group cursor-pointer"
                                        onClick={() => setSelectedAlbum(album.id)}
                                    >
                                        <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow">
                                            <img
                                                src={album.cover}
                                                alt={album.name}
                                                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                                                <h3 className="text-white font-semibold text-lg">{album.name}</h3>
                                                <p className="text-gray-200 text-sm">
                                                    {album.images.length}
                                                    {' '}
                                                    photos
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        // Selected Album View
                        <>
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <button
                                        type="button"
                                        onClick={() => setSelectedAlbum(null)}
                                        className="text-primary hover:text-blue-700 font-medium mb-2"
                                    >
                                        ← Back to Albums
                                    </button>
                                    <h2 className="text-3xl font-bold text-gray-900">{currentAlbum?.name}</h2>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {currentImages.map((image, index) => (
                                    <div
                                        key={image.src}
                                        className="relative group cursor-pointer"
                                        onClick={() => openImage(index)}
                                    >
                                        <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow">
                                            <img
                                                src={image.src}
                                                alt={image.alt}
                                                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </MaxWidthWrapper>
            </section>

            {/* Image Modal */}
            {selectedImage !== null && currentImages[selectedImage] && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
                    onClick={closeImage}
                    onKeyDown={handleKeyDown}
                    // tabIndex={0} // Added for keyboard accessibility
                >
                    <div className="relative max-w-4xl max-h-full">
                        <button
                            type="button"
                            onClick={closeImage}
                            className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70 transition-colors z-10"
                        >
                            <X size={24} />
                        </button>

                        <img
                            src={currentImages[selectedImage].src}
                            alt={currentImages[selectedImage].alt}
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
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70 transition-colors"
                            >
                                ←
                            </button>
                        )}

                        {selectedImage < currentImages.length - 1 && (
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    nextImage();
                                }}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70 transition-colors"
                            >
                                →
                            </button>
                        )}

                        {/* Image Counter */}
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black bg-opacity-50 px-3 py-1 rounded">
                            {selectedImage + 1}
                            {' '}
                            /
                            {currentImages.length}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default GallerySection;
