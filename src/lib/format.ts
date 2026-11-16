import DOMPurify from 'dompurify';

export function formatDate(value: string | null | undefined, month: 'short' | 'long' = 'long') {
    if (!value) {
        return '';
    }
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return '';
    }
    return date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month,
        year: 'numeric',
    });
}

export function formatDateRange(start: string, end: string) {
    const first = formatDate(start);
    if (!end || start.slice(0, 10) === end.slice(0, 10)) {
        return first;
    }
    return `${first} to ${formatDate(end)}`;
}

/** CMS content is HTML written by staff. Sanitize before it touches the DOM. */
export function sanitizeHtml(html: string) {
    return DOMPurify.sanitize(html ?? '', { USE_PROFILES: { html: true } });
}

/** Opening or closing block-level tags, which need a space so text does not run together. */
const BLOCK_TAG = /<\/?(p|div|h[1-6]|li|ul|ol|blockquote|br|section|article)[\s/>][^>]*>?/gi;

export function plainText(html: string) {
    if (!html) {
        return '';
    }
    const spaced = html.replace(BLOCK_TAG, ' $& ');
    const doc = new DOMParser().parseFromString(spaced, 'text/html');
    return (doc.body.textContent ?? '').replace(/\s+/g, ' ').trim();
}

/** A heading at the very top of a post usually repeats its title. */
const LEADING_HEADING = /^\s*<h[1-6][^>]*>[\s\S]*?<\/h[1-6]>/i;

export function excerpt(html: string, maxLength = 160) {
    const text = plainText((html ?? '').replace(LEADING_HEADING, ''));
    if (text.length <= maxLength) {
        return text;
    }
    const cut = text.slice(0, maxLength);
    const lastSpace = cut.lastIndexOf(' ');
    const trimmed = lastSpace > 80 ? cut.slice(0, lastSpace) : cut;
    return `${trimmed.replace(/[,.;:]$/, '')}…`;
}

/** Posts without a publish date fall back to when they were written. */
export function postDate(post: { published_at?: string | null; created_at: string }) {
    return post.published_at || post.created_at;
}

export function postPath(post: { id: number }) {
    return `/blog/${post.id}`;
}
