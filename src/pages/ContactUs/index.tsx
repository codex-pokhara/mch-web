import { useState } from 'react';

import ContactSection from './ContactSection';
import MapSection from './MapSection';

import HeroSection from '@/components/HeroSection';

function Contact() {
    const title = 'Contact Us';
    const description = 'We&apos;d love to hear from you. Reach out to learn more about our work, volunteer opportunities, or how you can support our mission.';

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        inquiryType: 'general',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement |
        HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission here
        console.log('Form submitted:', formData);
        alert('Thank you for your message! We will get back to you soon.');
        setFormData({
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: '',
            inquiryType: 'general',
        });
    };

    return (
        <>
            {/* Hero Section */}
            <HeroSection title={title} description={description} />

            {/* Contact Content */}
            <ContactSection
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
                formData={formData}
            />

            {/* Map Section (Placeholder) */}
            <MapSection />
        </>
    );
}

export default Contact;
