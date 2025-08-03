import {
    Book,
    Calendar,
    Contact,
    Users,
} from 'lucide-react';

import MaxWidthWrapper from '@/components/MaxWidthWrapper';

function OurValues() {
    const values = [
        {
            icon: <Users className="h-8 w-8" />,
            title: 'Love & Care',
            description: 'Every child deserves to feel loved, valued, and supported in their journey.',
        },
        {
            icon: <Book className="h-8 w-8" />,
            title: 'Education First',
            description: 'We believe education is the key to breaking the cycle of poverty and building bright futures.',
        },
        {
            icon: <Calendar className="h-8 w-8" />,
            title: 'Holistic Development',
            description: 'We focus on physical, emotional, intellectual, and spiritual growth of every child.',
        },
        {
            icon: <Contact className="h-8 w-8" />,
            title: 'Community Impact',
            description: 'Our work extends beyond our walls to strengthen the entire community.',
        },
    ];
    return (
        <section className="py-16 bg-gray-50">
            <MaxWidthWrapper>
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
                    <p className="text-lg text-gray-600">
                        These values guide everything we do and shape the environment
                        we create for our children.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {values.map((value) => (
                        <div key={value.title} className="bg-white p-6 rounded-lg shadow-md text-center">
                            <div className="text-blue-600 mb-4 flex justify-center">{value.icon}</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                            <p className="text-gray-600">{value.description}</p>
                        </div>
                    ))}
                </div>
            </MaxWidthWrapper>
        </section>
    );
}

export default OurValues;
