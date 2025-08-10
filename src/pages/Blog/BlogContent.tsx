import { Link } from 'react-router-dom';
import {
    Calendar,
    Users,
} from 'lucide-react';

import MaxWidthWrapper from '@/components/MaxWidthWrapper';

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

interface BlogContentProps {
    selectedCategory: string;
    blogs: Blog[];
}

// Helper function to format date
const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
});

// Helper function to strip HTML and create excerpt
const createExcerpt = (htmlContent: string, maxLength: number = 150) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    const textContent = tempDiv.textContent || tempDiv.innerText || '';
    return textContent.length > maxLength
        ? `${textContent.substring(0, maxLength)}...`
        : textContent;
};

function BlogContent(props: BlogContentProps) {
    const { selectedCategory, blogs } = props;

    if (!blogs || blogs.length === 0) {
        return (
            <section className="py-16 bg-white">
                <MaxWidthWrapper>
                    <div className="text-center">
                        <p className="text-gray-600">No blog posts available.</p>
                    </div>
                </MaxWidthWrapper>
            </section>
        );
    }

    return (
        <section className="py-16 bg-white">
            <MaxWidthWrapper>
                {/* Featured Post */}
                <div className="mb-16">
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <div className="md:flex">
                            <div className="md:w-1/2">
                                <img
                                    src={blogs[0].cover_image}
                                    alt={blogs[0].title}
                                    className="w-full h-64 md:h-full object-cover"
                                />
                            </div>
                            <div className="md:w-1/2 p-8">
                                <div className="flex items-center flex-wrap text-sm text-gray-500 mb-4">
                                    <div className="flex flex-wrap gap-2 mr-4 mb-2">
                                        {blogs[0].tags.map((tag) => (
                                            <span
                                                key={tag.id}
                                                className="bg-primary text-white px-3 py-1 rounded-full text-xs"
                                            >
                                                {tag.name}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex items-center mb-2">
                                        <Calendar className="h-4 w-4 mr-2" />
                                        {formatDate(blogs[0].published_at)}
                                    </div>
                                </div>
                                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                                    {blogs[0].title}
                                </h2>
                                <p className="text-gray-600 mb-6 text-lg">
                                    {createExcerpt(blogs[0].content, 200)}
                                </p>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <Users className="h-4 w-4 mr-2 text-gray-400" />
                                        <span className="text-gray-600">{blogs[0].author_name}</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="text-sm text-gray-500">
                                            {blogs[0].reading_time}
                                            {' '}
                                            min read
                                        </span>
                                        <Link
                                            to={`/blog/${blogs[0].id}`}
                                            className="bg-primary hover:brightness-90 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                                        >
                                            Read More
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.slice(selectedCategory === 'All' ? 1 : 0).map((blog) => (
                        <article key={blog.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                            <img
                                src={blog.cover_image}
                                alt={blog.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-6">
                                <div className="flex items-center flex-wrap text-sm text-gray-500 mb-3">
                                    <div className="flex flex-wrap gap-1 mr-3 mb-1">
                                        {blog.tags.slice(0, 2).map((tag) => (
                                            <span
                                                key={tag.id}
                                                className="bg-primary text-white px-2 py-1 rounded text-xs"
                                            >
                                                {tag.name}
                                            </span>
                                        ))}
                                        {blog.tags.length > 2 && (
                                            <span className="text-xs text-gray-400">
                                                +
                                                {blog.tags.length - 2}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-center mb-1">
                                        <Calendar className="h-3 w-3 mr-1" />
                                        {formatDate(blog.published_at)}
                                    </div>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                                    {blog.title}
                                </h3>
                                <p className="text-gray-600 mb-4 line-clamp-3">
                                    {createExcerpt(blog.content)}
                                </p>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center text-sm text-gray-500">
                                        <Users className="h-3 w-3 mr-1" />
                                        {blog.author_name}
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-xs text-gray-500">
                                            {blog.reading_time}
                                            {' '}
                                            min read
                                        </span>
                                        <Link
                                            to={`/blog/${blog.id}`}
                                            className="text-primary hover:brightness-90 font-medium text-sm"
                                        >
                                            Read More →
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </MaxWidthWrapper>
        </section>
    );
}

export default BlogContent;
