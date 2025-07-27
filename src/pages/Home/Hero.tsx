import MaxWidthWrapper from '@/components/MaxWidthWrapper';

function HeroSection() {
    return (
        <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
            <div className="absolute inset-0 bg-black opacity-40" />
            <div
                className="relative min-h-[500px] sm:min-h-[600px] flex items-center bg-cover bg-center"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1517022812141-23620dba5c23?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')",
                }}
            >
                <div className="absolute inset-0 bg-blue-900 opacity-75" />
                <MaxWidthWrapper>
                    <div className="relative max-w-8xl mx-auto ">
                        <div className="max-w-3xl">
                            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
                                Mountain Children Home - Nature&apos;s Nest
                            </h1>
                            <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 text-blue-100 leading-relaxed">
                                Building a Sustainable Future for Vulnerable
                                and Helpless Children in Nepal.
                                Located in Budhanilkantha, Dadagoun, Kathmandu,
                                we provide hope and care to 38 orphaned and abandoned children.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button
                                    className="border-2 border-white text-white hover:bg-white hover:text-blue-800 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-lg transition-colors w-full sm:w-auto"
                                    type="button"
                                >
                                    Learn More
                                </button>
                            </div>
                        </div>
                    </div>
                </MaxWidthWrapper>

            </div>
        </section>
    );
}

export default HeroSection;
