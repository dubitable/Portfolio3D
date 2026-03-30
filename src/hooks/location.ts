import { useThree } from "@react-three/fiber";
import { useFrustumSize } from "./frustrum";
import { useMediaQuery } from "./media";

export function useLocation(side: "left" | "right", initialRotation: [number, number, number], offset = 0.25) {
    const { camera } = useThree();
    const { halfHeight, halfWidth } = useFrustumSize(camera.position.z);

    const isMobile = useMediaQuery("(max-width: 768px)");

    if (!isMobile) {
        const positionXOffset = (side == "right" ? 1 : -1) * halfWidth * 0.5;
        const position = [positionXOffset, 0, 0] as const;

        const rotationYOffset = (side == "right" ? 1 : -1) * offset * Math.PI;
        const rotation = [initialRotation[0], initialRotation[1] + rotationYOffset, initialRotation[2]] as const;

        return { position, rotation };
    }

    const positionYOffset = halfHeight * 0.4;
    const position = [0, positionYOffset, 0] as const;

    const rotationXOffset = Math.PI * 0.1;
    const rotation = [initialRotation[0] + rotationXOffset, initialRotation[1], initialRotation[2]] as const;

    return { position, rotation };
}