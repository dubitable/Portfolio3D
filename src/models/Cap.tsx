import { useRef } from 'react';
import type { Group, Mesh } from 'three';
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';
import { useLocation } from '../hooks/location';
import type { Scroll } from '../hooks/scroll';

const path = "/models/cap.glb";

// Graduation cap by Poly by Google [CC-BY] (https://creativecommons.org/licenses/by/3.0/) via Poly Pizza (https://poly.pizza/m/4v0sRFH6PN9)
function Cap({ scroll }: { scroll: Scroll }) {
  const { nodes, materials } = useGLTF(path);
  const ref = useRef<Group>(null!);

  const { position, rotation, scale } = useLocation("left", [0.1 * Math.PI, 0.2 * Math.PI, 0.2 * Math.PI]);

  useFrame(({ clock }) => {
    if (!ref.current) return;

    ref.current.position.y = position[1] + 0.05 * Math.sin(2 * clock.getElapsedTime());
    ref.current.rotation.y = rotation[1] + 0.1 * Math.sin(clock.getElapsedTime());

    const t = Math.min(Math.abs(scroll.progress - 0.25), 0.25);
    ref.current.rotation.x = rotation[0] + t * 10;
    ref.current.position.x = position[0] - t * 20;
  })

  return (
    <group dispose={null} ref={ref} position={position} rotation={rotation} scale={0.8 * scale}>
      <mesh geometry={(nodes.Cube025_Cube043 as Mesh).geometry} material={materials['Material.007']} />
      <directionalLight target={ref.current ?? undefined} intensity={2} position={[0, 0, -10]} />
    </group>
  )
}

useGLTF.preload(path);

export default Cap;
