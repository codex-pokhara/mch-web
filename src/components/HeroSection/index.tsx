import MaxWidthWrapper from '@/components/MaxWidthWrapper';

function HeroSection(props: { title: string; description: string }) {
    const { title, description } = props;
    return (
        <section className="relative bg-linear-to-br from-primary via-primary to-primary/80 text-white py-28 md:py-36 overflow-hidden">
            <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5" />
            <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-accent/10" />
            <MaxWidthWrapper>
                <div className="relative max-w-3xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight">
                        {title}
                    </h1>
                    <p className="text-lg md:text-xl text-white/75 leading-relaxed max-w-2xl mx-auto">
                        {description}
                    </p>
                </div>
            </MaxWidthWrapper>
        </section>
    );
}

export default HeroSection;
