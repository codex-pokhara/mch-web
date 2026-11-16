import { Outlet } from 'react-router-dom';

import Footer from '../Footer';
import Header from '../Navbar';
import ScrollToTop from '../ScrollToTop';

function Layout() {
    return (
        <div className="flex min-h-[100dvh] flex-col">
            <a
                href="#main"
                className="sr-only z-50 bg-ink px-4 py-3 font-sans text-sheet focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
            >
                Skip to content
            </a>
            <Header />
            <main id="main" className="flex-1" tabIndex={-1}>
                <Outlet />
            </main>
            <Footer />
            <ScrollToTop />
        </div>
    );
}

export default Layout;
