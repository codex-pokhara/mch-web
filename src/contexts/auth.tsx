import { createContext } from 'react';

export interface AuthState {
    id: number | string;
    name: string;
}

export interface AuthContextValue {
    state: AuthState | undefined;
    /** 'checking' while a stored token is being verified, so guards do not redirect too early. */
    status: 'checking' | 'ready';
    login: (token: string, value: AuthState) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextValue>({
    state: undefined,
    status: 'ready',
    login: () => undefined,
    logout: () => undefined,
});

export default AuthContext;
