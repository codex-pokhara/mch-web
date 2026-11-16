import {
    type ComponentType,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react';
import {
    createBrowserRouter,
    Navigate,
    RouterProvider,
} from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import ProtectedRoutes from './ProtectRoutes';
import PublicRoutes from './PublicRoutes';
import RouteError from './RouteError';

import Layout from '@/components/Layout';
import AuthContext, {
    type AuthContextValue,
    type AuthState,
} from '@/contexts/auth';
import { baseRequest } from '@/lib/base';
import {
    readLocalStorage,
    setLocalStorage,
} from '@/lib/utils';
import Home from '@/pages/Home';
import NotFound from '@/pages/NotFound';

type PageModule = { default: ComponentType };

/** Code-split every page except Home, which ships in the first bundle. */
const page = (load: () => Promise<PageModule>) => async () => {
    const module = await load();
    return { Component: module.default };
};

const router = createBrowserRouter([
    {
        element: <Layout />,
        errorElement: <RouteError />,
        children: [
            { path: '/', element: <Home /> },
            { path: '/our-family', lazy: page(() => import('@/pages/OurFamily')) },
            { path: '/impact', lazy: page(() => import('@/pages/Impact')) },
            { path: '/transparency', lazy: page(() => import('@/pages/Transparency')) },
            { path: '/gallery', lazy: page(() => import('@/pages/Gallery')) },
            { path: '/get-involved', lazy: page(() => import('@/pages/GetInvolved')) },
            { path: '/blog', lazy: page(() => import('@/pages/Blog')) },
            { path: '/blog/:id', lazy: page(() => import('@/pages/BlogDetail')) },
            { path: '/event', lazy: page(() => import('@/pages/Event')) },
            { path: '/event/:id', lazy: page(() => import('@/pages/EventDetail')) },
            {
                element: <PublicRoutes />,
                children: [{ path: '/login', lazy: page(() => import('@/pages/Login')) }],
            },
            {
                element: <ProtectedRoutes />,
                children: [{ path: '/account', lazy: page(() => import('@/pages/Dashboard')) }],
            },
            { path: '/about', element: <Navigate to="/our-family" replace /> },
            { path: '/budget', element: <Navigate to="/transparency" replace /> },
            { path: '/contact', element: <Navigate to="/get-involved" replace /> },
            { path: '*', element: <NotFound /> },
        ],
    },
]);

async function getProfile(): Promise<AuthState | null> {
    const response = await baseRequest({ url: '/me', method: 'GET' });
    if (!response.ok) {
        return null;
    }
    return { id: response.data.id, name: response.data.username };
}

function App() {
    const [token, setToken] = useState(() => readLocalStorage('app-auth'));
    const [session, setSession] = useState<AuthState | undefined>(undefined);

    // The public site never waits on this. It only runs when a staff token is stored.
    const profile = useQuery({
        queryKey: ['account', token],
        queryFn: getProfile,
        enabled: !!token,
        retry: false,
        staleTime: Infinity,
    });

    const login = useCallback((nextToken: string, value: AuthState) => {
        setLocalStorage('app-auth', nextToken);
        setToken(nextToken);
        setSession(value);
    }, []);

    const logout = useCallback(() => {
        setLocalStorage('app-auth', null);
        setLocalStorage('refresh-token', null);
        setToken(undefined);
        setSession(undefined);
    }, []);

    // A stored token the server rejects is cleared, so staff can sign in again.
    useEffect(() => {
        if (profile.isSuccess && profile.data === null) {
            logout();
        }
    }, [profile.isSuccess, profile.data, logout]);

    const checking = !!token && !session && profile.isPending;
    const state = session ?? profile.data ?? undefined;

    const value = useMemo<AuthContextValue>(() => ({
        state,
        status: checking ? 'checking' : 'ready',
        login,
        logout,
    }), [state, checking, login, logout]);

    return (
        <AuthContext.Provider value={value}>
            <RouterProvider router={router} />
        </AuthContext.Provider>
    );
}

export default App;
