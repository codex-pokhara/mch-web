import { Link } from 'react-router-dom';
import {
    Facebook,
    Instagram,
    Mail,
} from 'lucide-react';

import MaxWidthWrapper from '../MaxWidthWrapper';

export default function Footer() {
    return (
        <footer className="w-full bg-foreground text-white">
            <MaxWidthWrapper className="py-20">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
                    <div className="flex flex-col gap-3">
                        <Link to="/" className="flex items-center gap-3">
                            <img
                                className="h-14 w-auto brightness-0 invert"
                                src="Vector.png"
                                alt="OHCDS logo"
                            />
                        </Link>
                        <p className="text-base font-semibold text-white">
                            OHCDS Mountain Children&apos;s Home
                        </p>
                        <p className="text-sm text-white/40 leading-relaxed">
                            Building Futures, One Child at a Time.
                            <br />
                            Budhanilkantha, Dadagaun, Kathmandu, Nepal.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60 mb-5">
                            Quick Links
                        </h3>
                        <ul className="grid gap-3">
                            <li>
                                <Link to="/" className="text-sm text-white/50 hover:text-white transition-colors duration-200">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/our-family" className="text-sm text-white/50 hover:text-white transition-colors duration-200">
                                    Our Family
                                </Link>
                            </li>
                            <li>
                                <Link to="/impact" className="text-sm text-white/50 hover:text-white transition-colors duration-200">
                                    Impact
                                </Link>
                            </li>
                            <li>
                                <Link to="/transparency" className="text-sm text-white/50 hover:text-white transition-colors duration-200">
                                    Transparency
                                </Link>
                            </li>
                            <li>
                                <Link to="/gallery" className="text-sm text-white/50 hover:text-white transition-colors duration-200">
                                    Gallery
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60 mb-5">
                            Get Involved
                        </h3>
                        <ul className="grid gap-3">
                            <li>
                                <Link to="/get-involved" className="text-sm text-white/50 hover:text-white transition-colors duration-200">
                                    Donate
                                </Link>
                            </li>
                            <li>
                                <Link to="/get-involved" className="text-sm text-white/50 hover:text-white transition-colors duration-200">
                                    Volunteer
                                </Link>
                            </li>
                            <li>
                                <Link to="/blog" className="text-sm text-white/50 hover:text-white transition-colors duration-200">
                                    Blog
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60 mb-5">
                            Connect
                        </h3>
                        <div className="flex gap-3 mb-4">
                            <Link
                                to="https://www.facebook.com/mountain.children.home.2025/"
                                className="w-10 h-10 rounded-full bg-white/10 text-white/60 hover:bg-accent hover:text-white flex items-center justify-center transition-all duration-200"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Facebook className="h-4 w-4" />
                                <span className="sr-only">Facebook</span>
                            </Link>
                            <Link
                                to="https://www.instagram.com/mountainchildren_home/"
                                className="w-10 h-10 rounded-full bg-white/10 text-white/60 hover:bg-accent hover:text-white flex items-center justify-center transition-all duration-200"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Instagram className="h-4 w-4" />
                                <span className="sr-only">Instagram</span>
                            </Link>
                            <a
                                href="mailto:orphanhomedadagaun@gmail.com"
                                className="w-10 h-10 rounded-full bg-white/10 text-white/60 hover:bg-accent hover:text-white flex items-center justify-center transition-all duration-200"
                            >
                                <Mail className="h-4 w-4" />
                                <span className="sr-only">Email</span>
                            </a>
                        </div>
                        <p className="text-xs text-white/30">
                            orphanhomedadagaun@gmail.com
                        </p>
                    </div>
                </div>

                <div className="mt-16 border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-white/30">
                        &copy;
                        {' '}
                        {new Date().getFullYear()}
                        {' '}
                        OHCDS Mountain Children&apos;s Home. All rights reserved.
                    </p>
                    <p className="text-xs text-white/30">
                        Powered by
                        {' '}
                        <a
                            href="https://codex.com.np"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white/50 hover:text-white transition-colors duration-200"
                        >
                            Codex Pvt Ltd
                        </a>
                    </p>
                </div>
            </MaxWidthWrapper>
        </footer>
    );
}
