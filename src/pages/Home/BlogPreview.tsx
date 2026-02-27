import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Calendar } from 'lucide-react';

import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { Button } from '@/components/ui/button';
import { baseRequest } from '@/lib/base';

export interface Tag {
    id: number;
    name: string;
    slug: string;
}

export interface Blog {
    id: number;
    title: string;
    slug: string;
    cover_image: string;
    content: string;
    author_name: string;
    tags: Tag[];
    reading_time: number;
    published_at: string;
    status: string;
    created_at: string;
    updated_at: string;
}

const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
});

interface BlogAPIResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Blog[];
}

const blogService = {
    async getPosts(): Promise<BlogAPIResponse> {
        const response = await baseRequest({
            url: '/cms/blog-posts/',
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch blog posts: ${response.statusText}`);
        }

        return response.data;
    },
};

const createExcerpt = (content: string, maxLength: number = 150) => {
    if (!content) return '';
    const stripped = content.replace(/<[^>]*>/g, '');
    return stripped.length > maxLength ? `${stripped.slice(0, maxLength)}...` : stripped;
};

function BlogPreview() {
    const {
        data: blogResponse,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['blogs'],
        queryFn: blogService.getPosts,
    });

    const publishedBlogs = blogResponse?.results?.filter((blog) => blog.status === 'published') || [];

    const sectionHeader = (
        <div className="text-center mb-16">
            <p className="text-xs font-semibold text-accent uppercase tracking-[0.2em] mb-4">
                From Our Blog
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 tracking-tight">Latest News & Stories</h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                Stay updated with our latest news, success stories, and important updates
                from Mountain Children Home.
            </p>
        </div>
    );

    if (isLoading) {
        return (
            <section className="py-24 md:py-32 bg-background">
                <MaxWidthWrapper>
                    {sectionHeader}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-card rounded-2xl shadow-sm overflow-hidden">
                                <div className="w-full h-48 bg-border animate-pulse" />
                                <div className="p-6">
                                    <div className="h-4 bg-border animate-pulse rounded mb-3 w-24" />
                                    <div className="h-6 bg-border animate-pulse rounded mb-3" />
                                    <div className="h-4 bg-border animate-pulse rounded mb-2" />
                                    <div className="h-4 bg-border animate-pulse rounded mb-4 w-3/4" />
                                    <div className="h-4 bg-border animate-pulse rounded w-20" />
                                </div>
                            </div>
                        ))}
                    </div>
                </MaxWidthWrapper>
            </section>
        );
    }

    if (isError) {
        return (
            <section className="py-24 md:py-32 bg-background">
                <MaxWidthWrapper>
                    {sectionHeader}
                    <div className="text-center py-8">
                        <p className="text-destructive mb-4">
                            Unable to load blog posts. Please try again later.
                        </p>
                        <Button
                            onClick={() => window.location.reload()}
                        >
                            Retry
                        </Button>
                    </div>
                </MaxWidthWrapper>
            </section>
        );
    }

    if (publishedBlogs.length === 0) {
        return (
            <section className="py-24 md:py-32 bg-background">
                <MaxWidthWrapper>
                    {sectionHeader}
                    <div className="text-center py-8">
                        <p className="text-muted-foreground text-lg">
                            No blog posts available at the moment. Check back soon for updates!
                        </p>
                    </div>
                </MaxWidthWrapper>
            </section>
        );
    }

    const blogsToShow = publishedBlogs.slice(0, 3);

    return (
        <section className="py-24 md:py-32 bg-background">
            <MaxWidthWrapper>
                {sectionHeader}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                    {blogsToShow.map((blog) => (
                        <div key={blog.id} className="bg-card rounded-2xl shadow-sm overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                            <div className="overflow-hidden">
                                <img
                                    src={blog.cover_image || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'}
                                    alt={blog.title}
                                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                                    onError={(e) => {
                                        e.currentTarget.src = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80';
                                    }}
                                />
                            </div>
                            <div className="p-6">
                                <div className="flex items-center text-muted-foreground text-sm mb-3">
                                    <Calendar className="h-4 w-4 mr-2" />
                                    {formatDate(blog.published_at)}
                                </div>
                                <h3 className="text-xl font-semibold text-foreground mb-3 line-clamp-2">
                                    {blog.title}
                                </h3>
                                <p className="text-muted-foreground mb-4 line-clamp-3">
                                    {createExcerpt(blog.content)}
                                </p>
                                {blog.tags && blog.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {blog.tags.slice(0, 2).map((tag) => (
                                            <span
                                                key={tag.id}
                                                className="px-2.5 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium"
                                            >
                                                {tag.name}
                                            </span>
                                        ))}
                                        {blog.tags.length > 2 && (
                                            <span className="px-2.5 py-1 bg-muted text-muted-foreground text-xs rounded-full font-medium">
                                                +
                                                {blog.tags.length - 2}
                                                {' '}
                                                more
                                            </span>
                                        )}
                                    </div>
                                )}

                                {blog.reading_time && (
                                    <p className="text-muted-foreground text-sm mb-3">
                                        {blog.reading_time}
                                        {' '}
                                        min read
                                    </p>
                                )}

                                <Link
                                    to={`/blog/${blog.slug || blog.id}`}
                                    className="text-primary font-medium hover:underline"
                                >
                                    Read More &rarr;
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center">
                    <Link to="/blog">
                        <Button size="lg">
                            View All Stories
                            {publishedBlogs.length > 3 && (
                                <span className="ml-2">
                                    (
                                    {publishedBlogs.length - 3}
                                    {' '}
                                    more)
                                </span>
                            )}
                        </Button>
                    </Link>
                </div>
            </MaxWidthWrapper>
        </section>
    );
}

export default BlogPreview;
