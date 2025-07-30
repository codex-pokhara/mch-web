import { useState } from 'react';

import GallerySection from './GallerySection';

import HeroSection from '@/components/HeroSection';

function Gallery() {
    const [selectedImage, setSelectedImage] = useState<number | null>(null);
    const [selectedAlbum, setSelectedAlbum] = useState<string | null>(null);
    const title = 'Our Gallery';
    const description = 'Explore the moments of joy, learning, and growth at Mountain Children Home through our photo gallery.';
    const albums = [
        {
            id: 'daily-life',
            name: 'Daily Life',
            cover: 'https://images.unsplash.com/photo-1517022812141-23620dba5c23?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
            images: [
                {
                    src: 'https://images.unsplash.com/photo-1517022812141-23620dba5c23?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    alt: 'Children playing together',
                },
                {
                    src: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    alt: 'Study time',
                },
                {
                    src: 'https://images.unsplash.com/photo-1439886183900-e79ec0057170?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    alt: 'Outdoor activities',
                },
                {
                    src: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    alt: 'Learning together',
                },
            ],
        },
        {
            id: 'education',
            name: 'Education & Learning',
            cover: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
            images: [
                {
                    src: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    alt: 'Classroom learning',
                },
                {
                    src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    alt: 'Computer learning',
                },
                {
                    src: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    alt: 'Reading time',
                },
            ],
        },
        {
            id: 'events',
            name: 'Special Events',
            cover: 'https://images.unsplash.com/photo-1527576539890-dfa815648363?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
            images: [
                {
                    src: 'https://images.unsplash.com/photo-1527576539890-dfa815648363?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    alt: 'Birthday celebration',
                },
                {
                    src: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    alt: 'Holiday gathering',
                },
                {
                    src: 'https://images.unsplash.com/photo-1517022812141-23620dba5c23?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    alt: 'Graduation ceremony',
                },
            ],
        },
        {
            id: 'facilities',
            name: 'Our Facilities',
            cover: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
            images: [
                {
                    src: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    alt: 'Main building',
                },
                {
                    src: 'https://images.unsplash.com/photo-1527576539890-dfa815648363?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    alt: 'Dormitory rooms',
                },
                {
                    src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    alt: 'Learning center',
                },
            ],
        },
    ];

    const currentAlbum = albums.find((album) => album.id === selectedAlbum);
    const currentImages = currentAlbum?.images || [];

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
