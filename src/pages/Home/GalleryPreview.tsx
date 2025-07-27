import { Link } from 'react-router-dom';

function GalleryPreview() {
    const images = [
        {
            src: 'https://images.unsplash.com/photo-1517022812141-23620dba5c23?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
            alt: 'Children playing',
        },
        {
            src: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
            alt: 'Study time',
        },
        {
            src: 'https://images.unsplash.com/photo-1439886183900-e79ec0057170?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
            alt: 'Outdoor activities',
        },
        {
            src: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
            alt: 'Learning together',
        },
    ];

    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Gallery</h2>
                    <p className="text-lg text-gray-600">
                        Take a glimpse into the daily lives of our children and see the joy,
                        learning, and growth happening at Mountain Children Home.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {images.map((image) => (
                        <div key={image.alt} className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow">
                            <img
                                src={image.src}
                                alt={image.alt}
                                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300" />
                        </div>
                    ))}
                </div>

                <div className="text-center">
                    <Link
                        to="/gallery"
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                    >
                        View Full Gallery
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default GalleryPreview;
