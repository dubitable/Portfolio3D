import { useEffect, useState } from 'react';

export function useMediaQuery(query: string): boolean {
    const [matches, setMatches] = useState<boolean>(() =>
        typeof window !== 'undefined'
            ? window.matchMedia(query).matches
            : false
    );

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const media = window.matchMedia(query);

        const listener = (e: MediaQueryListEvent) => {
            setMatches(e.matches);
        };

        // Set initial value (important for some browsers)
        setMatches(media.matches);

        media.addEventListener('change', listener);

        return () => {
            media.removeEventListener('change', listener);
        };
    }, [query]);

    return matches;
}