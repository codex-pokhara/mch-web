import {
    isRouteErrorResponse,
    Link,
    useRouteError,
} from 'react-router-dom';

import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { Button } from '@/components/ui/button';

/** Shown when a page throws or fails to load. Stands alone, without the site layout. */
function RouteError() {
    const error = useRouteError();
    const status = isRouteErrorResponse(error) ? error.status : null;

    return (
        <MaxWidthWrapper className="flex min-h-[100dvh] flex-col justify-center py-20">
            <h1 className="text-4xl text-ink sm:text-5xl">This page did not arrive.</h1>
            <p className="mt-5 max-w-[50ch] text-lg text-ink-soft">
                {status === 404
                    ? 'We could not find the page at this address.'
                    : 'Something went wrong while loading it. A refresh usually fixes this.'}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
                <Button variant="ink" onClick={() => window.location.reload()}>Refresh the page</Button>
                <Button asChild variant="outline">
                    <Link to="/">Go to the home page</Link>
                </Button>
            </div>
        </MaxWidthWrapper>
    );
}

export default RouteError;
