import {
    useEffect,
    useRef,
    useState,
} from 'react';

/** True once the element has entered the viewport. Never flips back. */
export function useInView<T extends Element>(rootMargin = '0px 0px -10% 0px') {
    const ref = useRef<T>(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const node = ref.current;
        if (!node || inView) {
            return undefined;
        }
        if (typeof IntersectionObserver === 'undefined') {
            setInView(true);
            return undefined;
        }
        const observer = new IntersectionObserver((entries) => {
            const visible = entries.some((entry) => entry.isIntersecting);
            if (visible) {
                setInView(true);
                observer.disconnect();
            }
        }, { rootMargin });
        observer.observe(node);
        return () => observer.disconnect();
    }, [inView, rootMargin]);

    return { ref, inView };
}
