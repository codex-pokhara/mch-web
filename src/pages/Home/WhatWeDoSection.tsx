import {
    GraduationCap,
    Heart,
    Home,
} from 'lucide-react';

import MaxWidthWrapper from '@/components/MaxWidthWrapper';

function OurApproachSection() {
    const approaches = [
        {
            icon: <Home className="h-8 w-8" />,
            title: 'A Family, Not an Institution',
            description:
                'Our 40 children don\'t have "caretakers." They have Mummy and Daddy. They don\'t live in a "facility." They live at home. This family-centered approach has resulted in a 100% graduation rate.',
        },
        {
            icon: <GraduationCap className="h-8 w-8" />,
            title: 'Education That Transforms',
            description:
                'From school fees and tutoring to vocational training and digital literacy, we invest in every child\'s future. Our alumni include engineers, teachers, chefs, and government officers.',
        },
        {
            icon: <Heart className="h-8 w-8" />,
            title: 'Holistic Care',
            description:
                'Quality food, healthcare, mental wellbeing, recreation, and life skills. We provide everything a child needs to grow into a confident, capable adult.',
        },
    ];

    return (
        <section className="py-24 md:py-32 bg-muted">
            <MaxWidthWrapper>
                <div className="text-center mb-16">
                    <p className="text-xs font-semibold text-accent uppercase tracking-[0.2em] mb-4">
                        Our Approach
                    </p>
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 tracking-tight">
                        How We Care for Our Children
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        At OHCDS, we believe children don&apos;t need an
                        institution&mdash;they need a family.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {approaches.map((item) => (
                        <div
                            key={item.title}
                            className="bg-card p-8 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                        >
                            <div className="w-14 h-14 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-6">
                                {item.icon}
                            </div>
                            <h3 className="text-xl font-bold text-foreground mb-3">
                                {item.title}
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </MaxWidthWrapper>
        </section>
    );
}

export default OurApproachSection;
