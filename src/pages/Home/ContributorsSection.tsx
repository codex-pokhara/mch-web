import {
    Award,
    BookCheck,
    Clock,
    FileCheck,
    Shield,
} from 'lucide-react';

import MaxWidthWrapper from '@/components/MaxWidthWrapper';

function TrustSignalsSection() {
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
        <section className="py-16 md:py-20 bg-muted">
            <MaxWidthWrapper>
                <div className="text-center mb-10">
                    <h2 className="text-2xl font-bold text-foreground mb-2 tracking-tight">
                        Verified & Trusted
                    </h2>
                    <p className="text-muted-foreground">
                        Your trust matters. We operate with full accountability.
                    </p>
                </div>
                <div className="flex flex-wrap justify-center gap-4">
                    {signals.map((signal) => (
                        <div
                            key={signal.title}
                            className="flex items-center gap-3 bg-card px-6 py-4 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200"
                        >
                            <div className="text-primary">
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
    );
}

export default TrustSignalsSection;
