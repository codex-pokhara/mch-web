import { baseRequest } from '@/lib/base';

export interface Paginated<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
}

export interface Tag {
    id: number;
    name: string;
    slug: string;
}

export interface BlogPost {
    id: number;
    title: string;
    slug: string;
    cover_image: string;
    content: string;
    author_name: string;
    tags: Tag[];
    reading_time: number;
    published_at: string | null;
    status: string;
    created_at: string;
    updated_at: string;
}

export interface EventItem {
    id: number;
    title: string;
    slug: string;
    cover_image: string;
    description: string;
    start_date: string;
    end_date: string;
    location: string;
    event_type: string;
    created_at: string;
    updated_at: string;
}

export interface Album {
    id: number;
    title: string;
    slug: string;
    description: string;
    cover_image: string;
    created_at: string;
    photo_count: number;
}

export interface Photo {
    id: number;
    image: string;
    caption: string;
    created_at: string;
    album: number;
}

export interface ContactMessage {
    name: string;
    email: string;
    phone?: string;
    message: string;
}

export const ALBUMS_PAGE_SIZE = 12;
export const PHOTOS_PAGE_SIZE = 24;

async function getJson<T>(url: string, what: string): Promise<T> {
    const response = await baseRequest({ url, method: 'GET' });
    if (!response.ok) {
        throw new Error(`We could not load ${what} (error ${response.status}).`);
    }
    return response.data as T;
}

export async function getBlogPosts() {
    const data = await getJson<Paginated<BlogPost>>('/cms/blog-posts/', 'our letters');
    const published = data.results.filter((post) => post.status === 'published');
    return { ...data, results: published };
}

export function getBlogPost(id: string) {
    return getJson<BlogPost>(`/cms/blog-posts/${encodeURIComponent(id)}/`, 'this letter');
}

export function getEvents() {
    return getJson<Paginated<EventItem>>('/cms/events/', 'events');
}

export function getEvent(id: string) {
    return getJson<EventItem>(`/cms/events/${encodeURIComponent(id)}/`, 'this event');
}

export function getAlbums(page: number) {
    const url = `/cms/albums/?page=${page}&size=${ALBUMS_PAGE_SIZE}`;
    return getJson<Paginated<Album>>(url, 'albums');
}

export function getAlbumPhotos(albumId: number, page: number) {
    const url = `/cms/photos/?album=${albumId}&page=${page}&size=${PHOTOS_PAGE_SIZE}`;
    return getJson<Paginated<Photo>>(url, 'photos');
}

export function getRecentPhotos(size: number) {
    return getJson<Paginated<Photo>>(`/cms/photos/?page=1&size=${size}`, 'photos');
}

export async function postContactMessage(body: ContactMessage) {
    const response = await baseRequest({
        url: '/cms/contact-messages/',
        method: 'POST',
        body,
        contentType: 'application/json',
    });
    if (!response.ok) {
        const detail = response.data?.detail;
        throw new Error(detail || 'Your message did not send. Please try again, or email us directly.');
    }
    return response.data;
}

export const queryKeys = {
    blogPosts: ['blog-posts'] as const,
    blogPost: (id: string) => ['blog-post', id] as const,
    events: ['events'] as const,
    event: (id: string) => ['event', id] as const,
    albums: (page: number) => ['albums', page] as const,
    albumPhotos: (albumId: number, page: number) => ['album-photos', albumId, page] as const,
    recentPhotos: (size: number) => ['recent-photos', size] as const,
};
