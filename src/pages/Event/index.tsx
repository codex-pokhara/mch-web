import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
    Calendar,
    MapPin,
} from 'lucide-react';

import HeroSection from '@/components/HeroSection';
import { Badge } from '@/components/ui/badge';
import {
    Card,
    CardContent,
} from '@/components/ui/card';
import { baseRequest } from '@/lib/base';

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

interface EventAPIResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Event[];
}

// Events service for API calls
const eventService = {
    async getEvents(): Promise<EventAPIResponse> {
        const response = await baseRequest({
            url: '/cms/events/',
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch events: ${response.statusText}`);
        }

        return response.data;
    },
};

function Events() {
    const title = 'Upcoming Events';
    const description = 'Join our community and make a difference with every event. Browse our upcoming activities and find your next opportunity to support Mountain Children Home.';

    const {
        data: eventResponse,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['events'],
        queryFn: eventService.getEvents,
    });

    const events = eventResponse?.results || [];

    const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
    // Loading state
    if (isLoading) {
        return (
            <>
                <HeroSection title={title} description={description} />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <Card className="overflow-hidden">
                            <div className="w-full h-48 bg-muted animate-pulse" />
                            <CardContent className="p-6">
                                <div className="h-6 bg-muted rounded animate-pulse mb-3" />
                                <div className="space-y-2 mb-4">
                                    <div className="h-4 bg-muted rounded animate-pulse" />
                                    <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
                                </div>
                                <div className="space-y-2 mb-4">
                                    <div className="h-4 bg-muted rounded animate-pulse w-1/2" />
                                    <div className="h-4 bg-muted rounded animate-pulse w-1/3" />
                                </div>
                                <div className="h-10 bg-muted rounded animate-pulse" />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </>
        );
    }

    // Error state
    if (isError) {
        return (
            <>
                <HeroSection title={title} description={description} />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="text-center">
                        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-destructive mb-2">
                                Failed to Load Events
                            </h3>
                            <p className="text-muted-foreground mb-4">
                                {error instanceof Error ? error.message : 'An unexpected error occurred'}
                            </p>
                            <button
                                type="button"
                                onClick={() => window.location.reload()}
                                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                            >
                                Try Again
                            </button>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    // Empty state
    if (events.length === 0) {
        return (
            <>
                <HeroSection title={title} description={description} />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="text-center">
                        <div className="bg-muted/50 rounded-lg p-12">
                            <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-foreground mb-2">
                                No Events Available
                            </h3>
                            <p className="text-muted-foreground">
                                There are currently no upcoming events. Check back soon for new
                                opportunities to get involved!
                            </p>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <HeroSection title={title} description={description} />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {events.map((event) => (
                        <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                            <div className="relative">
                                <img
                                    src={event.cover_image}
                                    alt={event.title}
                                    className="w-full h-48 object-cover"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.src = 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-4.0.3&w=800&h=600&fit=crop';
                                    }}
                                />
                                <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                                    {event.event_type}
                                </Badge>
                            </div>

                            <CardContent className="p-6">
                                <h3 className="text-xl font-semibold text-foreground mb-3">
                                    {event.title}
                                </h3>

                                <p className="text-muted-foreground mb-4 line-clamp-3">
                                    {event.description}
                                </p>

                                <div className="space-y-2 mb-4">
                                    <div className="flex items-center text-sm text-muted-foreground">
                                        <Calendar className="w-4 h-4 mr-2" />
                                        {formatDate(event.start_date)}
                                        {event.start_date !== event.end_date && (
                                            <span>
                                                {' '}
                                                -
                                                {formatDate(event.end_date)}
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex items-center text-sm text-muted-foreground">
                                        <MapPin className="w-4 h-4 mr-2" />
                                        {event.location}
                                    </div>
                                </div>

                                <Link
                                    to={`/event/${event.id}`}
                                    className="inline-flex items-center justify-center w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium"
                                >
                                    Learn More
                                </Link>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Pagination info if needed */}
                {eventResponse && eventResponse.count > events.length && (
                    <div className="text-center mt-8">
                        <p className="text-muted-foreground">
                            Showing
                            {' '}
                            {events.length}
                            {' '}
                            of
                            {' '}
                            {eventResponse.count}
                            {' '}
                            events
                        </p>
                    </div>
                )}
            </div>
        </>
    );
}

export default Events;
