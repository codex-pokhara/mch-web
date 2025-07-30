import { Link } from 'react-router-dom';
import {
    Calendar,
    Users,
} from 'lucide-react';

import MaxWidthWrapper from '@/components/MaxWidthWrapper';

interface Blog {
    id: number;
    title: string;
    excerpt: string;
    content: string;
    date: string;
    author: string;
    category: string;
    image: string;
    readTime: string;
}

interface BlogContentProps {
    categories: string[];
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
    blogs: Blog[];
}

function BlogContent(props: BlogContentProps) {
    const {
        categories, selectedCategory, setSelectedCategory, blogs,
    } = props;

    return (
        <section className="py-16 bg-white">
            <MaxWidthWrapper>
                {/* Category Filter */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {categories.map((category) => (
                        <button
                            type="button"
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-6 py-2 rounded-full font-medium transition-colors ${
                                selectedCategory === category
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Featured Post */}
                {selectedCategory === 'All' && (
                    <div className="mb-16">
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <div className="md:flex">
                                <div className="md:w-1/2">
                                    <img
                                        src={blogs[0].image}
                                        alt={blogs[0].title}
                                        className="w-full h-64 md:h-full object-cover"
                                    />
                                </div>
                                <div className="md:w-1/2 p-8">
                                    <div className="flex items-center text-sm text-gray-500 mb-4">
                                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full mr-4">
                                            {blogs[0].category}
                                        </span>
                                        <Calendar className="h-4 w-4 mr-2" />
                                        {blogs[0].date}
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                                        {blogs[0].title}
                                    </h2>
                                    <p className="text-gray-600 mb-6 text-lg">
                                        {blogs[0].excerpt}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <Users className="h-4 w-4 mr-2 text-gray-400" />
                                            <span className="text-gray-600">{blogs[0].author}</span>
                                        </div>
                                        <Link
                                            to={`/blog/${blogs[0].id}`}
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                                        >
                                            Read More
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.slice(selectedCategory === 'All' ? 1 : 0).map((blog) => (
                        <article key={blog.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                            <img
                                src={blog.image}
                                alt={blog.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-6">
                                <div className="flex items-center text-sm text-gray-500 mb-3">
                                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded mr-3 text-xs">
                                        {blog.category}
                                    </span>
                                    <Calendar className="h-3 w-3 mr-1" />
                                    {blog.date}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                                    {blog.title}
                                </h3>
                                <p className="text-gray-600 mb-4 line-clamp-3">
                                    {blog.excerpt}
                                </p>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center text-sm text-gray-500">
                                        <Users className="h-3 w-3 mr-1" />
                                        {blog.author}
                                    </div>
                                    <div className="flex items-center">
                                        <span className="text-xs text-gray-500 mr-3">{blog.readTime}</span>
                                        <Link
                                            to={`/blog/${blog.id}`}
                                            className="text-blue-600 hover:text-blue-700 font-medium text-sm"
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
