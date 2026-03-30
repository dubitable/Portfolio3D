import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group, Mesh } from "three";
import { useLocation } from "../hooks/location";
import type { Scroll } from "../hooks/scroll";

const path = "/models/sign.glb";

// Hammer by J-Toastie [CC-BY] (https://creativecommons.org/licenses/by/3.0/) via Poly Pizza (https://poly.pizza/m/66FnMJl5fs)
function Sign({ scroll }: { scroll: Scroll }) {
  const { nodes, materials } = useGLTF(path);
  const ref = useRef<Group>(null!);

  const { position, rotation } = useLocation("left", [-Math.PI * 0.5, 0, 0], 0.1);

  useFrame(({ clock }) => {
    if (!ref.current) return;

    ref.current.position.y = position[1] + 0.05 * Math.sin(2 * clock.getElapsedTime());
    ref.current.rotation.y = rotation[1] + 0.05 * Math.sin(clock.getElapsedTime());

    const t = Math.min(Math.abs(scroll.progress - 1), 1);
    ref.current.rotation.z = rotation[2] + t * 10;
    ref.current.position.x = position[0] - t * 20;
  })

  return (
    <>
      <group dispose={null} ref={ref} position={position} rotation={rotation} scale={20}>
        <group>
          <mesh geometry={(nodes.Cylinder_1 as Mesh).geometry} material={materials['Material.001']} />
          <mesh geometry={(nodes.Cylinder_2 as Mesh).geometry} material={materials['Material.002']} />
        </group>
      </group >
      <directionalLight target={ref.current ?? undefined} intensity={5} position={[0, 0, 10]} />
    </>

  )
}

useGLTF.preload(path);

export default Sign;
