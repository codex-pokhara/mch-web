import MaxWidthWrapper from '@/components/MaxWidthWrapper';

function HeroSection() {
    return (
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
            <MaxWidthWrapper>
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">About Mountain Children Home</h1>
                <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto text-center">
                    For over 15 years, we&apos;ve been a beacon of hope, providing love,
                    care, and opportunities to children who need it most.
                </p>
            </MaxWidthWrapper>
        </section>
    );
}

export default HeroSection;
