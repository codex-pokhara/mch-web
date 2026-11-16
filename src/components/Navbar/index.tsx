import {
    useEffect,
    useRef,
    useState,
} from 'react';
import {
    Link,
    NavLink,
    useLocation,
} from 'react-router-dom';
import {
    Menu,
    X,
} from 'lucide-react';

import MaxWidthWrapper from '../MaxWidthWrapper';
import { Button } from '../ui/button';

import { navigation } from '@/constants';
import { cn } from '@/lib/utils';

function Wordmark() {
    return (
        <Link to="/" className="flex items-center gap-3 rounded-[2px]" aria-label="Mountain Children's Home, home page">
            <img src="/logo.png" alt="" width={74} height={40} className="h-9 w-auto sm:h-10" />
            <span className="flex flex-col leading-none">
                <span className="font-sans text-[0.95rem] font-bold text-ink [font-stretch:112.5%] sm:text-base">
                    Mountain Children&apos;s Home
                </span>
                <span className="postal mt-1 text-[0.625rem] text-ink-faint">OHCDS · Kathmandu</span>
            </span>
        </Link>
    );
}

function navLinkClass({ isActive }: { isActive: boolean }) {
    return cn(
        'relative py-2 font-sans text-[0.9375rem] font-medium [font-stretch:106%] transition-colors duration-150',
        'after:absolute after:inset-x-0 after:bottom-0.5 after:h-[2px] after:origin-left after:bg-airmail-red after:transition-transform after:duration-200 after:ease-out',
        isActive ? 'text-ink after:scale-x-100' : 'text-ink-soft hover:text-ink after:scale-x-0',
    );
}

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { pathname } = useLocation();
    const menuRef = useRef<HTMLDivElement>(null);
    const toggleRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    useEffect(() => {
        if (!isMenuOpen) {
            return undefined;
        }
        const toggle = toggleRef.current;
        document.body.style.overflow = 'hidden';
        menuRef.current?.querySelector('a')?.focus();
        const onKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsMenuOpen(false);
            }
        };
        window.addEventListener('keydown', onKey);
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', onKey);
            toggle?.focus();
        };
    }, [isMenuOpen]);

    return (
        <>
            <header
                className={cn(
                    'sticky top-0 z-40 border-b bg-paper/95 backdrop-blur-sm transition-[border-color] duration-200 supports-[backdrop-filter]:bg-paper/85',
                    scrolled ? 'border-ink/15' : 'border-transparent',
                )}
            >
                <MaxWidthWrapper>
                    <div className="flex h-18 items-center justify-between gap-6">
                        <Wordmark />
                        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
                            {navigation.map((item) => (
                                <NavLink key={item.url} to={item.url} className={navLinkClass}>
                                    {item.title}
                                </NavLink>
                            ))}
                        </nav>
                        <div className="flex items-center gap-2">
                            <Button asChild variant="stamp" size="sm" className="hidden sm:inline-flex">
                                <Link to="/get-involved">Donate</Link>
                            </Button>
                            <Button
                                ref={toggleRef}
                                variant="ghost"
                                size="icon"
                                className="lg:hidden"
                                aria-expanded={isMenuOpen}
                                aria-controls="mobile-menu"
                                onClick={() => setIsMenuOpen((open) => !open)}
                            >
                                {isMenuOpen ? <X className="size-6" strokeWidth={1.75} /> : <Menu className="size-6" strokeWidth={1.75} />}
                                <span className="sr-only">{isMenuOpen ? 'Close menu' : 'Open menu'}</span>
                            </Button>
                        </div>
                    </div>
                </MaxWidthWrapper>
            </header>

            {isMenuOpen && (
                <div
                    id="mobile-menu"
                    ref={menuRef}
                    className="rise-in fixed inset-x-0 top-18 bottom-0 z-40 overflow-y-auto border-t border-ink/15 bg-paper lg:hidden"
                >
                    <MaxWidthWrapper className="flex min-h-full flex-col pt-4 pb-10">
                        <nav aria-label="Main" className="flex flex-col">
                            <NavLink to="/" end className="border-b border-ink/10 py-4 font-sans text-2xl font-semibold text-ink [font-stretch:112.5%]">
                                Home
                            </NavLink>
                            {navigation.map((item) => (
                                <NavLink
                                    key={item.url}
                                    to={item.url}
                                    className={({ isActive }) => cn(
                                        'border-b border-ink/10 py-4 font-sans text-2xl font-semibold [font-stretch:112.5%]',
                                        isActive ? 'text-airmail-red' : 'text-ink',
                                    )}
                                >
                                    {item.title}
                                </NavLink>
                            ))}
                        </nav>
                        <Button asChild variant="stamp" size="lg" className="mt-8 w-full">
                            <Link to="/get-involved">Donate or sponsor a child</Link>
                        </Button>
                    </MaxWidthWrapper>
                </div>
            )}
        </>
    );
}
