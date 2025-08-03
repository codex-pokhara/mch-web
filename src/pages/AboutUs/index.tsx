import MissionAndVision from './MissionAndVision';
import OurStory from './OurStory';
import OurTeam from './OurTeam';
import OurValues from './OurValues';

import HeroSection from '@/components/HeroSection';

function About() {
    const title = 'About Mountain Children Home';
    const description = ' For over 15 years, we&apos;ve been a beacon of hope, providing love, care, and opportunities to children who need it most.';
    return (
        <>
            <HeroSection title={title} description={description} />
            <OurStory />
            <OurValues />
            <OurTeam />
            <MissionAndVision />
        </>

    );
}

export default About;
