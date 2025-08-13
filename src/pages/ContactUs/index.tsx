import ContactSection from './ContactSection';
import MapSection from './MapSection';

import HeroSection from '@/components/HeroSection';

function Contact() {
    const title = 'Contact Us';
    const description = 'We&apos;d love to hear from you. Reach out to learn more about our work, volunteer opportunities, or how you can support our mission.';

    return (
        <>
            {/* Hero Section */}
            <HeroSection title={title} description={description} />

            {/* Contact Content */}
            <ContactSection />

            {/* Map Section (Placeholder) */}
            <MapSection />
        </>
    );
}

export default Contact;
