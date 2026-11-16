import { Link } from 'react-router-dom';

import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import Postmark from '@/components/Postal/Postmark';
import { Button } from '@/components/ui/button';
import { usePageTitle } from '@/hooks/usePageTitle';

function NotFound() {
    usePageTitle('Page not found');
    return (
        <MaxWidthWrapper className="grid gap-12 py-24 md:grid-cols-[1fr_auto] md:items-center md:py-32">
            <div>
                <h1 className="text-5xl text-ink sm:text-6xl">Return to sender.</h1>
                <p className="mt-6 max-w-[48ch] text-lg text-ink-soft">
                    We could not find the page at this address. It may have moved, or the link may
                    have a typo.
                </p>
                <div className="mt-9 flex flex-wrap gap-3">
                    <Button asChild variant="ink">
                        <Link to="/">Back to the home page</Link>
                    </Button>
                    <Button asChild variant="outline">
                        <Link to="/get-involved#write">Write to us</Link>
                    </Button>
                </div>
            </div>
            <Postmark
                ringTop="ADDRESS UNKNOWN"
                small="ERROR"
                big="404"
                waves
                className="w-64 -rotate-12 opacity-90 sm:w-80"
            />
        </MaxWidthWrapper>
    );
}

export default NotFound;
