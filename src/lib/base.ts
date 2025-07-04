/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, {
    type AxiosRequestConfig,
    type AxiosResponse,
} from 'axios';

import { readLocalStorage } from '@/lib/utils';

interface BaseRequestOptions {
  url: string;
  method?: string;
  body?: any;
  options?: AxiosRequestConfig;
  signal?: AbortSignal;
  contentType?: string;
}

interface BaseRequestResponse<T = any> {
  data: T;
  ok: boolean;
  status: number;
  statusText: string;
}

const baseRequest = async ({
    url,
    method = 'GET',
    body = null,
    options = {},
    signal,
    contentType,
}: BaseRequestOptions): Promise<BaseRequestResponse> => {
    const headers: Record<string, string> = {
        Accept: 'application/json',
    };

    // Only add Authorization header if token exists
    const token = readLocalStorage('app-auth');
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    if (contentType) {
        headers['Content-Type'] = contentType;
    }

    const requestConfig: AxiosRequestConfig = {
        method: method as any,
        url: `${import.meta.env.VITE_APP_SERVER_URL}${url}`,
        headers,
        data: body,
        signal,
        ...options,
    };

    try {
        const response: AxiosResponse = await axios(requestConfig);

        return {
            data: response.data,
            ok: response.status >= 200 && response.status < 300,
            status: response.status,
            statusText: response.statusText,
        };
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            // Handle HTTP error responses
            return {
                data: error.response.data,
                ok: false,
                status: error.response.status,
                statusText: error.response.statusText,
            };
        }

        // Handle network errors or other issues
        throw error;
    }
};

export { baseRequest };
