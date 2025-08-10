/* eslint-disable react/no-danger */
import {
    Link,
    useParams,
} from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
    Book,
    Calendar,
    Users,
} from 'lucide-react';

import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { baseRequest } from '@/lib/base';

// Types
export interface Tag {
    id: number;
    name: string;
    slug: string;
}

export interface BlogPost {
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

export interface BlogAPIResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: BlogPost[];
}

// API service
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

    async getPostById(id: string): Promise<BlogPost> {
        const response = await baseRequest({
            url: `/cms/blog-posts/${id}/`,
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch blog post: ${response.statusText}`);
        }

        return response.data;
    },
};

function BlogDetail() {
    const { id } = useParams();

    // Fetch all blog posts for related articles
    const {
        data: blogResponse,
        isLoading: isLoadingBlogs,
        isError: isBlogsError,
        error: blogsError,
    } = useQuery({
        queryKey: ['blogs'],
        queryFn: blogService.getPosts,
    });

    // Fetch specific blog post by id
    const {
        data: blog,
        isLoading: isLoadingBlog,
        isError: isBlogError,
        error: blogError,
    } = useQuery({
        queryKey: ['blog', id],
        queryFn: () => blogService.getPostById(id || ''),
    });

    // Format date helper
    const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    // Loading state
    if (isLoadingBlog || isLoadingBlogs) {
        return (
            <MaxWidthWrapper>
                <div className="max-w-4xl mx-auto px-4 py-16 text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
                    <p className="text-gray-600">Loading blog post...</p>
                </div>
            </MaxWidthWrapper>
        );
    }

    // Error state
    if (isBlogError || isBlogsError) {
        return (
            <MaxWidthWrapper>
                <div className="max-w-4xl mx-auto px-4 py-16 text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">
                        {blogError?.message || blogsError?.message || 'Something went wrong'}
                    </h1>
                    <Link to="/blog" className="text-blue-600 hover:text-blue-700">
                        ← Back to Blog
                    </Link>
                </div>
            </MaxWidthWrapper>
        );
    }

    // Blog not found
    if (!blog) {
        return (
            <MaxWidthWrapper>
                <div className="max-w-4xl mx-auto px-4 py-16 text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog post not found</h1>
                    <Link to="/blog" className="text-blue-600 hover:text-blue-700">
                        ← Back to Blog
                    </Link>
                </div>
            </MaxWidthWrapper>
        );
    }

    // Get related blogs (exclude current blog)
    const relatedBlogs = blogResponse?.results
        ?.filter((b) => b.id !== blog.id)
        ?.slice(0, 3) || [];

    // Get primary category from tags
    const primaryTag = blog.tags?.[0];

    return (
        <MaxWidthWrapper>
            {/* Breadcrumb */}
            <nav className="mb-8">
                <Link to="/blog" className="text-primary hover:text-blue-700 font-medium">
                    ← Back to Blog
                </Link>
            </nav>

            {/* Article Header */}
            <header className="mb-8">
                <div className="flex items-center text-sm text-gray-500 mb-4">
                    {primaryTag && (
                        <span className="bg-primary text-white px-3 py-1 rounded-full mr-4">
                            {primaryTag.name}
                        </span>
                    )}
                    <Calendar className="h-4 w-4 mr-2" />
                    {formatDate(blog.published_at)}
                    <span className="mx-2">•</span>
                    <Book className="h-4 w-4 mr-2" />
                    {blog.reading_time}
                    {' '}
                    min read
                </div>

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                    {blog.title}
                </h1>

                <div className="flex items-center mb-8">
                    <div className="flex items-center">
                        <Users className="h-5 w-5 mr-2 text-gray-400" />
                        <span className="text-gray-600 font-medium">
                            By
                            {' '}
                            {blog.author_name}
                        </span>
                    </div>
                </div>

                <img
                    src={blog.cover_image}
                    alt={blog.title}
                    className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
                />
            </header>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none mb-12">
                <div
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                    className="text-gray-700 leading-relaxed space-y-6"
                />
            </div>

            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
                <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                        {blog.tags.map((tag) => (
                            <span
                                key={tag.id}
                                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors"
                            >
                                {tag.name}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Social Sharing */}
            <div className="border-t border-gray-200 pt-8 mb-12">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Share this story</h3>
                <div className="flex space-x-4">
                    <button
                        type="button"
                        onClick={() => {
                            const url = window.location.href;
                            const text = `Check out this story: ${blog.title}`;
                            window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium transition-colors"
                    >
                        Share on Facebook
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            const url = window.location.href;
                            const text = `Check out this story: ${blog.title}`;
                            window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
                        }}
                        className="bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded font-medium transition-colors"
                    >
                        Share on Twitter
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            navigator.clipboard.writeText(window.location.href);
                            // You might want to show a toast notification here
                        }}
                        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded font-medium transition-colors"
                    >
                        Copy Link
                    </button>
                </div>
            </div>

            {/* Related Articles */}
            {relatedBlogs.length > 0 && (
                <section className="border-t border-gray-200 pt-12">
                    <h3 className="text-2xl font-bold text-gray-900 mb-8">Related Stories</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {relatedBlogs.map((relatedBlog) => (
                            <Link
                                key={relatedBlog.id}
                                to={`/blog/${relatedBlog.id}`}
                                className="group"
                            >
                                <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                                    <img
                                        src={relatedBlog.cover_image}
                                        alt={relatedBlog.title}
                                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="p-4">
                                        <div className="flex items-center text-xs text-gray-500 mb-2">
                                            <Calendar className="h-3 w-3 mr-1" />
                                            {formatDate(relatedBlog.published_at)}
                                        </div>
                                        <h4 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                            {relatedBlog.title}
                                        </h4>
                                        <p className="text-gray-600 text-sm line-clamp-2">
                                            {relatedBlog.content.replace(/<[^>]*>/g, '').substring(0, 100)}
                                            ...
                                        </p>
                                    </div>
                                </article>
                            </Link>
                        ))}
                    </div>
                </section>
            )}
        </MaxWidthWrapper>
    );
}

export default BlogDetail;
