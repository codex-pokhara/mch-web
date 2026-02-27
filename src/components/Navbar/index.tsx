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
                'w-full sticky top-0 transition-all duration-500 z-40',
                scrolled
                    ? 'bg-white/80 backdrop-blur-2xl shadow-md'
                    : 'bg-background/95 backdrop-blur-sm',
            )}
        >
            <MaxWidthWrapper>
                <div className="flex h-20 items-center justify-between">
                    <Link
                        to="/"
                        className="flex items-center gap-3"
                    >
                        <img
                            src="Vector.png"
                            alt="OHCDS logo"
                            className="h-12"
                        />
                        <div className="hidden sm:block">
                            <span className="text-sm font-bold leading-tight block text-foreground">
                                OHCDS
                            </span>
                            <span className="text-xs leading-tight block text-muted-foreground">
                                Mountain Children&apos;s Home
                            </span>
                        </div>
                    </Link>
                    <nav className="hidden lg:flex gap-8">
                        {navigation.map((item) => (
                            <Link
                                to={item.url}
                                key={item.title}
                                className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors duration-200"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.title}
                            </Link>
                        ))}
                    </nav>
                    <div className="hidden lg:flex gap-4">
                        <Link to="/get-involved">
                            <Button variant="accent" className="px-7">
                                Get Involved
                            </Button>
                        </Link>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="lg:hidden"
                        onClick={() => setIsMenuOpen((prev) => !prev)}
                    >
                        <Menu className="h-6 w-6" />
                        <span className="sr-only">Toggle menu</span>
                    </Button>
                </div>
            </MaxWidthWrapper>
            {isMenuOpen && (
                <div className="fixed inset-0 z-50 bg-background lg:hidden overflow-y-auto h-screen">
                    <MaxWidthWrapper>
                        <div className="flex h-20 items-center justify-between">
                            <Link
                                to="/"
                                className="flex items-center gap-3"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <img
                                    src="Vector.png"
                                    className="h-12 w-auto"
                                    alt="OHCDS logo"
                                />
                                <span className="text-sm font-bold text-foreground">
                                    OHCDS
                                </span>
                            </Link>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <X className="h-6 w-6" />
                                <span className="sr-only">Close menu</span>
                            </Button>
                        </div>
                    </MaxWidthWrapper>
                    <MaxWidthWrapper>
                        <nav className="grid gap-6 py-6">
                            {navigation.map((item) => (
                                <Link
                                    to={item.url}
                                    key={item.title}
                                    className="text-lg font-medium text-foreground/80 hover:text-primary transition-colors duration-200"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.title}
                                </Link>
                            ))}
                            <Link
                                to="/get-involved"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <Button
                                    variant="accent"
                                    className="w-full"
                                >
                                    Get Involved
                                </Button>
                            </Link>
                        </nav>
                    </MaxWidthWrapper>
                </div>
            )}
        </header>
    );
}
