import BlogPreview from './BlogPreview';
import TrustSignalsSection from './ContributorsSection';
import GalleryPreview from './GalleryPreview';
import HeroSection from './Hero';
import WhereMoneyGoesSection from './HowToHelpSection';
import OurApproachSection from './WhatWeDoSection';
import FounderStorySection from './WhoWeAreSection';

function Home() {
    return (
        <>
            <HeroSection />
            <FounderStorySection />
            <OurApproachSection />
            <WhereMoneyGoesSection />
            <GalleryPreview />
            <BlogPreview />
            <TrustSignalsSection />
        </>
    );
}

export default Home;
