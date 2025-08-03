import { useState } from 'react';

import BlogContent from './BlogContent';

import HeroSection from '@/components/HeroSection';

function Blog() {
    const title = 'Our Blog';
    const description = 'Stay updated with the latest news, stories, and updates from Mountain Children Home. Read about our children&apos;s achievements, ongoing projects, and community impact.';

    const blogs = [
        {
            id: 1,
            title: 'A Day in the Life at Mountain Children Home',
            excerpt: 'Follow along as we share what a typical day looks like for our children, from morning prayers to evening activities. See how structure, love, and learning come together to create a nurturing environment.',
            content: 'Every day at Mountain Children Home begins at 6:00 AM with the gentle sound of morning prayers...',
            date: 'March 15, 2024',
            author: 'Sarah Johnson',
            category: 'Daily Life',
            image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            readTime: '5 min read',
        },
        {
            id: 2,
            title: "Success Story: Maria's Journey to University",
            excerpt: 'Read about Maria, who grew up at our home and is now pursuing her dreams at university thanks to your support. Her story is a testament to what love and education can achieve.',
            content: 'Maria arrived at Mountain Children Home when she was just 8 years old...',
            date: 'March 10, 2024',
            author: 'Michael Chen',
            category: 'Success Stories',
            image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            readTime: '7 min read',
        },
        {
            id: 3,
            title: 'Building Our New Learning Center',
            excerpt: "We're excited to share updates on our new learning center construction, which will provide better educational facilities for our children and expand our capacity to serve more kids in need.",
            content: 'Construction on our new learning center is progressing wonderfully...',
            date: 'March 5, 2024',
            author: 'Sarah Johnson',
            category: 'Updates',
            image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            readTime: '4 min read',
        },
        {
            id: 4,
            title: 'Celebrating Our 15th Anniversary',
            excerpt: 'This month marks 15 years since Mountain Children Home first opened its doors. Join us as we reflect on our journey and celebrate the hundreds of lives that have been transformed.',
            content: 'Fifteen years ago, our founders had a simple but powerful vision...',
            date: 'February 28, 2024',
            author: 'Dr. Maria Rodriguez',
            category: 'Milestones',
            image: 'https://images.unsplash.com/photo-1527576539890-dfa815648363?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            readTime: '6 min read',
        },
        {
            id: 5,
            title: 'Health and Wellness Initiative Launch',
            excerpt: "We're launching a comprehensive health and wellness program to ensure every child receives the physical and mental health support they need to thrive.",
            content: "Good health is fundamental to a child's ability to learn and grow...",
            date: 'February 20, 2024',
            author: 'Dr. Maria Rodriguez',
            category: 'Health',
            image: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            readTime: '5 min read',
        },
        {
            id: 6,
            title: 'Community Partnership Spotlight',
            excerpt: 'Learn about our amazing partnership with local businesses and organizations that help make our mission possible. Community support is the backbone of our work.',
            content: 'Our work would not be possible without the incredible support of our community partners...',
            date: 'February 15, 2024',
            author: 'Michael Chen',
            category: 'Community',
            image: 'https://images.unsplash.com/photo-1439886183900-e79ec0057170?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            readTime: '4 min read',
        },
    ];

    const categories = ['All', 'Daily Life', 'Success Stories', 'Updates', 'Milestones', 'Health', 'Community'];
    const [selectedCategory, setSelectedCategory] = useState('All');

    const filteredBlogs = selectedCategory === 'All'
        ? blogs
        : blogs.filter((blog) => blog.category === selectedCategory);

    return (
        <>
            <HeroSection title={title} description={description} />
            <BlogContent
                categories={categories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                blogs={filteredBlogs}
            />
        </>
    );
}

export default Blog;
