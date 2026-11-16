import { useEffect } from 'react';

const SITE = 'Mountain Children’s Home';

/** Sets the document title. Call with no argument for the home page. */
export function usePageTitle(title?: string) {
    useEffect(() => {
        document.title = title ? `${title} · ${SITE}` : `OHCDS ${SITE}, Kathmandu`;
    }, [title]);
}
