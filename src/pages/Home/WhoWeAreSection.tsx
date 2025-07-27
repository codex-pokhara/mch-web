import MaxWidthWrapper from '@/components/MaxWidthWrapper';

function WhoWeAreSection() {
    return (
        <section className="py-12 sm:py-16 bg-white">
            <MaxWidthWrapper>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
                    <div className="order-2 lg:order-1">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">Who We Are</h2>
                        <p className="text-base sm:text-lg text-gray-700 mb-4 sm:mb-6">
                            The Orphan and Helpless Children Development Society (MCH)
                            has been a beacon of hope
                            since 2002, providing safe shelter, quality education, and loving care
                            to vulnerable
                            children in Nepal. After relocating in 2010 due to flooding
                            and pollution,we continue
                            our mission in Budhanilkantha, Dadagoun, Kathmandu.
                        </p>
                        <p className="text-base sm:text-lg text-gray-700 mb-6">
                            Led by Chairman Ramesh Dev Sunar, our dedicated
                            team works tirelessly to rescue,
                            shelter, and empower children through education,
                            healthcare, and vocational training.
                            We serve children affected by natural disasters,
                            poverty, and social marginalization.
                        </p>
                        <div className="grid grid-cols-2 gap-4 sm:gap-6">
                            <div className="text-center">
                                <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2">38</div>
                                <div className="text-sm sm:text-base text-gray-600">Children Served</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2">22+</div>
                                <div className="text-sm sm:text-base text-gray-600">Years of Service</div>
                            </div>
                        </div>
                    </div>
                    <div className="relative order-1 lg:order-2">
                        <img
                            src="https://images.unsplash.com/photo-1517022812141-23620dba5c23?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                            alt="Children at Mountain Children Home"
                            className="rounded-lg shadow-lg w-full h-64 sm:h-80 lg:h-96 object-cover"
                        />
                    </div>
                </div>
            </MaxWidthWrapper>
        </section>
    );
}

export default WhoWeAreSection;
