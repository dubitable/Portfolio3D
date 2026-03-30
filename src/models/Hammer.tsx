import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group, Mesh } from "three";
import { useLocation } from "../hooks/location";
import type { Scroll } from "../hooks/scroll";

const path = "/models/hammer.glb";

// Hammer by J-Toastie [CC-BY] (https://creativecommons.org/licenses/by/3.0/) via Poly Pizza (https://poly.pizza/m/66FnMJl5fs)
function Hammer({ scroll }: { scroll: Scroll }) {
  const { nodes, materials } = useGLTF(path);
  const ref = useRef<Group>(null!);

  const { position, rotation } = useLocation("right", [0, -0.2 * Math.PI, Math.PI * 0.1]);

  useFrame(({ clock }) => {
    if (!ref.current) return;

    ref.current.position.y = position[1] + 0.05 * Math.sin(2 * clock.getElapsedTime());
    ref.current.rotation.y = rotation[1] + 0.05 * Math.sin(clock.getElapsedTime());

    const t = Math.min(Math.abs(scroll.progress - 0.8), 0.8);
    ref.current.rotation.z = rotation[2] + t * 10;
    ref.current.position.x = position[0] + t * 20;
  })


  return (
    <>
      <group dispose={null} ref={ref} position={position} rotation={rotation} scale={2}>
        <mesh geometry={(nodes['Hammer_Cube-Mesh'] as Mesh).geometry} material={materials.Wood} />
        <mesh geometry={(nodes['Hammer_Cube-Mesh_1'] as Mesh).geometry} material={materials.Metal} />

      </group>
      <directionalLight target={ref.current ?? undefined} intensity={2} position={[0, 0, -10]} />
    </>

  )
}

useGLTF.preload(path);

export default Hammer;