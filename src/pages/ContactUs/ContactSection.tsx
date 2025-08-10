import { Label } from '@radix-ui/react-label';
import {
    Calendar,
    ContactIcon,
} from 'lucide-react';

import MaxWidthWrapper from '@/components/MaxWidthWrapper';

interface FormData {
    name: string,
    email: string,
    phone: string,
    subject: string,
    message: string,
    inquiryType: string,
}

// Define the props interface
interface ContactSectionProps {
    formData: FormData;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement
        | HTMLSelectElement>) => void;
}

function ContactSection(props:ContactSectionProps) {
    const { formData, handleSubmit, handleInputChange } = props;
    return (
        <section className="py-16 bg-white">
            <MaxWidthWrapper>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">Send us a Message</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <Label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                        Full Name *
                                    </Label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Your full name"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address *
                                    </Label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="your.email@example.com"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <Label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                        Phone Number
                                    </Label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="(555) 123-4567"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="inquiryType" className="block text-sm font-medium text-gray-700 mb-2">
                                        Inquiry Type
                                    </Label>
                                    <select
                                        id="inquiryType"
                                        name="inquiryType"
                                        value={formData.inquiryType}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="general">General Inquiry</option>
                                        <option value="donation">Donation Information</option>
                                        <option value="volunteer">Volunteer Opportunities</option>
                                        <option value="partnership">Partnership</option>
                                        <option value="media">Media Inquiry</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                    Subject *
                                </Label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    required
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="What is this regarding?"
                                />
                            </div>

                            <div>
                                <Label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                    Message *
                                </Label>
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    rows={6}
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Please tell us more about your inquiry..."
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-primary hover:brightness-90 text-white font-semibold py-4 px-6 rounded-lg transition-colors"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>

                    {/* Contact Information */}
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">Get in Touch</h2>

                        <div className="space-y-8">
                            {/* Contact Details */}
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h3>
                                <div className="space-y-4">
                                    <div className="flex items-start">
                                        <ContactIcon className="h-5 w-5 text-primary mr-3 mt-1" />
                                        <div>
                                            <p className="font-medium text-gray-900">Address</p>
                                            <p className="text-gray-600">
                                                123 Mountain View Road
                                                <br />
                                                Hillside, State 12345
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <ContactIcon className="h-5 w-5 text-primary mr-3 mt-1" />
                                        <div>
                                            <p className="font-medium text-gray-900">Phone</p>
                                            <p className="text-gray-600">(555) 123-4567</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <ContactIcon className="h-5 w-5 text-primary mr-3 mt-1" />
                                        <div>
                                            <p className="font-medium text-gray-900">Email</p>
                                            <p className="text-gray-600">info@mountainchildrenhome.org</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Office Hours */}
                            <div className="bg-blue-50 p-6 rounded-lg">
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Office Hours</h3>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-gray-700">Monday - Friday</span>
                                        <span className="text-gray-900 font-medium">8:00 AM - 6:00 PM</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-700">Saturday</span>
                                        <span className="text-gray-900 font-medium">9:00 AM - 4:00 PM</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-700">Sunday</span>
                                        <span className="text-gray-900 font-medium">Closed</span>
                                    </div>
                                </div>
                            </div>

                            {/* Visit Us */}
                            <div className="bg-orange-50 p-6 rounded-lg">
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Visit Us</h3>
                                <p className="text-gray-700 mb-4">
                                    We welcome visitors who are interested in learning more
                                    about our work. Please call ahead to schedule a tour of
                                    our facilities.
                                </p>
                                <div className="flex items-center">
                                    <Calendar className="h-5 w-5 text-orange-600 mr-2" />
                                    <span className="text-gray-700">Tours available Monday - Saturday</span>
                                </div>
                            </div>

                            {/* Emergency Contact */}
                            <div className="bg-red-50 p-6 rounded-lg">
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Emergency Contact</h3>
                                <p className="text-gray-700 mb-2">
                                    For urgent matters outside office hours:
                                </p>
                                <p className="text-red-600 font-semibold">(555) 123-4567 ext. 911</p>
                            </div>
                        </div>
                    </div>
                </div>
            </MaxWidthWrapper>
        </section>
    );
}

export default ContactSection;
