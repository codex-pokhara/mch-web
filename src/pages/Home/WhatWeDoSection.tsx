import {
    Book,
    Calendar,
    Heart,
    Lightbulb,
    Shield,
    Users,
} from 'lucide-react';

import MaxWidthWrapper from '@/components/MaxWidthWrapper';

function WhatWeDoSection() {
    const services = [
        {
            icon: <Shield className="h-8 w-8" />,
            title: 'Safe Housing',
            description: 'Providing secure, earthquake-resistant shelter with separate living spaces for different age groups and genders.',
        },
        {
            icon: <Book className="h-8 w-8" />,
            title: 'Quality Education',
            description: 'School fees, tutoring, vocational training, and digital literacy through our e-library and computer room.',
        },
        {
            icon: <Heart className="h-8 w-8" />,
            title: 'Healthcare & Wellness',
            description: 'Medical check-ups, insurance, mental health support, and counseling services for emotional well-being.',
        },
        {
            icon: <Users className="h-8 w-8" />,
            title: 'Community Integration',
            description: 'Partnerships with schools and NGOs to ensure children are integrated into the broader community.',
        },
        {
            icon: <Lightbulb className="h-8 w-8" />,
            title: 'Life Skills Training',
            description: 'Critical thinking, problem-solving, financial literacy, and environmental management education.',
        },
        {
            icon: <Calendar className="h-8 w-8" />,
            title: 'Recreation & Sports',
            description: 'Yoga, football, music, festivals, and recreational activities to promote physical and mental health.',
        },
    ];

    const targetGroups = [
        {
            category: 'Orphaned/Abandoned',
            description: 'Children who lost parents due to disasters, poverty, or illness',
        },
        {
            category: 'Marginalized/Dalit',
            description: 'Children facing caste-based discrimination with limited access to education and healthcare',
        },
        {
            category: 'Domestic Violence Victims',
            description: 'Safe haven with zero tolerance for corporal punishment',
        },
        {
            category: 'At-Risk Children',
            description: 'Children endangered by poverty, trafficking, or displacement',
        },
        {
            category: 'Helpless/Poor',
            description: 'Children with no family support living in extreme poverty',
        },
    ];

    return (
        <section className="py-16 bg-gray-50">
            <MaxWidthWrapper>
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What We Do</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Our comprehensive approach addresses the urgent needs
                        of vulnerable children in Nepal,
                        providing sustainable solutions for their education,
                        healthcare, and future development.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {services.map((service) => (
                        <div key={service.title} className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                            <div className="text-blue-600 mb-4">{service.icon}</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                            <p className="text-gray-600">{service.description}</p>
                        </div>
                    ))}
                </div>

                <div className="bg-white rounded-lg shadow-md p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Children We Serve</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {targetGroups.map((group) => (
                            <div key={group.category} className="border-l-4 border-blue-500 pl-6">
                                <h4 className="font-semibold text-gray-900 mb-2">{group.category}</h4>
                                <p className="text-gray-600">{group.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </MaxWidthWrapper>
        </section>
    );
}

export default WhatWeDoSection;
