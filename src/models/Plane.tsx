import { useGLTF } from '@react-three/drei'
import type { Group, Mesh } from 'three';
import type { Scroll } from '../hooks/scroll';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { useLocation } from '../hooks/location';

const path = "/models/plane.glb";

// Airplane by Poly by Google [CC-BY] (https://creativecommons.org/licenses/by/3.0/) via Poly Pizza (https://poly.pizza/m/a3XrQkLNna9)
function Plane({ scroll }: { scroll: Scroll }) {
  const { nodes, materials } = useGLTF(path);
  const ref = useRef<Group>(null!);

  const { position, rotation, scale } = useLocation("right", [0, -Math.PI * 0.2, Math.PI * 0.1]);

  useFrame(({ clock }) => {
    if (!ref.current) return;

    ref.current.position.y = position[1] + 0.05 * Math.sin(2 * clock.getElapsedTime());
    ref.current.rotation.y = rotation[1] + 0.1 * Math.sin(clock.getElapsedTime());

    const t = Math.min(Math.abs(scroll.progress - 0.5), 0.5);
    ref.current.rotation.z = rotation[2] + t * 50;
    ref.current.position.x = position[0] + t * 20;
  })

  return (
    <group dispose={null} ref={ref} position={position} rotation={rotation} scale={0.015 * scale}>
      <mesh geometry={(nodes.Plane as Mesh).geometry} material={materials.Mat} />
      <directionalLight target={ref.current ?? undefined} intensity={2} position={[0, 0, -10]} />
    </group>
  )
}

useGLTF.preload(path);

export default Plane;
