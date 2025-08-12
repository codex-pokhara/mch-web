import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import image1 from '@/assets/1.jpg';

function OurStory() {
    return (
        <section className="py-16 bg-white">
            <MaxWidthWrapper>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
                        <p className="text-lg text-gray-700 mb-6">
                            Mountain Children Home was founded in 2009 by a group of
                            passionate individuals who saw the urgent need to provide
                            safe shelter and care for vulnerable children in our community.
                            What started as a small initiative has grown into a comprehensive
                            care facility that serves as a true home for children in need.
                        </p>
                        <p className="text-lg text-gray-700 mb-6">
                            Over the years, we&apos;ve welcomed over 150 children through our doors,
                            providing them with not just shelter, but love, education, healthcare,
                            and the support they need to build bright futures. Many of our former
                            residents have gone on to pursue higher education, start families, and
                            become contributing members of society.
                        </p>
                        <p className="text-lg text-gray-700">
                            Today, we continue to evolve and expand our services, always keeping
                            the best interests of the children at the heart of everything we do.
                        </p>
                    </div>
                    <div>
                        <img
                            src={image1}
                            alt="Mountain Children Home building"
                            className="rounded-lg shadow-lg w-full"
                        />
                    </div>
                </div>
            </MaxWidthWrapper>
        </section>
    );
}

export default OurStory;
