import {
    Building,
    Heart,
    Lightbulb,
} from 'lucide-react';

function HowToHelpSection() {
    const urgentNeeds = [
        {
            icon: <Building className="h-12 w-12" />,
            title: 'Land Purchase',
            description: 'Secure permanent location (11,000 sq. ft.) to avoid eviction from disputed government land',
            priority: 'Critical',
        },
        {
            icon: <Building className="h-12 w-12" />,
            title: 'Infrastructure Upgrades',
            description: 'Earthquake-resistant buildings, solar energy, waste management systems',
            priority: 'High',
        },
        {
            icon: <Heart className="h-12 w-12" />,
            title: 'Healthcare Support',
            description: 'Vaccinations, insurance, doctor visits, and mental health services',
            priority: 'High',
        },
        {
            icon: <Lightbulb className="h-12 w-12" />,
            title: 'Educational Resources',
            description: 'School fees, stationery, e-library, and digital learning tools',
            priority: 'Ongoing',
        },
    ];

    const sponsorBenefits = [
        'Regular updates with photos and progress reports',
        'Personal letters from children',
        'Recognition in our materials and events',
        'Opportunity to visit facilities and meet children',
        'Tax deductions (eligible in some countries)',
    ];

    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How Can You Help?</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        With an annual budget of NPR 20,118,580 (~USD 155,450),
                        we rely entirely on donations
                        to provide care for 38 vulnerable children.
                        Your support can make a lasting difference.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    {urgentNeeds.map((need) => (
                        <div key={need.title} className="bg-blue-50 p-8 rounded-lg hover:bg-blue-100 transition-colors">
                            <div className="flex items-center mb-4">
                                <div className="text-blue-600 mr-4">{need.icon}</div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900">{need.title}</h3>
                                    <span className={`text-sm px-2 py-1 rounded ${need.priority === 'Critical' && 'bg-red-100 text-red-800'}
                                    ${need.priority !== 'Critical' && need.priority === 'High' && 'bg-orange-100 text-orange-800'}
                                    ${need.priority !== 'Critical' && need.priority !== 'High' && 'bg-blue-100 text-blue-800'}
                                    `}
                                    >
                                        {need.priority}
                                    </span>
                                </div>
                            </div>
                            <p className="text-gray-600">{need.description}</p>
                        </div>
                    ))}
                </div>

                <div className="bg-gray-50 rounded-lg p-8 mb-12">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Sponsor Benefits</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {sponsorBenefits.map((benefit) => (
                            <div key={benefit} className="flex items-start">
                                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0" />
                                <p className="text-gray-700">{benefit}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-8 text-white text-center">
                    <h3 className="text-2xl font-bold mb-4">Join Our Mission</h3>
                    <p className="text-lg mb-6">
                        Help us build a sustainable,
                        compliant orphanage and create a replicable model
                        for climate-resilient childcare in Nepal.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors"
                            type="button"
                        >
                            Support Our Mission
                        </button>
                        <button
                            className="border-2 border-white text-white hover:bg-white hover:text-orange-600 px-8 py-3 rounded-lg font-semibold transition-colors"
                            type="button"
                        >
                            View Detailed Budget
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HowToHelpSection;
