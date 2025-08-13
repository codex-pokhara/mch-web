import {
    Link,
    useParams,
} from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
    ArrowLeft,
    Calendar,
    Clock,
    MapPin,
    Users,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { baseRequest } from '@/lib/base'; // Adjust import path as needed

interface Event {
  id: number;
  title: string;
  slug: string;
  cover_image: string;
  description: string;
  start_date: string;
  end_date: string;
  location: string;
  event_type: string;
  created_at: string;
  updated_at: string;
}

// Event service for API calls
const eventService = {
    async getEvent(id: string): Promise<Event> {
        const response = await baseRequest({
            url: `/cms/events/${id}/`,
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch event: ${response.statusText}`);
        }

        return response.data;
    },
};

function EventDetail() {
    const { id } = useParams<{ id: string }>();

    const {
        data: event,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['event', id],
        queryFn: () => eventService.getEvent(id!),
        enabled: !!id,
    });

    const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const getErrorMessage = () => {
        if (isError) {
            return error instanceof Error ? error.message : 'Failed to load event details';
        }
        return 'The event you\'re looking for doesn\'t exist.';
    };

    // Loading state
    if (isLoading) {
        return (
            <div className="min-h-screen bg-background">
                {/* Hero Section Skeleton */}
                <div className="relative h-96 bg-muted animate-pulse">
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                        <div className="max-w-7xl mx-auto">
                            <div className="h-4 bg-muted-foreground/20 rounded w-32 mb-4" />
                            <div className="flex flex-col md:flex-row md:items-end md:justify-between">
                                <div>
                                    <div className="h-12 bg-muted-foreground/20 rounded w-96 mb-4" />
                                    <div className="h-6 bg-muted-foreground/20 rounded w-full max-w-2xl" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Section Skeleton */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-2">
                            <div className="h-6 bg-muted rounded w-24 mb-4" />
                            <div className="h-8 bg-muted rounded w-64 mb-6" />
                            <div className="space-y-3">
                                <div className="h-4 bg-muted rounded w-full" />
                                <div className="h-4 bg-muted rounded w-5/6" />
                                <div className="h-4 bg-muted rounded w-4/5" />
                            </div>
                        </div>
                        <div className="lg:col-span-1">
                            <Card>
                                <CardHeader>
                                    <div className="h-6 bg-muted rounded w-32" />
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="h-12 bg-muted rounded" />
                                    <div className="h-12 bg-muted rounded" />
                                    <div className="h-12 bg-muted rounded" />
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Error state
    if (isError || !event) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-foreground mb-4">
                        {isError ? 'Error Loading Event' : 'Event Not Found'}
                    </h1>
                    <p className="text-muted-foreground mb-6">
                        {getErrorMessage()}
                    </p>
                    <Link to="/event">
                        <Button>
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Events
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <div className="relative h-96 bg-gradient-to-r from-primary/20 to-secondary/20">
                <img
                    src={event.cover_image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-4.0.3&w=800&h=600&fit=crop';
                    }}
                />
                <div className="absolute inset-0 bg-black/40" />

                <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="max-w-7xl mx-auto">
                        <Link to="/event" className="inline-flex items-center text-white mb-4 hover:text-white/80 transition-colors">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Events
                        </Link>

                        <div className="flex flex-col md:flex-row md:items-end md:justify-between">
                            <div>
                                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                                    {event.title}
                                </h1>
                            </div>

                            <div className="mt-6 md:mt-0 flex flex-col sm:flex-row gap-4">
                                <div className="flex items-center text-white">
                                    <Users className="w-5 h-5 mr-2" />
                                    <span>Join our community</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <div className="mb-8">
                            <Badge className="bg-primary text-primary-foreground mb-4">
                                {event.event_type}
                            </Badge>
                            <h2 className="text-2xl font-bold text-foreground mb-6">About This Event</h2>
                            <div
                                className="prose prose-lg max-w-none text-muted-foreground"
                                // eslint-disable-next-line react/no-danger
                                dangerouslySetInnerHTML={{ __html: event.description }}
                            />
                        </div>
                    </div>

                    {/* Event Details Sidebar */}
                    <div className="lg:col-span-1">
                        <Card className="sticky top-8">
                            <CardHeader>
                                <CardTitle>Event Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <Calendar className="w-5 h-5 text-primary mt-0.5" />
                                    <div>
                                        <p className="font-medium text-foreground">Start Date</p>
                                        <p className="text-sm text-muted-foreground">{formatDate(event.start_date)}</p>
                                    </div>
                                </div>

                                {event.start_date !== event.end_date && (
                                    <div className="flex items-start space-x-3">
                                        <Clock className="w-5 h-5 text-primary mt-0.5" />
                                        <div>
                                            <p className="font-medium text-foreground">End Date</p>
                                            <p className="text-sm text-muted-foreground">{formatDate(event.end_date)}</p>
                                        </div>
                                    </div>
                                )}

                                <div className="flex items-start space-x-3">
                                    <MapPin className="w-5 h-5 text-primary mt-0.5" />
                                    <div>
                                        <p className="font-medium text-foreground">Location</p>
                                        <p className="text-sm text-muted-foreground">{event.location}</p>
                                    </div>
                                </div>

                                <div className="pt-4 border-t">
                                    <h4 className="font-medium text-foreground mb-2">Organizer</h4>
                                    <p className="text-sm text-muted-foreground">Mountain Children Home</p>
                                    <p className="text-sm text-muted-foreground">orphanhomedadagoun@gmail.com</p>
                                </div>

                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EventDetail;
