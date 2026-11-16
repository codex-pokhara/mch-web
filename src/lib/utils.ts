import {
    type ClassValue,
    clsx,
} from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/** Reads a value written by setLocalStorage. Blocked storage or bad data reads as empty. */
export function readLocalStorage(key: string): string | undefined {
    try {
        const raw = localStorage.getItem(key);
        if (raw === null) {
            return undefined;
        }
        return JSON.parse(raw)?.item ?? undefined;
    } catch {
        return undefined;
    }
}

export function setLocalStorage(key: string, value: string | null | undefined) {
    try {
        if (value === null || value === undefined) {
            localStorage.removeItem(key);
            return;
        }
        localStorage.setItem(key, JSON.stringify({ item: value }));
    } catch {
        // Private mode or blocked storage: the session simply does not persist.
    }
}
