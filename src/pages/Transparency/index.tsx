import { Link } from 'react-router-dom';
import {
    Award,
    BookCheck,
    Clock,
    FileCheck,
    Shield,
    Sun,
} from 'lucide-react';

import HeroSection from '@/components/HeroSection';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { Button } from '@/components/ui/button';

function Transparency() {
    const budgetItems = [
        { label: 'Food & Nutrition', percentage: 40, color: 'bg-accent' },
        { label: 'Education', percentage: 15, color: 'bg-primary' },
        { label: 'Clothing & Daily Needs', percentage: 15, color: 'bg-chart-3' },
        { label: 'Facilities & Utilities', percentage: 12, color: 'bg-chart-5' },
        { label: 'Healthcare', percentage: 10, color: 'bg-chart-4' },
        { label: 'Staff & Operations', percentage: 8, color: 'bg-muted-foreground/50' },
    ];

    const signals = [
        {
            icon: <Shield className="h-6 w-6" />,
            title: 'Government Registered',
            subtitle: 'Social Welfare Council (SWC)',
        },
        {
            icon: <BookCheck className="h-6 w-6" />,
            title: 'Child Rights Approved',
            subtitle: 'National Child Rights Council (NCRC)',
        },
        {
            icon: <Award className="h-6 w-6" />,
            title: 'UNICEF Compliant',
            subtitle: 'International child protection standards',
        },
        {
            icon: <FileCheck className="h-6 w-6" />,
            title: 'Annually Audited',
            subtitle: 'Independent third-party verification',
        },
        {
            icon: <Clock className="h-6 w-6" />,
            title: '23 Years of Operation',
            subtitle: 'Established 2002',
        },
    ];

    return (
        <>
            <HeroSection
                title="Transparency"
                description="Full accountability. Every rupee accounted for. Your trust is our foundation."
            />

            {/* Budget Allocation */}
            <section className="py-24 md:py-32 bg-background">
                <MaxWidthWrapper>
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 tracking-tight">
                                How We Allocate Our Budget
                            </h2>
                            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                                A transparent breakdown of how our resources
                                are distributed to care for our children.
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

                        <div className="bg-muted rounded-2xl p-6 text-center max-w-xs mx-auto">
                            <div className="text-3xl font-bold text-primary mb-1">$197</div>
                            <div className="text-sm text-muted-foreground">Cost per child / month</div>
                        </div>
                    </div>
                </MaxWidthWrapper>
            </section>

            {/* Trust Signals */}
            <section className="py-24 md:py-32 bg-muted">
                <MaxWidthWrapper>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-foreground mb-4 tracking-tight">
                            Verification & Registration
                        </h2>
                        <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
                            OHCDS operates with full legal compliance
                            and is verified by multiple government
                            and international bodies.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        {signals.map((signal) => (
                            <div
                                key={signal.title}
                                className="flex items-center gap-4 bg-card p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200"
                            >
                                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                    {signal.icon}
                                </div>
                                <div>
                                    <div className="text-sm font-semibold text-foreground">{signal.title}</div>
                                    <div className="text-xs text-muted-foreground">{signal.subtitle}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </MaxWidthWrapper>
            </section>

            {/* Current Priority Project */}
            <section className="py-24 md:py-32 bg-background">
                <MaxWidthWrapper>
                    <div className="max-w-3xl mx-auto">
                        <div className="text-center mb-10">
                            <p className="text-xs font-semibold text-accent uppercase tracking-[0.2em] mb-4">
                                Current Focus
                            </p>
                            <h2 className="text-3xl font-bold text-foreground mb-4 tracking-tight">
                                Green Energy: Solar Installation
                            </h2>
                        </div>

                        <div className="bg-card rounded-3xl p-10 shadow-md">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-14 h-14 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
                                    <Sun className="h-7 w-7" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-foreground">
                                        Solar Panel Installation
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        Reduce electricity costs by 60%
                                    </p>
                                </div>
                            </div>
                            <p className="text-muted-foreground mb-6 leading-relaxed">
                                We&apos;re raising funds to install
                                solar panels at the children&apos;s
                                home. This will reduce our electricity costs by 60% and provide
                                reliable power for the children&apos;s studies and computer room.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-muted rounded-2xl">
                                <div>
                                    <div className="text-2xl font-bold text-primary">$10,385</div>
                                    <div className="text-xs text-muted-foreground">NPR 1,350,000</div>
                                </div>
                                <Link to="/get-involved">
                                    <Button variant="accent">
                                        Support This Project
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </MaxWidthWrapper>
            </section>
        </>
    );
}

export default Transparency;
