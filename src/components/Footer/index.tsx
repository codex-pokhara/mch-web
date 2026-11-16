import { Link } from 'react-router-dom';
import {
    Facebook,
    Instagram,
} from 'lucide-react';

import MaxWidthWrapper from '../MaxWidthWrapper';

import {
    contact,
    navigation,
} from '@/constants';

const helpLinks = [
    { title: 'Donate', url: '/get-involved' },
    { title: 'Volunteer', url: '/get-involved#ways' },
    { title: 'Visit us', url: '/get-involved#ways' },
    { title: 'Budget report (PDF)', url: '/MCH.pdf', external: true },
];

const linkClass = 'text-sheet/75 underline-offset-4 transition-colors duration-150 hover:text-sheet hover:underline';

export default function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer className="bg-ink text-sheet">
            <div className="airmail-stripes h-2" aria-hidden="true" />
            <MaxWidthWrapper className="grid gap-12 pt-16 pb-10 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.35fr]">
                <div>
                    <Link to="/" className="inline-flex items-center gap-3">
                        <img src="/logo.png" alt="" width={74} height={40} className="h-10 w-auto brightness-0 invert" />
                        <span className="font-sans text-lg font-bold [font-stretch:112.5%]">Mountain Children&apos;s Home</span>
                    </Link>
                    <p className="mt-5 max-w-[34ch] text-sheet/75">
                        A family home for forty children in Dadagaun, Kathmandu. Run by the Orphan
                        and Helpless Children
                        Development Society since 2002.
                    </p>
                </div>

                <nav aria-label="Footer">
                    <p className="postal text-sheet/55">The home</p>
                    <ul className="mt-4 flex flex-col gap-2.5 font-sans text-[0.9375rem]">
                        <li><Link className={linkClass} to="/">Home</Link></li>
                        {navigation.map((item) => (
                            <li key={item.url}>
                                <Link className={linkClass} to={item.url}>{item.title}</Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div>
                    <p className="postal text-sheet/55">Help</p>
                    <ul className="mt-4 flex flex-col gap-2.5 font-sans text-[0.9375rem]">
                        {helpLinks.map((item) => (
                            <li key={item.title}>
                                {item.external
                                    ? <a className={linkClass} href={item.url} target="_blank" rel="noopener noreferrer">{item.title}</a>
                                    : <Link className={linkClass} to={item.url}>{item.title}</Link>}
                            </li>
                        ))}
                    </ul>
                </div>

                <address className="not-italic">
                    <p className="postal text-sheet/55">Write to us</p>
                    <p className="mt-4 text-sheet/75">
                        {contact.addressLines.map((line) => <span key={line} className="block">{line}</span>)}
                    </p>
                    <p className="mt-3 flex flex-col gap-1 font-sans text-[0.9375rem]">
                        <a className={`${linkClass} [overflow-wrap:anywhere]`} href={`mailto:${contact.email}`}>{contact.email}</a>
                        <a className={`${linkClass} tabular`} href={contact.phoneHref}>{contact.phone}</a>
                    </p>
                    <div className="mt-5 flex gap-2">
                        <a
                            href={contact.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="press flex size-10 items-center justify-center rounded-[3px] border border-sheet/25 text-sheet/80 hover:border-sheet hover:text-sheet"
                        >
                            <Facebook className="size-4" strokeWidth={1.75} />
                            <span className="sr-only">Facebook</span>
                        </a>
                        <a
                            href={contact.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="press flex size-10 items-center justify-center rounded-[3px] border border-sheet/25 text-sheet/80 hover:border-sheet hover:text-sheet"
                        >
                            <Instagram className="size-4" strokeWidth={1.75} />
                            <span className="sr-only">Instagram</span>
                        </a>
                    </div>
                </address>
            </MaxWidthWrapper>
            <MaxWidthWrapper className="flex flex-col gap-2 border-t border-sheet/15 py-6 font-sans text-xs text-sheet/60 sm:flex-row sm:justify-between">
                <p>
                    ©
                    {' '}
                    {year}
                    {' '}
                    OHCDS Mountain Children&apos;s Home
                </p>
                <p>
                    Site by
                    {' '}
                    <a className="underline-offset-4 hover:text-sheet hover:underline" href="https://codex.com.np" target="_blank" rel="noopener noreferrer">
                        Codex
                    </a>
                </p>
            </MaxWidthWrapper>
        </footer>
    );
}
