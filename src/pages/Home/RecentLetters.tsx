import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowUpRight } from 'lucide-react';

import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import DateCancel from '@/components/Postal/DateCancel';
import {
    EmptyNote,
    ErrorNote,
    SkeletonGrid,
} from '@/components/States';
import {
    getBlogPosts,
    queryKeys,
} from '@/lib/api';
import {
    excerpt,
    postDate,
    postPath,
} from '@/lib/format';

function RecentLetters() {
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

    const posts = (data?.results ?? []).slice(0, 3);

    let body = null;
    if (isPending) {
        body = <SkeletonGrid count={3} itemClassName="h-24" className="lg:grid-cols-1" />;
    } else if (isError) {
        body = <ErrorNote message={error.message} onRetry={() => refetch()} />;
    } else if (posts.length === 0) {
        body = <EmptyNote title="No letters yet.">News from the home will appear here soon.</EmptyNote>;
    } else {
        body = (
            <ul className="border-t border-ink/20">
                {posts.map((post) => (
                    <li key={post.id} className="border-b border-ink/15">
                        <Link
                            to={postPath(post)}
                            className="group grid grid-cols-[4.5rem_1fr] items-start gap-5 py-7 sm:grid-cols-[4.5rem_1fr_auto] sm:gap-8"
                        >
                            <DateCancel value={postDate(post)} />
                            <span className="pt-2">
                                <span className="block font-sans text-xl font-semibold text-ink [font-stretch:106%] group-hover:underline group-hover:decoration-1 sm:text-2xl">
                                    {post.title}
                                </span>
                                <span className="mt-2 block max-w-[64ch] text-ink-soft">{excerpt(post.content, 150)}</span>
                            </span>
                            <ArrowUpRight
                                className="mt-3 hidden size-5 text-ink-faint transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-airmail-red sm:block"
                                strokeWidth={1.75}
                                aria-hidden="true"
                            />
                        </Link>
                    </li>
                ))}
            </ul>
        );
    }

    return (
        <section aria-labelledby="letters-title" className="pt-4 pb-24 md:pb-32">
            <MaxWidthWrapper>
                <div className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
                    <h2 id="letters-title" className="text-4xl text-ink sm:text-5xl">Recent letters from home.</h2>
                    <Link to="/blog" className="w-fit font-sans font-semibold text-airmail-red [font-stretch:106%] hover:underline">
                        Read every letter
                    </Link>
                </div>
                {body}
            </MaxWidthWrapper>
        </section>
    );
}

export default RecentLetters;
