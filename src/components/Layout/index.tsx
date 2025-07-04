import { Outlet } from 'react-router-dom';

import Footer from '../Footer';
import Header from '../Navbar';
import ScrollToTop from '../ScrollToTop';
import TopLoader from '../TopLoader/TopLoader';

// import Footer from '../Footer';

function Layout() {
    return (
        <div className="relative">
            <TopLoader />
            <Header />
            <div className="min-h-[60vh]">
                <Outlet />
            </div>
            <Footer />
            <ScrollToTop />
        </div>
    );
}

export default Layout;
