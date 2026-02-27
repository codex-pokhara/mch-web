import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

import img1 from '@/assets/mountain.jpg';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';

function FounderStorySection() {
    return (
        <section className="py-24 md:py-32 bg-background">
            <MaxWidthWrapper>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    <div className="order-2 lg:order-1">
                        <p className="text-xs font-semibold text-accent uppercase tracking-[0.2em] mb-4">
                            Our Story
                        </p>
                        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 leading-tight tracking-tight">
                            From the Ashes of Loss, a Light for Hundreds
                        </h2>
                        <div className="space-y-4 text-muted-foreground leading-relaxed">
                            <p>
                                In 1983, seven-year-old Ramesh Dev Sunar
                                stood at the edge of his parents&apos;
                                graves in Surkhet, Nepal. Orphaned and
                                alone, he was sent to live with a relative
                                who put him to work instead of school.
                                At age 10, he was put on a bus to Kathmandu
                                with nothing but the clothes on his back.
                            </p>
                            <p>
                                The streets of Kathmandu became his home
                                and his teacher. He survived by working
                                in shops, butcheries&mdash;any job he
                                could find. Through sheer determination,
                                he not only survived but thrived.
                            </p>
                            <p>
                                In 2002, with almost no money but a
                                heart full of love, Ramesh rented
                                four small rooms. The first child he
                                welcomed was Prithivi, a seven-year-old
                                orphan&mdash;the same age Ramesh was
                                when he lost everything.
                            </p>
                            <p className="font-medium text-foreground">
                                Twenty-three years later, over 200
                                children have called OHCDS home.
                                Today, 40 children live here as one
                                family. They don&apos;t call Ramesh
                                &ldquo;sir.&rdquo; They call him &ldquo;Daddy.&rdquo;
                            </p>
                        </div>
                        <Link
                            to="/our-family"
                            className="group inline-flex items-center gap-2 mt-8 text-primary font-semibold hover:gap-3 transition-all"
                        >
                            Read the full story
                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                    <div className="relative order-1 lg:order-2">
                        <div className="relative">
                            <img
                                src={img1}
                                alt="Ramesh Dev Sunar with children at OHCDS"
                                className="rounded-3xl shadow-xl w-full h-72 sm:h-96 lg:h-[480px] object-cover"
                            />
                            <div className="absolute -bottom-4 -left-4 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-bold text-sm shadow-lg">
                                Est. 2002
                            </div>
                        </div>
                    </div>
                </div>
            </MaxWidthWrapper>
        </section>
    );
}

export default FounderStorySection;
