import {
    Heart,
    Home,
    Users,
} from 'lucide-react';

import HeroSection from '@/components/HeroSection';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';

function OurFamily() {
    return (
        <>
            <HeroSection
                title="Our Family"
                description="Not an institution. A family. Every child here has a Mummy and Daddy."
            />

            {/* Daddy Section */}
            <section className="py-24 md:py-32 bg-background">
                <MaxWidthWrapper>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <div className="portrait-card cursor-pointer">
                            {/* Decorative dots - top left */}
                            <div className="portrait-dots -top-6 -left-6 portrait-float" />
                            {/* Decorative corner accent - top left */}
                            <div className="portrait-corner -top-4 -left-4 rounded-tl-2xl border-b-0 border-r-0" />
                            <div className="relative overflow-hidden rounded-3xl">
                                <img
                                    src="/dad.jpg"
                                    alt="Ramesh Dev Sunar with children"
                                    className="portrait-img rounded-3xl w-full h-80 lg:h-[450px] object-cover"
                                />
                                <div className="portrait-overlay" />
                            </div>
                            {/* Decorative dots - bottom right */}
                            <div className="portrait-dots -bottom-6 -right-6 portrait-float" style={{ animationDelay: '1s' }} />
                            <div className="portrait-badge absolute -bottom-3 -right-3 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl font-semibold text-sm shadow-lg flex items-center gap-2">
                                <Heart className="h-3.5 w-3.5" />
                                Founder &amp; Chairman
                            </div>
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-accent uppercase tracking-[0.2em] mb-4">
                                &ldquo;Daddy&rdquo;
                            </p>
                            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 tracking-tight">
                                Ramesh Dev Sunar
                            </h2>
                            <div className="space-y-4 text-muted-foreground leading-relaxed">
                                <p>
                                    Ramesh lost both parents at age 7
                                    and spent years as a street child
                                    in Kathmandu. In 2002, he opened
                                    his home to the first
                                    orphan&mdash;a 7-year-old boy, the
                                    same age he was when he became an
                                    orphan.
                                </p>
                                <p>
                                    Today, every child calls him
                                    &ldquo;Daddy&rdquo; because
                                    that&apos;s exactly what he is to
                                    them. From a boy with nothing to a
                                    father of hundreds,
                                    Ramesh&apos;s story is one of
                                    extraordinary resilience and
                                    boundless love.
                                </p>
                                <blockquote
                                    className="border-l-4 border-accent pl-6 py-2 bg-accent/5 rounded-r-xl italic text-foreground/80"
                                >
                                    &ldquo;I know what it means to be
                                    hungry. I know what it means to
                                    have no one. That is why every
                                    child who comes to me... they
                                    become mine.&rdquo;
                                </blockquote>
                            </div>
                        </div>
                    </div>
                </MaxWidthWrapper>
            </section>

            {/* Mummy Section */}
            <section className="py-24 md:py-32 bg-muted">
                <MaxWidthWrapper>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <div className="order-2 lg:order-1">
                            <p className="text-xs font-semibold text-accent uppercase tracking-[0.2em] mb-4">
                                &ldquo;Mummy&rdquo;
                            </p>
                            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 tracking-tight">
                                Gita B.K.
                            </h2>
                            <div className="space-y-4 text-muted-foreground leading-relaxed">
                                <p>
                                    Gita has been by Ramesh&apos;s side
                                    since the beginning, managing
                                    daily operations and providing the
                                    maternal love every child needs.
                                    She oversees the household, ensures
                                    every child is fed, healthy,
                                    and cared for.
                                </p>
                                <p>
                                    To the children, she is simply &ldquo;Mummy.&rdquo; Her warmth,
                                    dedication, and tireless care have
                                    made OHCDS not just a shelter, but
                                    a true home where children feel
                                    safe and loved.
                                </p>
                            </div>
                        </div>
                        <div className="portrait-card cursor-pointer order-1 lg:order-2">
                            {/* Decorative dots - top right */}
                            <div className="portrait-dots -top-6 -right-6 portrait-float" />
                            {/* Decorative corner accent - top right */}
                            <div className="portrait-corner -top-4 -right-4 rounded-tr-2xl border-b-0 border-l-0" />
                            <div className="relative overflow-hidden rounded-3xl">
                                <img
                                    src="/mom.jpg"
                                    alt="Gita B.K. at OHCDS"
                                    className="portrait-img rounded-3xl w-full h-80 lg:h-[400px] object-cover"
                                />
                                <div className="portrait-overlay" />
                            </div>
                            {/* Decorative dots - bottom left */}
                            <div className="portrait-dots -bottom-6 -left-6 portrait-float" style={{ animationDelay: '1.5s' }} />
                            <div className="portrait-badge absolute -bottom-3 -left-3 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl font-semibold text-sm shadow-lg flex items-center gap-2">
                                <Heart className="h-3.5 w-3.5" />
                                Co-Founder
                            </div>
                        </div>
                    </div>
                </MaxWidthWrapper>
            </section>

            {/* Our Team Statement */}
            <section className="py-16 md:py-20 bg-background">
                <MaxWidthWrapper>
                    <div className="max-w-3xl mx-auto text-center">
                        <Users className="h-8 w-8 text-primary mx-auto mb-4" />
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Supported by a dedicated team of caregivers, teachers, and staff
                            who ensure our children&apos;s safety, education, and wellbeing.
                        </p>
                    </div>
                </MaxWidthWrapper>
            </section>

            {/* Philosophy of Care */}
            <section className="py-24 md:py-32 bg-primary text-white">
                <MaxWidthWrapper>
                    <div className="max-w-4xl mx-auto text-center">
                        <p className="text-xs font-semibold text-white/60 uppercase tracking-[0.2em] mb-4">
                            Philosophy of Care
                        </p>
                        <h2 className="text-3xl sm:text-4xl font-bold mb-8 tracking-tight">
                            Children Need a Family
                        </h2>
                        <p className="text-xl text-white/85 leading-relaxed mb-12">
                            At OHCDS, we believe children don&apos;t need an
                            institution&mdash;they need a family. That&apos;s why our 40 children
                            don&apos;t have &ldquo;caretakers.&rdquo; They have Mummy and Daddy.
                            They don&apos;t live in a &ldquo;facility.&rdquo; They live at home.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                            <div className="bg-white/8 backdrop-blur-sm rounded-3xl p-8">
                                <Home className="h-8 w-8 mx-auto mb-3 text-accent" />
                                <h3 className="font-bold mb-2">Family Environment</h3>
                                <p className="text-sm text-white/70">
                                    Every child is part of one loving family
                                </p>
                            </div>
                            <div className="bg-white/8 backdrop-blur-sm rounded-3xl p-8">
                                <Heart className="h-8 w-8 mx-auto mb-3 text-accent" />
                                <h3 className="font-bold mb-2">100% Graduation</h3>
                                <p className="text-sm text-white/70">
                                    Every child completes their education
                                </p>
                            </div>
                            <div className="bg-white/8 backdrop-blur-sm rounded-3xl p-8">
                                <Users className="h-8 w-8 mx-auto mb-3 text-accent" />
                                <h3 className="font-bold mb-2">Alumni Return</h3>
                                <p className="text-sm text-white/70">
                                    Graduates visit their parents and siblings
                                </p>
                            </div>
                        </div>
                    </div>
                </MaxWidthWrapper>
            </section>
        </>
    );
}

export default OurFamily;
