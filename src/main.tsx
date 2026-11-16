import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';
import { Toaster } from 'sonner';

import App from './App/App';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000,
            retry: 1,
            refetchOnWindowFocus: false,
        },
    },
});

const rootElement = document.getElementById('root');

if (rootElement) {
    ReactDOM.createRoot(rootElement).render(
        <React.StrictMode>
            <QueryClientProvider client={queryClient}>
                <App />
                <Toaster
                    position="bottom-center"
                    toastOptions={{
                        style: {
                            background: 'var(--ink)',
                            color: 'var(--sheet)',
                            border: 'none',
                            borderRadius: '3px',
                            fontFamily: 'Archivo, sans-serif',
                        },
                    }}
                />
            </QueryClientProvider>
        </React.StrictMode>,
    );
}
