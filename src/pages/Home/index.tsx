import FounderRoute from './FounderRoute';
import Hero from './Hero';
import HowWeCare from './HowWeCare';
import RecentLetters from './RecentLetters';
import RecentPhotos from './RecentPhotos';
import WhereMoneyGoes from './WhereMoneyGoes';

import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import ReplyPanel from '@/components/ReplyPanel';
import Credentials from '@/components/Sections/Credentials';
import { usePageTitle } from '@/hooks/usePageTitle';

function Home() {
    usePageTitle();
    return (
        <>
            <Hero />
            <FounderRoute />
            <HowWeCare />
            <WhereMoneyGoes />
            <RecentPhotos />
            <RecentLetters />
            <section aria-labelledby="checks-title" className="border-t border-ink/15 pt-20 md:pt-24">
                <MaxWidthWrapper>
                    <h2 id="checks-title" className="max-w-2xl text-3xl text-ink sm:text-4xl">
                        Registered, checked and audited.
                    </h2>
                    <Credentials className="mt-12" />
                </MaxWidthWrapper>
            </section>
            <ReplyPanel />
        </>
    );
}

export default Home;
