import { useGLTF } from "@react-three/drei";
import { Group, Mesh } from "three";
import { useLocation } from "../hooks/location";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Scroll } from "../hooks/scroll";

const path = "/models/computer.glb";

// Simple computer by Robert Schlyter [CC-BY] (https://creativecommons.org/licenses/by/3.0/) via Poly Pizza (https://poly.pizza/m/doMMnviJrGi)
function Computer({ scroll }: { scroll: Scroll }) {
    const { nodes, materials } = useGLTF(path);
    const ref = useRef<Group>(null!);

    const { position, rotation, scale } = useLocation("right", [Math.PI, 0, Math.PI]);

    useFrame(({ clock }) => {
        if (!ref.current) return;

        ref.current.position.y = position[1] + 0.05 * Math.sin(2 * clock.getElapsedTime());
        ref.current.rotation.y = rotation[1] + 0.1 * Math.sin(clock.getElapsedTime());


        const t = Math.min(scroll.progress, 0.2);
        ref.current.rotation.x = rotation[0] + t * 10;
        ref.current.position.x = position[0] + t * 20;
    })


    return (
        <>
            <group dispose={null} position={position} rotation={rotation} scale={2.4 * scale} ref={ref}>
                <group>
                    <mesh geometry={(nodes.mesh1262710399 as Mesh).geometry} material={materials.mat17} />
                    <mesh geometry={(nodes.mesh1262710399_1 as Mesh).geometry} material={materials.mat21} />
                    <mesh geometry={(nodes.mesh1262710399_2 as Mesh).geometry} material={materials.mat15} />
                    <mesh geometry={(nodes.mesh1262710399_3 as Mesh).geometry} material={materials.mat22} />
                    <mesh geometry={(nodes.mesh1262710399_4 as Mesh).geometry} material={materials.mat9} />
                </group>
            </group>
            <directionalLight target={ref.current ?? undefined} intensity={2} position={[0, 0, 10]} />
        </>

    )
}

useGLTF.preload('/computer.glb')

export default Computer;