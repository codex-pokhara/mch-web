/* eslint-disable react/no-danger */
import {
    Link,
    useParams,
} from 'react-router-dom';
import {
    Book,
    Calendar,
    Users,
} from 'lucide-react';

import MaxWidthWrapper from '@/components/MaxWidthWrapper';

function BlogDetail() {
    const { id } = useParams();

    // This would typically come from an API or database
    const blogs = [
        {
            id: 1,
            title: 'A Day in the Life at Mountain Children Home',
            content: `
        <p>Every day at Mountain Children Home begins at 6:00 AM with the gentle sound of morning prayers. The children wake up naturally to this peaceful routine that has become second nature to them over the years.</p>
        
        <h3>Morning Routine (6:00 AM - 8:00 AM)</h3>
        <p>After prayers, the children help each other get ready for the day. Personal hygiene is emphasized, and older children often help the younger ones brush their teeth and get dressed. Breakfast is served at 7:00 AM, featuring nutritious local foods prepared with love by our kitchen staff.</p>
        
        <h3>School Time (8:00 AM - 3:00 PM)</h3>
        <p>Education is at the heart of everything we do. Our children attend both our on-site learning center and local schools in the community. We ensure each child receives quality education appropriate to their age and learning needs. Homework support is provided by our dedicated teaching staff.</p>
        
        <h3>Afternoon Activities (3:00 PM - 6:00 PM)</h3>
        <p>After school, children engage in various activities including sports, arts and crafts, music lessons, and free play time. These activities help develop their creativity, physical fitness, and social skills.</p>
        
        <h3>Evening Wind Down (6:00 PM - 9:00 PM)</h3>
        <p>Dinner is served at 6:00 PM, followed by family time where children share their daily experiences. Study time begins at 7:30 PM, and younger children have bedtime stories before lights out at 9:00 PM.</p>
        
        <p>This structured yet loving environment helps our children feel secure and supported as they grow and learn. Every day is filled with opportunities for growth, learning, and joy.</p>
      `,
            date: 'March 15, 2024',
            author: 'Sarah Johnson',
            category: 'Daily Life',
            image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            readTime: '5 min read',
        },
        {
            id: 2,
            title: "Success Story: Maria's Journey to University",
            content: `
        <p>Maria arrived at Mountain Children Home when she was just 8 years old, having lost both parents in a tragic accident. Scared and alone, she barely spoke for the first few months of her stay with us.</p>
        
        <h3>Finding Her Voice</h3>
        <p>With patience, love, and dedicated support from our care team, Maria slowly began to open up. She showed a natural aptitude for mathematics and science, subjects that became her refuge and passion.</p>
        
        <h3>Academic Excellence</h3>
        <p>Throughout her years at Mountain Children Home, Maria consistently excelled in her studies. She received tutoring support from volunteers and participated in academic competitions, often placing in the top positions.</p>
        
        <h3>Dreams Take Flight</h3>
        <p>When it came time for university applications, Maria set her sights high. With support from our education fund and her own determination, she was accepted into the prestigious State University's Engineering program.</p>
        
        <h3>Giving Back</h3>
        <p>Now in her second year of studies, Maria regularly visits Mountain Children Home to tutor younger children in mathematics. She says our home gave her not just shelter and education, but hope and purpose.</p>
        
        <p>"Mountain Children Home didn't just save my life," Maria says, "they gave me the tools to build the life I dreamed of. Now I want to help other children discover their own potential."</p>
        
        <p>Maria's story is one of many that inspire us every day. It reminds us why we do this work and the incredible potential that lies within every child who walks through our doors.</p>
      `,
            date: 'March 10, 2024',
            author: 'Michael Chen',
            category: 'Success Stories',
            image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            readTime: '7 min read',
        },
        {
            id: 3,
            title: 'Building Our New Learning Center',
            content: `
        <p>Construction on our new learning center is progressing wonderfully, and we're excited to share this milestone with our supporters who have made this dream possible.</p>
        
        <h3>Why We Need More Space</h3>
        <p>Our current facility has served us well for 15 years, but as our family has grown, so has our need for dedicated learning spaces. The new center will provide modern classrooms, a computer lab, library, and multipurpose rooms for arts and crafts.</p>
        
        <h3>Construction Progress</h3>
        <p>Ground was broken in January 2024, and we're pleased to report that construction is on schedule. The foundation has been completed, and walls are now rising. Local contractors have generously donated their services, and community volunteers help with various tasks.</p>
        
        <h3>Features of the New Center</h3>
        <ul>
          <li>Six modern classrooms with improved lighting and ventilation</li>
          <li>Computer lab with 20 workstations</li>
          <li>Library with space for 2,000 books</li>
          <li>Science laboratory for hands-on learning</li>
          <li>Multipurpose hall for events and gatherings</li>
        </ul>
        
        <h3>Expected Completion</h3>
        <p>We anticipate the learning center will be ready for use by the start of the new school year in September 2024. This will allow us to serve up to 50 more children and provide enhanced educational opportunities for all.</p>
        
        <p>Thank you to everyone who has supported this project. Your contributions are literally building the foundation for countless children's futures.</p>
      `,
            date: 'March 5, 2024',
            author: 'Sarah Johnson',
            category: 'Updates',
            image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            readTime: '4 min read',
        },
    ];

    const blog = blogs.find((b) => b.id === Number(id));
    const relatedBlogs = blogs.filter((b) => b.id !== Number(id)).slice(0, 3);

    if (!blog) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-16 text-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog post not found</h1>
                <Link to="/blog" className="text-blue-600 hover:text-blue-700">
                    ← Back to Blog
                </Link>
            </div>
        );
    }

    return (

        <MaxWidthWrapper>
            {/* Breadcrumb */}
            <nav className="mb-8">
                <Link to="/blog" className="text-blue-600 hover:text-blue-700 font-medium">
                    ← Back to Blog
                </Link>
            </nav>

            {/* Article Header */}
            <header className="mb-8">
                <div className="flex items-center text-sm text-gray-500 mb-4">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full mr-4">
                        {blog.category}
                    </span>
                    <Calendar className="h-4 w-4 mr-2" />
                    {blog.date}
                    <span className="mx-2">•</span>
                    <Book className="h-4 w-4 mr-2" />
                    {blog.readTime}
                </div>

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                    {blog.title}
                </h1>

                <div className="flex items-center mb-8">
                    <div className="flex items-center">
                        <Users className="h-5 w-5 mr-2 text-gray-400" />
                        <span className="text-gray-600 font-medium">
                            By
                            {blog.author}
                        </span>
                    </div>
                </div>

                <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
                />
            </header>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none mb-12">
                <div
                    dangerouslySetInnerHTML={{ __html: blog.content.replace(/\n/g, '') }}
                    className="text-gray-700 leading-relaxed space-y-6"
                />
            </div>

            {/* Social Sharing */}
            <div className="border-t border-gray-200 pt-8 mb-12">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Share this story</h3>
                <div className="flex space-x-4">
                    <button
                        type="button"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium transition-colors"
                    >
                        Share on Facebook
                    </button>
                    <button
                        type="button"
                        className="bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded font-medium transition-colors"
                    >
                        Share on Twitter
                    </button>
                    <button
                        type="button"
                        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded font-medium transition-colors"
                    >
                        Copy Link
                    </button>
                </div>
            </div>

            {/* Related Articles */}
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
                                    src={relatedBlog.image}
                                    alt={relatedBlog.title}
                                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="p-4">
                                    <div className="flex items-center text-xs text-gray-500 mb-2">
                                        <Calendar className="h-3 w-3 mr-1" />
                                        {relatedBlog.date}
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
        </MaxWidthWrapper>

    );
}

export default BlogDetail;
