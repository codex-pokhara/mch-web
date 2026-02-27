import {
    Award,
    GraduationCap,
    Heart,
    Quote,
    TrendingUp,
} from 'lucide-react';

import HeroSection from '@/components/HeroSection';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';

function Impact() {
    const stats = [
        {
            icon: <TrendingUp className="h-8 w-8" />,
            value: '23',
            label: 'Years of Operation',
            sublabel: 'Established 2002',
        },
        {
            icon: <Heart className="h-8 w-8" />,
            value: '200+',
            label: 'Children Served',
            sublabel: 'Total since founding',
        },
        {
            icon: <Award className="h-8 w-8" />,
            value: '40',
            label: 'Currently in Care',
            sublabel: '23 boys, 17 girls',
        },
        {
            icon: <GraduationCap className="h-8 w-8" />,
            value: '100%',
            label: 'Graduation Rate',
            sublabel: 'Every child graduates',
        },
    ];

    const alumni = [
        {
            name: 'Jeevan Tamang',
            role: 'Agriculture Officer',
            location: 'Khaniyabas Rural Municipality, Dhading',
            quote: 'OHCDS gave me not just food and shelter, but a family that believed in me.',
        },
        {
            name: 'Shova Sunar',
            role: 'Restaurant Manager',
            location: 'KFC, Kathmandu',
            quote: "Mummy and Daddy taught me that my background doesn't define my future.",
        },
        {
            name: 'Yubraj Malla',
            role: 'Professional Chef',
            location: 'Cyprus (International)',
            quote: 'I learned to cook at OHCDS. Now I cook for people around the world, but my heart is always in Dadagaun.',
        },
    ];

    return (
        <>
            <HeroSection
                title="Our Impact"
                description="Real stories, real numbers. See the difference your support makes."
            />

            {/* Impact Numbers */}
            <section className="py-24 md:py-32 bg-background">
                <MaxWidthWrapper>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {stats.map((stat) => (
                            <div
                                key={stat.label}
                                className="text-center p-6 rounded-3xl bg-card shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                            >
                                <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                                    {stat.icon}
                                </div>
                                <div className="text-4xl font-extrabold text-primary mb-1">
                                    {stat.value}
                                </div>
                                <div className="text-sm font-semibold text-foreground mb-1">
                                    {stat.label}
                                </div>
                                <div className="text-xs text-muted-foreground/70">
                                    {stat.sublabel}
                                </div>
                            </div>
                        ))}
                    </div>
                </MaxWidthWrapper>
            </section>

            {/* Alumni Success Stories */}
            <section className="py-24 md:py-32 bg-muted">
                <MaxWidthWrapper>
                    <div className="text-center mb-16">
                        <p className="text-xs font-semibold text-accent uppercase tracking-[0.2em] mb-4">
                            Success Stories
                        </p>
                        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 tracking-tight">
                            Our Alumni
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                            These stories show the real impact of your support. Each person below
                            grew up at OHCDS and is now a successful, independent adult.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {alumni.map((person) => (
                            <div
                                key={person.name}
                                className="bg-card rounded-3xl p-8 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col"
                            >
                                <Quote className="h-10 w-10 text-accent/30 mb-4" />
                                <p className="text-lg text-muted-foreground italic leading-relaxed flex-1 mb-6">
                                    &ldquo;
                                    {person.quote}
                                    &rdquo;
                                </p>
                                <div className="border-t border-border pt-4">
                                    <h3 className="font-bold text-foreground">
                                        {person.name}
                                    </h3>
                                    <p className="text-sm text-primary font-medium">
                                        {person.role}
                                    </p>
                                    <p className="text-xs text-muted-foreground/70 mt-1">
                                        {person.location}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-14 text-center">
                        <div className="bg-primary text-white rounded-3xl p-10 max-w-2xl mx-auto shadow-xl">
                            <p className="text-3xl font-extrabold mb-2">
                                200+ children have passed through OHCDS in 23 years.
                            </p>
                            <p className="text-white/80">
                                Our alumni include engineers, teachers, healthcare workers, and
                                professionals across Nepal and around the world.
                            </p>
                        </div>
                    </div>
                </MaxWidthWrapper>
            </section>
        </>
    );
}

export default Impact;
