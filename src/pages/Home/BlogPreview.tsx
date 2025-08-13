import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Calendar } from 'lucide-react';

import MaxWidthWrapper from '@/components/MaxWidthWrapper';
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

// Helper function to format date
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

// Helper function to create excerpt from content
const createExcerpt = (content: string, maxLength: number = 150) => {
    if (!content) return '';
    const stripped = content.replace(/<[^>]*>/g, ''); // Remove HTML tags
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

    // Get published blogs only - with proper null checks
    const publishedBlogs = blogResponse?.results?.filter((blog) => blog.status === 'published') || [];

    // Loading state
    if (isLoading) {
        return (
            <section className="py-16 bg-white">
                <MaxWidthWrapper>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Latest News & Stories</h2>
                        <p className="text-lg text-gray-600">
                            Stay updated with our latest news, success stories,
                            and important update from Mountain Children Home.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
                                <div className="w-full h-48 bg-gray-300 animate-pulse" />
                                <div className="p-6">
                                    <div className="h-4 bg-gray-300 animate-pulse rounded mb-3 w-24" />
                                    <div className="h-6 bg-gray-300 animate-pulse rounded mb-3" />
                                    <div className="h-4 bg-gray-300 animate-pulse rounded mb-2" />
                                    <div className="h-4 bg-gray-300 animate-pulse rounded mb-4 w-3/4" />
                                    <div className="h-4 bg-gray-300 animate-pulse rounded w-20" />
                                </div>
                            </div>
                        ))}
                    </div>
                </MaxWidthWrapper>
            </section>
        );
    }

    // Error state
    if (isError) {
        return (
            <section className="py-16 bg-white">
                <MaxWidthWrapper>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Latest News & Stories</h2>
                        <p className="text-lg text-gray-600">
                            Stay updated with our latest news, success
                            stories, and important updates from Mountain Children Home.
                        </p>
                    </div>
                    <div className="text-center py-8">
                        <p className="text-red-600 mb-4">
                            Unable to load blog posts. Please try again later.
                        </p>
                        <button
                            type="button"
                            onClick={() => window.location.reload()}
                            className="bg-primary hover:brightness-90 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                        >
                            Retry
                        </button>
                    </div>
                </MaxWidthWrapper>
            </section>
        );
    }

    // Empty state
    if (publishedBlogs.length === 0) {
        return (
            <section className="py-16 bg-white">
                <MaxWidthWrapper>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Latest News & Stories</h2>
                        <p className="text-lg text-gray-600">
                            Stay updated with our latest news, success stories,
                            and important updates from Mountain Children Home.
                        </p>
                    </div>
                    <div className="text-center py-8">
                        <p className="text-gray-600 text-lg">
                            No blog posts available at the moment. Check back soon for updates!
                        </p>
                    </div>
                </MaxWidthWrapper>
            </section>
        );
    }

    // Show only the first 3 blogs for preview
    const blogsToShow = publishedBlogs.slice(0, 3);

    return (
        <section className="py-16 bg-white">
            <MaxWidthWrapper>
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Latest News & Stories</h2>
                    <p className="text-lg text-gray-600">
                        Stay updated with our latest news, success stories, and important updates
                        from Mountain Children Home.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {blogsToShow.map((blog) => (
                        <div key={blog.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                            <img
                                src={blog.cover_image || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'}
                                alt={blog.title}
                                className="w-full h-48 object-cover"
                                onError={(e) => {
                                    // Fallback image if cover_image fails to load
                                    e.currentTarget.src = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80';
                                }}
                            />
                            <div className="p-6">
                                <div className="flex items-center text-gray-500 text-sm mb-3">
                                    <Calendar className="h-4 w-4 mr-2" />
                                    {formatDate(blog.published_at)}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                                    {blog.title}
                                </h3>
                                <p className="text-gray-600 mb-4 line-clamp-3">
                                    {createExcerpt(blog.content)}
                                </p>
                                {/* Show tags if available */}
                                {blog.tags && blog.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {blog.tags.slice(0, 2).map((tag) => (
                                            <span
                                                key={tag.id}
                                                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
                                            >
                                                {tag.name}
                                            </span>
                                        ))}
                                        {blog.tags.length > 2 && (
                                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                                                +
                                                {blog.tags.length - 2}
                                                more
                                            </span>
                                        )}
                                    </div>
                                )}

                                {/* Show reading time if available */}
                                {blog.reading_time && (
                                    <p className="text-gray-500 text-sm mb-3">
                                        {blog.reading_time}
                                        min read
                                    </p>
                                )}

                                <Link
                                    to={`/blog/${blog.slug || blog.id}`}
                                    className="text-primary hover:brightness-90 font-medium"
                                >
                                    Read More →
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center">
                    <Link
                        to="/blog"
                        className="inline-block bg-primary hover:brightness-90 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                    >
                        View All Stories
                        {publishedBlogs.length > 3 && (
                            <span className="ml-2">
                                (
                                {publishedBlogs.length - 3}
                                more)
                            </span>
                        )}
                    </Link>
                </div>
            </MaxWidthWrapper>
        </section>
    );
}

export default BlogPreview;
