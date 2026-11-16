import { type ReactNode } from 'react';

import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import Postmark from '@/components/Postal/Postmark';

interface PageHeaderProps {
    title: string;
    lead: string;
    mark?: { ringTop: string; big: string; small?: string };
    children?: ReactNode;
}

function PageHeader({
    title,
    lead,
    mark,
    children,
}: PageHeaderProps) {
    return (
        <header className="border-b border-ink/15">
            <MaxWidthWrapper className="grid gap-10 pt-14 pb-12 md:grid-cols-[1fr_auto] md:items-end md:pt-20 md:pb-16">
                <div className="rise-in max-w-3xl">
                    <h1 className="text-[2.6rem] text-ink sm:text-6xl lg:text-7xl">{title}</h1>
                    <p className="mt-6 max-w-[58ch] text-lg leading-relaxed text-ink-soft sm:text-xl">{lead}</p>
                    {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
                </div>
                {mark && (
                    <Postmark
                        ringTop={mark.ringTop}
                        small={mark.small}
                        big={mark.big}
                        className="hidden w-32 -rotate-12 opacity-85 md:block lg:w-36"
                    />
                )}
            </MaxWidthWrapper>
        </header>
    );
}

export default PageHeader;
