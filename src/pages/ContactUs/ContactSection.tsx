import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '@radix-ui/react-label';
import { useMutation } from '@tanstack/react-query';
import {
    Calendar,
    ContactIcon,
} from 'lucide-react';
import * as z from 'zod';

import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { baseRequest } from '@/lib/base';

// API function
const postContact = async (body: ContactFormData) => {
    const response = await baseRequest({
        url: '/cms/contact-messages/', // Updated to match your API endpoint
        method: 'POST',
        body,
        contentType: 'application/json',
    });

    if (!response.ok) {
        throw new Error(response.data?.detail || `Error: ${response.status} - ${response.statusText}`);
    }

    return response;
};

// Form validation schema
const contactFormSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    email: z.string().email({ message: 'Invalid email address' }),
    phone: z.string().optional(),
    message: z.string().min(1, { message: 'Message is required' }),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

function ContactSection() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactFormSchema),
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            message: '',
        },
    });

    const {
        mutate,
        isPending,
        isError,
        error,
        isSuccess,
    } = useMutation({
        mutationFn: (data: ContactFormData) => postContact(data),
        onSuccess: () => {
            reset();
            // Optional: Add toast notification here
        },
    });

    const onSubmit = (data: ContactFormData) => {
        mutate(data);
    };

    return (
        <section className="py-16 bg-white">
            <MaxWidthWrapper>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">Send us a Message</h2>

                        {/* Success Message */}
                        {isSuccess && (
                            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                                <p className="text-green-800">
                                    <strong>Success!</strong>
                                    {' '}
                                    Thank you for your message! We&apos;ll get back to you soon.
                                </p>
                            </div>
                        )}

                        {/* Error Message */}
                        {isError && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                                <p className="text-red-800">
                                    <strong>Error:</strong>
                                    {' '}
                                    {error instanceof Error ? error.message : 'Failed to send message. Please try again.'}
                                </p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <Label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                        Full Name *
                                    </Label>
                                    <input
                                        type="text"
                                        id="name"
                                        disabled={isPending}
                                        {...register('name')}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                                        placeholder="Your full name"
                                    />
                                    {errors.name && (
                                        <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                                    )}
                                </div>
                                <div>
                                    <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address *
                                    </Label>
                                    <input
                                        type="email"
                                        id="email"
                                        disabled={isPending}
                                        {...register('email')}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                                        placeholder="your.email@example.com"
                                    />
                                    {errors.email && (
                                        <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                                    )}
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
                                        disabled={isPending}
                                        {...register('phone')}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                                        placeholder="(555) 123-4567"
                                    />
                                    {errors.phone && (
                                        <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                    Message *
                                </Label>
                                <textarea
                                    id="message"
                                    rows={6}
                                    disabled={isPending}
                                    {...register('message')}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                                    placeholder="Please tell us more about your inquiry..."
                                />
                                {errors.message && (
                                    <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={isPending}
                                className="w-full bg-primary hover:brightness-90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-lg transition-colors"
                            >
                                {isPending ? 'Sending Message...' : 'Send Message'}
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
                                                Archalbot, Pokhara-2
                                                <br />
                                                Province 4, Nepal
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <ContactIcon className="h-5 w-5 text-primary mr-3 mt-1" />
                                        <div>
                                            <p className="font-medium text-gray-900">Phone</p>
                                            <p className="text-gray-600">986-0506473</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <ContactIcon className="h-5 w-5 text-primary mr-3 mt-1" />
                                        <div>
                                            <p className="font-medium text-gray-900">Email</p>
                                            <p className="text-gray-600">infodeegotrails@gmail.com</p>
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
                                <p className="text-red-600 font-semibold">986-0506473 ext. 911</p>
                            </div>
                        </div>
                    </div>
                </div>
            </MaxWidthWrapper>
        </section>
    );
}

export default ContactSection;
