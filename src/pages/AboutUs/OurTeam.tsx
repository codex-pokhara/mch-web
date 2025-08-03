import MaxWidthWrapper from '@/components/MaxWidthWrapper';

function OurTeam() {
    const staff = [
        {
            name: 'Sarah Johnson',
            role: 'Executive Director',
            image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
            description: 'Leading our mission with 15 years of experience in child welfare.',
        },
        {
            name: 'Michael Chen',
            role: 'Education Coordinator',
            image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
            description: 'Ensuring every child receives quality education and academic support.',
        },
        {
            name: 'Dr. Maria Rodriguez',
            role: 'Healthcare Director',
            image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
            description: 'Overseeing the health and wellness of all our children.',
        },
    ];

    return (
        <section className="py-16 bg-white">
            <MaxWidthWrapper>
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
                    <p className="text-lg text-gray-600">
                        Our dedicated team works tirelessly to ensure every child
                        receives the best possible care.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {staff.map((member) => (
                        <div key={member.name} className="bg-gray-50 rounded-lg p-6 text-center">
                            <img
                                src={member.image}
                                alt={member.name}
                                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                            />
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                            <p className="text-primary font-medium mb-3">{member.role}</p>
                            <p className="text-gray-600">{member.description}</p>
                        </div>
                    ))}
                </div>
            </MaxWidthWrapper>
        </section>
    );
}

export default OurTeam;
