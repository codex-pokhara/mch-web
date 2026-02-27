import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '@radix-ui/react-label';
import { useMutation } from '@tanstack/react-query';
import {
    Eye,
    HandHeart,
    Heart,
    Mail,
    MapPin,
    Phone,
} from 'lucide-react';
import * as z from 'zod';

import HeroSection from '@/components/HeroSection';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { baseRequest } from '@/lib/base';

const postContact = async (body: ContactFormData) => {
    const response = await baseRequest({
        url: '/cms/contact-messages/',
        method: 'POST',
        body,
        contentType: 'application/json',
    });

    if (!response.ok) {
        throw new Error(response.data?.detail || `Error: ${response.status} - ${response.statusText}`);
    }

    return response;
};

const contactFormSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    email: z.string().email({ message: 'Invalid email address' }),
    phone: z.string().optional(),
    message: z.string().min(1, { message: 'Message is required' }),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

function GetInvolved() {
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
        },
    });

    const onSubmit = (data: ContactFormData) => {
        mutate(data);
    };

    const ways = [
        {
            icon: <Heart className="h-8 w-8" />,
            title: 'Donate',
            description: 'Every dollar goes directly to caring for our 40 children. $197 covers one child for a month.',
            color: 'bg-accent/10 text-accent',
        },
        {
            icon: <HandHeart className="h-8 w-8" />,
            title: 'Volunteer',
            description: 'Share your skills and time. We welcome teachers, mentors, healthcare professionals, and helping hands.',
            color: 'bg-primary/10 text-primary',
        },
        {
            icon: <Eye className="h-8 w-8" />,
            title: 'Visit',
            description: 'Come meet our family in Budhanilkantha, Dadagaun, Kathmandu. See the impact firsthand.',
            color: 'bg-chart-3/10 text-chart-3',
        },
    ];

    return (
        <>
            <HeroSection
                title="Get Involved"
                description="Join our family. Every act of kindness changes a child's life."
            />

            {/* Three Ways to Help */}
            <section className="py-24 md:py-32 bg-background">
                <MaxWidthWrapper>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        {ways.map((way) => (
                            <div
                                key={way.title}
                                className="text-center p-8 rounded-3xl bg-card shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                            >
                                <div className={`w-16 h-16 rounded-2xl ${way.color} flex items-center justify-center mx-auto mb-6`}>
                                    {way.icon}
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-3">
                                    {way.title}
                                </h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {way.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Key cost figure callout */}
                    <div className="relative bg-linear-to-br from-primary via-primary to-primary/80 text-white rounded-3xl p-12 text-center overflow-hidden shadow-xl">
                        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/5" />
                        <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-accent/10" />
                        <div className="relative">
                            <p className="text-lg mb-2 text-white/80">It costs just</p>
                            <p className="text-6xl font-extrabold mb-2">$197</p>
                            <p className="text-lg text-white/80">to care for one child for an entire month</p>
                        </div>
                    </div>
                </MaxWidthWrapper>
            </section>

            {/* Contact Form & Info */}
            <section className="py-24 md:py-32 bg-muted">
                <MaxWidthWrapper>
                    <div className="text-center mb-16">
                        <p className="text-xs font-semibold text-accent uppercase tracking-[0.2em] mb-4">
                            Contact Us
                        </p>
                        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 tracking-tight">
                            Reach Out to Us
                        </h2>
                        <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
                            Have questions? Want to donate, volunteer, or visit?
                            Send us a message and we&apos;ll get back to you.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-5xl mx-auto">
                        {/* Contact Form */}
                        <div className="lg:col-span-3">
                            {isSuccess && (
                                <div className="mb-6 p-4 bg-primary/10 border-2 border-primary/20 rounded-xl">
                                    <p className="text-primary font-medium">
                                        Thank you for your message! We&apos;ll get back to you soon.
                                    </p>
                                </div>
                            )}

                            {isError && (
                                <div className="mb-6 p-4 bg-destructive/10 border-2 border-destructive/20 rounded-xl">
                                    <p className="text-destructive font-medium">
                                        {error instanceof Error ? error.message : 'Failed to send message. Please try again.'}
                                    </p>
                                </div>
                            )}

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <Label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                                            Full Name *
                                        </Label>
                                        <input
                                            type="text"
                                            id="name"
                                            disabled={isPending}
                                            {...register('name')}
                                            className="w-full h-12 px-4 border-2 border-border rounded-xl bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                            placeholder="Your name"
                                        />
                                        {errors.name && (
                                            <p className="mt-1 text-sm text-destructive">{errors.name.message}</p>
                                        )}
                                    </div>
                                    <div>
                                        <Label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                                            Email *
                                        </Label>
                                        <input
                                            type="email"
                                            id="email"
                                            disabled={isPending}
                                            {...register('email')}
                                            className="w-full h-12 px-4 border-2 border-border rounded-xl bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                            placeholder="you@example.com"
                                        />
                                        {errors.email && (
                                            <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                                        Phone (optional)
                                    </Label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        disabled={isPending}
                                        {...register('phone')}
                                        className="w-full h-12 px-4 border-2 border-border rounded-xl bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                        placeholder="Your phone number"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                                        Message *
                                    </Label>
                                    <textarea
                                        id="message"
                                        rows={5}
                                        disabled={isPending}
                                        {...register('message')}
                                        className="w-full px-4 py-3 border-2 border-border rounded-xl bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                        placeholder="Tell us how you'd like to help..."
                                    />
                                    {errors.message && (
                                        <p className="mt-1 text-sm text-destructive">{errors.message.message}</p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={isPending}
                                    className="w-full bg-accent hover:bg-accent/85 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-full transition-all duration-200 shadow-sm hover:shadow-md"
                                >
                                    {isPending ? 'Sending...' : 'Send Message'}
                                </button>
                            </form>
                        </div>

                        {/* Contact Info */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-card p-6 rounded-2xl shadow-sm">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                        <MapPin className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-foreground mb-1">Address</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Budhanilkantha, Dadagaun
                                            <br />
                                            Kathmandu, Nepal
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-card p-6 rounded-2xl shadow-sm">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                        <Mail className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-foreground mb-1">Email</h3>
                                        <p className="text-sm text-muted-foreground">
                                            orphanhomedadagaun@gmail.com
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-card p-6 rounded-2xl shadow-sm">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                        <Phone className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-foreground mb-1">Phone</h3>
                                        <p className="text-sm text-muted-foreground">
                                            +977 986-0506473
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-accent/5 p-6 rounded-2xl border-2 border-accent/20">
                                <h3 className="font-semibold text-foreground mb-2">Visit Us</h3>
                                <p className="text-sm text-muted-foreground">
                                    We welcome visitors who want to see our home and meet
                                    the children. Please reach out to arrange a visit.
                                </p>
                            </div>
                        </div>
                    </div>
                </MaxWidthWrapper>
            </section>
        </>
    );
}

export default GetInvolved;
