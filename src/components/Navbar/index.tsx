import {
    useEffect,
    useState,
} from 'react';
import { Link } from 'react-router-dom';
import {
    Menu,
    X,
} from 'lucide-react';

import MaxWidthWrapper from '../MaxWidthWrapper';
import { Button } from '../ui/button';

import { navigation } from '@/constants';
import { cn } from '@/lib/utils';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    });

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMenuOpen]);
    return (
        <header
            className={cn(
                'w-full border-b sticky top-0 transition-colors duration-300 bg-white z-40',
                scrolled && ' backdrop-blur-3xl bg-white',
            )}
        >
            <MaxWidthWrapper>
                <div
                    className="flex h-16 items-center justify-between"
                >
                    <Link
                        to="/"
                        className="flex items-center gap-2"
                    >
                        <img
                            src="Vector.png"
                            alt="logo"
                            className="h-14"
                        />
                    </Link>
                    <nav
                        className="hidden md:flex gap-6"
                    >
                        {navigation.map((item) => (
                            <Link
                                to={item.url}
                                key={item.title}
                                className="text-sm font-medium hover:text-primary"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.title}
                            </Link>
                        )) }
                    </nav>
                    <div
                        className="hidden md:flex gap-4"
                    >
                        <Link to="/contact">
                            <Button>
                                Contact Us
                            </Button>
                        </Link>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        onClick={() => setIsMenuOpen((prev) => !prev)}
                    >
                        <Menu
                            className="h-6 w-6"
                        />
                        <span
                            className="sr-only"
                        >
                            Toggle menu
                        </span>
                    </Button>
                </div>
            </MaxWidthWrapper>
            {
                isMenuOpen && (
                    <div
                        className="fixed inset-0 z-50 !bg-white md:hidden overflow-y-auto h-[100vh]"
                    >
                        <MaxWidthWrapper>
                            <div
                                className="flex h-16 items-center justify-between"
                            >
                                <Link
                                    to="/"
                                    className="flex items-center gap-2"
                                >
                                    <img
                                        src=""
                                        className="h-14 w-auto"
                                        alt="logo"
                                    />
                                </Link>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <X
                                        className="h-6 w-6"
                                    />
                                    <span
                                        className="sr-only"
                                    >
                                        Close menu
                                    </span>
                                </Button>
                            </div>
                        </MaxWidthWrapper>
                        <MaxWidthWrapper>
                            <nav
                                className="grid gap-6 py-6"
                            >
                                {navigation.map((item) => (
                                    <Link
                                        to={item.url}
                                        key={item.title}
                                        className="text-sm font-medium hover:text-primary"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {item.title}
                                    </Link>
                                )) }
                                <Link
                                    to="/contact"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <Button
                                        className="w-full bg-primary hover:bg-primary/90"
                                    >
                                        Contact Us
                                    </Button>
                                </Link>
                            </nav>
                        </MaxWidthWrapper>

                    </div>
                )
            }
        </header>
    );
}
