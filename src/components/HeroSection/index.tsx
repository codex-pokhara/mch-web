import MaxWidthWrapper from '@/components/MaxWidthWrapper';

function HeroSection(props: { title: string; description: string }) {
    const { title, description } = props;
    return (
        <section className="bg-primary text-white py-20">
            <MaxWidthWrapper>
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">{title}</h1>
                <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto text-center">
                    {description}
                </p>
            </MaxWidthWrapper>
        </section>
    );
}

export default HeroSection;
