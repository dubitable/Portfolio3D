import { useEffect, useState } from "react";

export type Scroll = {
    scrollY: number,
    progress: number,
    maxScroll: number
};

export function useScroll(
    ref: React.RefObject<HTMLElement>
): Scroll {
    const [scrollY, setScrollY] = useState(0);
    const [progress, setProgress] = useState(0);
    const [maxScroll, setMaxScroll] = useState(0);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const update = () => {
            const scrollTop = el.scrollTop;
            const max = el.scrollHeight - el.clientHeight;
            const progress = max > 0 ? scrollTop / max : 0;

            setScrollY(scrollTop);
            setMaxScroll(max);
            setProgress(progress);
        };

        update();
        el.addEventListener("scroll", update, { passive: true });
        window.addEventListener("resize", update);

        return () => {
            el.removeEventListener("scroll", update);
            window.removeEventListener("resize", update);
        };
    }, [ref]);

    return {
        scrollY,
        progress,
        maxScroll
    };
}