import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';
import { Toaster } from 'sonner';

import App from './App/App';

const queryClient = new QueryClient();

const webappRootId = 'root';
const webappRootElement = document.getElementById(webappRootId);
if (webappRootElement === undefined || webappRootElement === null) {
    // eslint-disable-next-line no-console
    console.error(`Could not find html element with id '${webappRootId}'`);
} else {
    ReactDOM.createRoot(webappRootElement).render(
        <React.StrictMode>
            <QueryClientProvider client={queryClient}>
                <App />
                <Toaster />
            </QueryClientProvider>
        </React.StrictMode>,
    );
}
