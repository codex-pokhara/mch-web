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
import About from '@/pages/AboutUs';
import Home from '@/pages/Home';
import Login from '@/pages/Login';

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
                path: '/about',
                element: <About />,
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
