import MaxWidthWrapper from '@/components/MaxWidthWrapper';

function HeroSection() {
    return (
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
            <MaxWidthWrapper>
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">Our Gallery</h1>
                <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto text-center">
                    Explore the moments of joy, learning, and growth at Mountain
                    Children Home through our photo gallery.
                </p>
            </MaxWidthWrapper>
        </section>
    );
}

export default HeroSection;
