import {
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react';
import {
    createBrowserRouter,
    RouterProvider,
} from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import Dashboard from '../pages/Dashboard';
import ProtectedRoutes from './ProtectRoutes';
import PublicRoutes from './PublicRoutes';

import styles from './styles.module.css';

import Layout from '@/components/Layout';
import AuthContext, { type AuthState } from '@/contexts/auth';
import { baseRequest } from '@/lib/base';
import { setLocalStorage } from '@/lib/utils';
import Blog from '@/pages/Blog';
import BlogDetail from '@/pages/BlogDetail';
import Event from '@/pages/Event';
import EventDetail from '@/pages/EventDetail';
import Gallery from '@/pages/Gallery';
import GetInvolved from '@/pages/GetInvolved';
import Home from '@/pages/Home';
import Impact from '@/pages/Impact';
import Login from '@/pages/Login';
import OurFamily from '@/pages/OurFamily';
import Transparency from '@/pages/Transparency';

const getProfile = async () => {
    const response = await baseRequest({
        url: '/me',
        method: 'GET',
    });

    return response;
};

const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                element: <PublicRoutes />,
                children: [
                    {
                        path: '/login',
                    },
                ],
            },
            {
                element: <ProtectedRoutes />,
                children: [
                    {
                        path: '/account',
                        element: <Login />,
                    },
                ],
            },
            {
                element: <ProtectedRoutes />,
                children: [
                    {
                        path: '/account',
                        element: <Dashboard />,
                    },
                ],
            },
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/our-family',
                element: <OurFamily />,
            },
            {
                path: '/impact',
                element: <Impact />,
            },
            {
                path: '/transparency',
                element: <Transparency />,
            },
            {
                path: '/gallery',
                element: <Gallery />,
            },
            {
                path: '/get-involved',
                element: <GetInvolved />,
            },
            {
                path: '/blog',
                element: <Blog />,
            },
            {
                path: '/blog/:id',
                element: <BlogDetail />,
            },
            {
                path: '/event',
                element: <Event />,
            },
            {
                path: '/event/:id',
                element: <EventDetail />,
            },
            // Legacy redirects
            {
                path: '/about',
                element: <OurFamily />,
            },
            {
                path: '/budget',
                element: <Transparency />,
            },
            {
                path: '/contact',
                element: <GetInvolved />,
            },
        ],
    },
]);

function App() {
    const [auth, setAuth] = useState<AuthState | undefined>(undefined);
    const [ready, setReady] = useState(false);

    const login = useCallback((token: string, value: AuthState) => {
        setLocalStorage('app-auth', token);
        setAuth(value);
    }, []);

    const logout = useCallback(() => {
        setAuth(undefined);
        setLocalStorage('app-auth', null);
    }, []);

    const authContextValue = useMemo(
        () => ({
            state: auth,
            setState: setAuth,
            login,
            logout,
        }),
        [login, logout, auth],
    );

    const {
        isError,
        isLoading,
        error,
        data: payloadData,
    } = useQuery({
        queryKey: ['account'],
        queryFn: () => getProfile(),
    });

    useEffect(() => {
        if (!payloadData) {
            return;
        }
        // FIXME: implement this later
        if (payloadData.status === 401) {
            logout();
            setReady(true);
        } else {
            setAuth(() => ({
                id: payloadData.data.id,
                name: payloadData.data.username,
            }));
            setReady(true);
        }
    }, [logout, payloadData]);

    if (!ready) {
        return null;
    }

    if (isError) {
        return error.message;
    }

    if (isLoading) {
        return (
            <div className={styles.fallbackElement}>
                <img
                    className={styles.logo}
                    alt="logo"
                    src="/ogo.png"
                    loading="lazy"
                />
                Mountain Children Home loading...
            </div>
        );
    }

    return (
        <AuthContext.Provider value={authContextValue}>
            <RouterProvider
                router={router}
                fallbackElement={(
                    <div className={styles.fallbackElement}>
                        <img
                            className={styles.logo}
                            alt="logo"
                            src="/logo.png"
                            loading="lazy"
                        />
                        Mountain Children Home loading...
                    </div>
                )}
            />
        </AuthContext.Provider>
    );
}
export default App;
