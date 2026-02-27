import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

import image1 from '@/assets/1.jpg';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';

function ImpactCounter() {
    const stats = [
        { value: '23', label: 'Years' },
        { value: '200+', label: 'Children Served' },
        { value: '40', label: 'Currently in Care' },
        { value: '100%', label: 'Graduation Rate' },
    ];

    return (
        <div className="bg-black/20 backdrop-blur-md">
            <MaxWidthWrapper>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8">
                    {stats.map((stat) => (
                        <div key={stat.label} className="text-center">
                            <div className="text-4xl md:text-5xl font-extrabold text-white mb-1">
                                {stat.value}
                            </div>
                            <div className="text-sm text-white/70 font-medium uppercase tracking-wide">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </MaxWidthWrapper>
        </div>
    );
}

function HeroSection() {
    return (
        <section className="relative">
            <div
                className="relative min-h-[85vh] flex flex-col"
                style={{
                    backgroundImage: `url(${image1})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="absolute inset-0 bg-linear-to-b from-black/60 via-primary/50 to-primary/80" />
                <div className="absolute inset-0 bg-linear-to-r from-black/30 via-transparent to-transparent" />

                <div className="relative flex-1 flex items-center">
                    <MaxWidthWrapper>
                        <div className="max-w-3xl py-16">
                            <p className="text-accent text-xs font-semibold uppercase tracking-[0.25em] mb-6">
                                OHCDS Mountain Children&apos;s Home
                            </p>
                            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white mb-8 leading-[1.05] tracking-tight">
                                Building Futures,
                                <br />
                                One Child at a Time
                            </h1>
                            <p className="text-lg sm:text-xl text-white/85 mb-4 leading-relaxed max-w-2xl
                                font-light italic"
                            >
                                &ldquo;I know what it means to be hungry.
                                I know what it means to have no one.
                                That is why every child who comes
                                to me... they become mine.&rdquo;
                            </p>
                            <p className="text-sm text-white/60 mb-10">
                                &mdash; Ramesh Dev Sunar, Founder
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    to="/our-family"
                                    className="border-2 border-white/50 text-white hover:bg-white hover:text-primary px-8 py-4 rounded-full font-semibold text-base transition-all duration-300 text-center"
                                >
                                    Meet Our Family
                                </Link>
                                <Link
                                    to="/get-involved"
                                    className="bg-accent text-white hover:bg-accent/85 px-8 py-4 rounded-full font-semibold text-base transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                                >
                                    <Heart className="h-4 w-4" />
                                    Donate Now
                                </Link>
                            </div>
                        </div>
                    </MaxWidthWrapper>
                </div>

                <ImpactCounter />
            </div>
        </section>
    );
}

export default HeroSection;
