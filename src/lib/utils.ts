import {
    type ClassValue,
    clsx,
} from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function readLocalStorage(key: string): string | undefined {
    const mem = localStorage.getItem(key);
    if (mem === undefined || mem === null) {
        return undefined;
    }
    return JSON.parse(mem)?.item ?? undefined;
}
export function setLocalStorage(key: string, value: string | null | undefined) {
    localStorage.setItem(key, JSON.stringify({ item: value ?? null }));
}
export function clearLocalStorage(key: string) {
    setLocalStorage(key, null);
}
