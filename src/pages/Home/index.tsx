import BlogPreview from './BlogPreview';
import ContributorsSection from './ContributorsSection';
import GalleryPreview from './GalleryPreview';
import HeroSection from './Hero';
import HowToHelpSection from './HowToHelpSection';
import WhatWeDoSection from './WhatWeDoSection';
import WhoWeAreSection from './WhoWeAreSection';

function Home() {
    return (
        <>
            <HeroSection />
            <WhoWeAreSection />
            <WhatWeDoSection />
            <HowToHelpSection />
            <GalleryPreview />
            <BlogPreview />
            <ContributorsSection />
        </>
    );
}

export default Home;
