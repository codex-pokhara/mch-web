import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';

function ContributorsSection() {
    const contributors = [
        {
            name: 'Global Care Foundation',
            type: 'Major Sponsor',
            logo: 'https://images.unsplash.com/photo-1527576539890-dfa815648363?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
            description: 'Supporting our educational programs for over 5 years',
        },
        {
            name: 'Local Community Church',
            type: 'Monthly Partner',
            logo: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
            description: 'Providing spiritual guidance and community support',
        },
        {
            name: 'Mountain View School District',
            type: 'Education Partner',
            logo: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
            description: 'Ensuring quality education for all our children',
        },
        {
            name: 'Healthcare Heroes Clinic',
            type: 'Medical Partner',
            logo: 'https://images.unsplash.com/photo-1527576539890-dfa815648363?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
            description: 'Providing free medical care and health checkups',
        },
        {
            name: 'City Food Bank',
            type: 'Food Partner',
            logo: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
            description: 'Ensuring nutritious meals for all our children',
        },
        {
            name: 'Tech4Good Initiative',
            type: 'Technology Partner',
            logo: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
            description: 'Providing computers and digital learning resources',
        },
    ];

    return (
        <section className="py-16 bg-blue-50">
            <MaxWidthWrapper>
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Friends & Contributors</h2>
                    <p className="text-lg text-gray-600">
                        We&apos;re grateful for the amazing organizations and individuals
                        who make our work possible.
                        Together, we&apos;re building a better future for children in need.
                    </p>
                </div>

                <div className="relative">
                    <Carousel
                        opts={{
                            align: 'start',
                            loop: true,
                        }}
                        className="w-full"
                    >
                        <CarouselContent className="-ml-2 md:-ml-4">
                            {contributors.map((contributor) => (
                                <CarouselItem key={contributor.name} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                                    <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow h-full">
                                        <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200">
                                            <img
                                                src={contributor.logo}
                                                alt={contributor.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{contributor.name}</h3>
                                        <p className="text-blue-600 font-medium text-sm mb-3">{contributor.type}</p>
                                        <p className="text-gray-600 text-sm">{contributor.description}</p>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="left-0" />
                        <CarouselNext className="right-0" />
                    </Carousel>
                </div>
            </MaxWidthWrapper>
        </section>
    );
}

export default ContributorsSection;
