import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import BlogContent from './BlogContent';

import HeroSection from '@/components/HeroSection';
import { baseRequest } from '@/lib/base';

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

interface BlogAPIResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: BlogPost[];
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

function Blog() {
    const title = 'Our Blog';
    const description = 'Stay updated with the latest news, stories, and updates from Mountain Children Home. Read about our children&apos;s achievements, ongoing projects, and community impact.';

    const [selectedCategory] = useState('All');

    const {
        data: blogResponse,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['blogs'],
        queryFn: blogService.getPosts,
    });

    // Get published blogs only - with proper null checks
    const publishedBlogs = blogResponse?.results?.filter((blog) => blog.status === 'published') || [];

    // Filter blogs by category (if you implement category filtering later)
    const filteredBlogs = selectedCategory === 'All'
        ? publishedBlogs
        : publishedBlogs.filter((blog) => blog.tags?.some(
            (tag) => tag.name === selectedCategory,
        ) || false);

    // Handle loading state
    if (isLoading) {
        return (
            <>
                <HeroSection title={title} description={description} />
                <div className="container mx-auto px-4 py-8">
                    <div className="flex items-center justify-center min-h-[400px]">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
                            <p className="text-gray-600">Loading blog posts...</p>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    // Handle error state
    if (isError) {
        return (
            <>
                <HeroSection title={title} description={description} />
                <div className="container mx-auto px-4 py-8">
                    <div className="flex items-center justify-center min-h-[400px]">
                        <div className="text-center">
                            <p className="text-red-600 mb-4">Failed to load blog posts</p>
                            <p className="text-gray-600">
                                {error instanceof Error ? error.message : 'An unexpected error occurred'}
                            </p>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    // Handle empty state
    if (filteredBlogs.length === 0) {
        return (
            <>
                <HeroSection title={title} description={description} />
                <div className="container mx-auto px-4 py-8">
                    <div className="flex items-center justify-center min-h-[400px]">
                        <div className="text-center">
                            <p className="text-gray-600">No blog posts found</p>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <HeroSection title={title} description={description} />
            <BlogContent
                selectedCategory={selectedCategory}
                blogs={filteredBlogs}
            />
        </>
    );
}
export default Blog;
