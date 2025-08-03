import { Link } from 'react-router-dom';
import {
    Facebook,
    Instagram,
} from 'lucide-react';

import MaxWidthWrapper from '../MaxWidthWrapper';

export default function Footer() {
    return (
        <footer
            className="w-full border-t bg-white"
        >
            <MaxWidthWrapper
                className="py-12"
            >
                <div
                    className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4"
                >
                    <div
                        className="flex flex-col gap-2"
                    >
                        <Link
                            to="/"
                            className="flex items-center gap-2"
                        >
                            <img
                                className="h-18 w-auto"
                                src="Vector.png"
                                alt="logo"
                            />
                        </Link>
                        <p
                            className="text-sm text-muted-foreground mt-2"
                        >
                            Mountain Children Home, one family Spreading love,
                            care & hope.
                        </p>
                    </div>
                    <div>
                        <h3
                            className="text-lg font-semibold mb-4"
                        >
                            Quick Links
                        </h3>
                        <ul
                            className="grid gap-3"
                        >
                            <li>
                                <Link
                                    to="/"
                                    className="text-sm hover:text-primary"
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/events"
                                    className="text-sm hover:text-primary"
                                >
                                    Events
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/gallery"
                                    className="text-sm hover:text-primary"
                                >
                                    Gallery
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/about"
                                    className="text-sm hover:text-primary"
                                >
                                    About Us
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3
                            className="text-lg font-semibold mb-4"
                        >
                            Get Involved
                        </h3>
                        <ul
                            className="grid gap-3"
                        >
                            <li>
                                <Link
                                    to="/contact"
                                    className="text-sm hover:text-primary"
                                >
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3
                            className="text-lg font-semibold mb-4"
                        >
                            Connect With Us
                        </h3>
                        <div
                            className="flex gap-4"
                        >
                            <Link
                                to="https://www.facebook.com/mountain.children.home.2025/"
                                className="text-muted-foreground hover:text-primary"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Facebook
                                    className="h-5 w-5"
                                />
                                <span
                                    className="sr-only"
                                >
                                    Facebook
                                </span>
                            </Link>
                            <Link
                                to="https://www.instagram.com/mountainchildren_home/"
                                className="text-muted-foreground hover:text-primary"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Instagram
                                    className="h-5 w-5"
                                />
                                <span
                                    className="sr-only"
                                >
                                    Instagram
                                </span>
                            </Link>
                        </div>
                        <p
                            className="text-sm text-muted-foreground mt-4"
                        >
                            Email: orphanhomedadagaun@gmail.com
                        </p>
                    </div>
                </div>
                <div
                    className="mt-12 border-t pt-6"
                >
                    <p
                        className="text-sm text-muted-foreground text-center"
                    >
                        &copy;
                        {' '}
                        {new Date().getFullYear()}
                        {' '}
                        Mountain Children Home. All rights reserved.
                    </p>
                </div>
            </MaxWidthWrapper>
        </footer>
    );
}
