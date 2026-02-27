import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

import MaxWidthWrapper from '@/components/MaxWidthWrapper';

function WhereMoneyGoesSection() {
    const budgetItems = [
        { label: 'Food & Nutrition', percentage: 40, color: 'bg-accent' },
        { label: 'Education', percentage: 15, color: 'bg-primary' },
        { label: 'Clothing & Daily Needs', percentage: 15, color: 'bg-chart-3' },
        { label: 'Facilities & Utilities', percentage: 12, color: 'bg-chart-5' },
        { label: 'Healthcare', percentage: 10, color: 'bg-chart-4' },
        { label: 'Staff & Operations', percentage: 8, color: 'bg-muted-foreground/50' },
    ];

    return (
        <section className="py-24 md:py-32 bg-background">
            <MaxWidthWrapper>
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <p className="text-xs font-semibold text-accent uppercase tracking-[0.2em] mb-4">
                            Full Transparency
                        </p>
                        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 tracking-tight">
                            Where Your Money Goes
                        </h2>
                        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                            Every dollar is accounted for. Here&apos;s exactly
                            how we spend your donations.
                        </p>
                    </div>

                    <div className="space-y-5 mb-12">
                        {budgetItems.map((item) => (
                            <div key={item.label}>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-medium text-foreground/80">{item.label}</span>
                                    <span className="text-sm font-bold text-foreground">
                                        {item.percentage}
                                        %
                                    </span>
                                </div>
                                <div className="w-full bg-muted rounded-full h-3">
                                    <div
                                        className={`${item.color} h-3 rounded-full animate-grow-width`}
                                        style={{ width: `${item.percentage}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
                        <div className="bg-muted rounded-2xl p-6 text-center hover:shadow-sm transition-shadow">
                            <div className="text-3xl font-bold text-primary mb-1">$197</div>
                            <div className="text-sm text-muted-foreground">Cost per child / month</div>
                        </div>
                        <div className="bg-muted rounded-2xl p-6 text-center hover:shadow-sm transition-shadow">
                            <div className="text-3xl font-bold text-primary mb-1">$65K</div>
                            <div className="text-sm text-muted-foreground">Annual operating budget</div>
                        </div>
                        <div className="bg-muted rounded-2xl p-6 text-center hover:shadow-sm transition-shadow">
                            <div className="text-3xl font-bold text-primary mb-1">40</div>
                            <div className="text-sm text-muted-foreground">Children supported</div>
                        </div>
                    </div>

                    <div className="text-center">
                        <Link
                            to="/get-involved"
                            className="inline-flex items-center gap-2 bg-accent text-white hover:bg-accent/85 px-8 py-4 rounded-full font-semibold text-base transition-all duration-200 shadow-sm hover:shadow-md"
                        >
                            <Heart className="h-4 w-4" />
                            Donate Now
                        </Link>
                        <div className="mt-4">
                            <Link
                                to="/transparency"
                                className="text-sm text-primary hover:underline font-medium"
                            >
                                View detailed budget breakdown
                            </Link>
                        </div>
                    </div>
                </div>
            </MaxWidthWrapper>
        </section>
    );
}

export default WhereMoneyGoesSection;
