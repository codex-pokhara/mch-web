import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';

import MaxWidthWrapper from '@/components/MaxWidthWrapper';

function BlogPreview() {
    const blogs = [
        {
            id: 1,
            title: 'A Day in the Life at Mountain Children Home',
            excerpt: 'Follow along as we share what a typical day looks like for our children, from morning prayers to evening activities.',
            date: 'March 15, 2024',
            image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        },
        {
            id: 2,
            title: "Success Story: Maria's Journey to University",
            excerpt: 'Read about Maria, who grew up at our home and is now pursuing her dreams at university thanks to your support.',
            date: 'March 10, 2024',
            image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        },
        {
            id: 3,
            title: 'Building Our New Learning Center',
            excerpt: "We're excited to share updates on our new learning center construction, which will provide better educational facilities.",
            date: 'March 5, 2024',
            image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        },
    ];

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
                    {blogs.map((blog) => (
                        <div key={blog.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                            <img
                                src={blog.image}
                                alt={blog.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-6">
                                <div className="flex items-center text-gray-500 text-sm mb-3">
                                    <Calendar className="h-4 w-4 mr-2" />
                                    {blog.date}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">{blog.title}</h3>
                                <p className="text-gray-600 mb-4">{blog.excerpt}</p>
                                <Link
                                    to={`/blog/${blog.id}`}
                                    className="text-blue-600 hover:text-blue-700 font-medium"
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
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                    >
                        View All Stories
                    </Link>
                </div>
            </MaxWidthWrapper>
        </section>
    );
}

export default BlogPreview;
