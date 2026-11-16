import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import PageHeader from '@/components/PageHeader';
import SafeImage from '@/components/SafeImage';
import {
    EmptyNote,
    ErrorNote,
    SkeletonGrid,
} from '@/components/States';
import { usePageTitle } from '@/hooks/usePageTitle';
import {
    type BlogPost,
    getBlogPosts,
    queryKeys,
} from '@/lib/api';
import {
    excerpt,
    formatDate,
    postDate,
    postPath,
} from '@/lib/format';

function Meta({ post }: { post: BlogPost }) {
    return (
        <p className="postal flex flex-wrap gap-x-3 gap-y-1 text-ink-faint">
            <time dateTime={postDate(post)}>{formatDate(postDate(post), 'short')}</time>
            {post.reading_time > 0 && (
                <span>
                    {post.reading_time}
                    {' '}
                    min read
                </span>
            )}
            {post.tags?.[0] && <span className="text-airmail-red">{post.tags[0].name}</span>}
        </p>
    );
}

function Featured({ post }: { post: BlogPost }) {
    return (
        <Link to={postPath(post)} className="group grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-center md:gap-14">
            <span className="block overflow-hidden rounded-[2px] bg-paper-deep">
                {post.cover_image && (
                    <SafeImage
                        src={post.cover_image}
                        alt=""
                        className="aspect-[3/2] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                        decoding="async"
                    />
                )}
            </span>
            <span className="block">
                <Meta post={post} />
                <span className="mt-4 block font-sans text-3xl leading-tight font-bold text-ink [font-stretch:112.5%] group-hover:underline group-hover:decoration-2 sm:text-4xl">
                    {post.title}
                </span>
                <span className="mt-4 block text-lg text-ink-soft">{excerpt(post.content, 220)}</span>
                {post.author_name && (
                    <span className="mt-5 block font-serif italic text-ink">
                        From
                        {' '}
                        {post.author_name}
                    </span>
                )}
            </span>
        </Link>
    );
}

function PostItem({ post }: { post: BlogPost }) {
    return (
        <li>
            <Link to={postPath(post)} className="group block">
                <span className="block overflow-hidden rounded-[2px] bg-paper-deep">
                    {post.cover_image && (
                        <SafeImage
                            src={post.cover_image}
                            alt=""
                            className="aspect-[3/2] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                            loading="lazy"
                            decoding="async"
                        />
                    )}
                </span>
                <span className="mt-5 block"><Meta post={post} /></span>
                <span className="mt-2.5 block font-sans text-xl leading-snug font-semibold text-ink [font-stretch:106%] group-hover:underline">
                    {post.title}
                </span>
                <span className="mt-2 line-clamp-3 block text-ink-soft">{excerpt(post.content, 160)}</span>
            </Link>
        </li>
    );
}

function Blog() {
    usePageTitle('Letters');
    const {
        data,
        isPending,
        isError,
        error,
        refetch,
    } = useQuery({
        queryKey: queryKeys.blogPosts,
        queryFn: getBlogPosts,
    });

    const posts = data?.results ?? [];
    const [first, ...rest] = posts;

    let body = null;
    if (isPending) {
        body = <SkeletonGrid count={3} />;
    } else if (isError) {
        body = <ErrorNote message={error.message} onRetry={() => refetch()} />;
    } else if (!first) {
        body = <EmptyNote title="No letters yet.">News, school results and stories from the home will appear here.</EmptyNote>;
    } else {
        body = (
            <>
                <Featured post={first} />
                {rest.length > 0 && (
                    <ul className="mt-20 grid gap-x-8 gap-y-14 border-t border-ink/15 pt-14 sm:grid-cols-2 lg:grid-cols-3">
                        {rest.map((post) => <PostItem key={post.id} post={post} />)}
                    </ul>
                )}
            </>
        );
    }

    return (
        <>
            <PageHeader
                title="Letters from home."
                lead="News, achievements and everyday stories from Mountain Children's Home, written by the family."
            />
            <section className="py-16 md:py-20">
                <MaxWidthWrapper>{body}</MaxWidthWrapper>
            </section>
        </>
    );
}

export default Blog;
