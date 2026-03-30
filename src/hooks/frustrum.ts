import { useEffect, useState } from "react";

const FOV = 1.3;

export function useFrustumSize(distance: number) {
    const [size, setSize] = useState({ halfWidth: 0, halfHeight: 0 });

    useEffect(() => {
        function update() {
            const aspect = window.innerWidth / window.innerHeight;
            const halfHeight = distance * Math.tan(FOV / 2);
            const halfWidth = halfHeight * aspect;

            setSize({ ...{ halfWidth, halfHeight } });
        }

        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, [distance]);

    return size;
}