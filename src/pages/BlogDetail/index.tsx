/* The post body is sanitized with DOMPurify before rendering. */
/* eslint-disable react/no-danger */
import {
    Link,
    useParams,
} from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
    ArrowLeft,
    Facebook,
    Link2,
} from 'lucide-react';
import { toast } from 'sonner';

import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import ReplyPanel from '@/components/ReplyPanel';
import SafeImage from '@/components/SafeImage';
import { ErrorNote } from '@/components/States';
import { Button } from '@/components/ui/button';
import { usePageTitle } from '@/hooks/usePageTitle';
import {
    getBlogPost,
    getBlogPosts,
    queryKeys,
} from '@/lib/api';
import {
    formatDate,
    postDate,
    postPath,
    sanitizeHtml,
} from '@/lib/format';

async function copyLink() {
    try {
        await navigator.clipboard.writeText(window.location.href);
        toast.success('Link copied');
    } catch {
        toast.error('Could not copy the link. Copy it from the address bar instead.');
    }
}

function BackLink() {
    return (
        <Link to="/blog" className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-airmail-red [font-stretch:106%] hover:underline">
            <ArrowLeft className="size-4" strokeWidth={1.75} />
            All letters
        </Link>
    );
}

function ArticleSkeleton() {
    return (
        <div className="mx-auto max-w-3xl py-16" aria-busy="true">
            <span className="sr-only">Loading</span>
            <div className="skeleton h-4 w-40 rounded-[2px]" />
            <div className="skeleton mt-6 h-12 w-full rounded-[2px]" />
            <div className="skeleton mt-3 h-12 w-2/3 rounded-[2px]" />
            <div className="skeleton mt-10 aspect-[3/2] w-full rounded-[2px]" />
        </div>
    );
}

function BlogDetail() {
    const { id = '' } = useParams();
    const post = useQuery({
        queryKey: queryKeys.blogPost(id),
        queryFn: () => getBlogPost(id),
        enabled: !!id,
    });
    const all = useQuery({ queryKey: queryKeys.blogPosts, queryFn: getBlogPosts });
    usePageTitle(post.data?.title ?? 'Letter');

    if (post.isPending) {
        return <MaxWidthWrapper><ArticleSkeleton /></MaxWidthWrapper>;
    }

    if (post.isError) {
        return (
            <MaxWidthWrapper className="py-20">
                <BackLink />
                <ErrorNote className="mt-8" message={post.error.message} onRetry={() => post.refetch()} />
            </MaxWidthWrapper>
        );
    }

    const blog = post.data;
    const related = (all.data?.results ?? []).filter((item) => item.id !== blog.id).slice(0, 3);
    const shareUrl = encodeURIComponent(window.location.href);

    return (
        <>
            <article className="pt-10 pb-16 md:pt-14">
                <MaxWidthWrapper>
                    <div className="mx-auto max-w-3xl">
                        <BackLink />
                        <p className="postal mt-10 flex flex-wrap gap-x-3 gap-y-1 text-ink-faint">
                            <time dateTime={postDate(blog)}>
                                {formatDate(postDate(blog))}
                            </time>
                            {blog.reading_time > 0 && (
                                <span>
                                    {blog.reading_time}
                                    {' '}
                                    min read
                                </span>
                            )}
                        </p>
                        <h1 className="mt-4 text-4xl leading-[1.05] text-ink sm:text-5xl lg:text-6xl">{blog.title}</h1>
                        {blog.author_name && (
                            <p className="mt-5 font-serif text-lg italic text-ink-soft">
                                From
                                {' '}
                                {blog.author_name}
                            </p>
                        )}
                    </div>
                    {blog.cover_image && (
                        <SafeImage
                            src={blog.cover_image}
                            alt=""
                            className="mx-auto mt-12 aspect-[16/9] w-full max-w-5xl rounded-[2px] object-cover"
                            decoding="async"
                        />
                    )}
                    <div className="mx-auto mt-12 max-w-3xl">
                        <div className="letter-prose" dangerouslySetInnerHTML={{ __html: sanitizeHtml(blog.content) }} />

                        {blog.tags?.length > 0 && (
                            <ul className="mt-12 flex flex-wrap gap-2" aria-label="Tags">
                                {blog.tags.map((tag) => (
                                    <li key={tag.id} className="rounded-[2px] border border-ink/20 px-2.5 py-1 font-sans text-sm text-ink-soft">
                                        {tag.name}
                                    </li>
                                ))}
                            </ul>
                        )}

                        <div className="mt-12 flex flex-wrap items-center gap-3 border-t border-ink/15 pt-6">
                            <p className="mr-2 font-sans text-sm font-semibold text-ink">Share this letter</p>
                            <Button variant="outline" size="sm" onClick={copyLink}>
                                <Link2 strokeWidth={1.75} />
                                Copy link
                            </Button>
                            <Button asChild variant="outline" size="sm">
                                <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" rel="noopener noreferrer">
                                    <Facebook strokeWidth={1.75} />
                                    Facebook
                                </a>
                            </Button>
                        </div>
                    </div>
                </MaxWidthWrapper>
            </article>

            {related.length > 0 && (
                <section aria-labelledby="more-title" className="border-t border-ink/15 py-16 md:py-20">
                    <MaxWidthWrapper>
                        <h2 id="more-title" className="text-3xl text-ink">More letters</h2>
                        <ul className="mt-10 grid gap-8 md:grid-cols-3">
                            {related.map((item) => (
                                <li key={item.id}>
                                    <Link to={postPath(item)} className="group block">
                                        <time dateTime={postDate(item)} className="postal text-ink-faint">
                                            {formatDate(postDate(item), 'short')}
                                        </time>
                                        <span className="mt-2 block font-sans text-xl font-semibold text-ink [font-stretch:106%] group-hover:underline">
                                            {item.title}
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </MaxWidthWrapper>
                </section>
            )}

            <ReplyPanel />
        </>
    );
}

export default BlogDetail;
