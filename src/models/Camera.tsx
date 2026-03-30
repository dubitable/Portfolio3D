import { useGLTF } from '@react-three/drei'
import type { Group, Mesh } from 'three';
import type { Scroll } from '../hooks/scroll';
import { useLocation } from '../hooks/location';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

const path = "/models/camera.glb";

// Camera by Kai Fan [CC-BY] (https://creativecommons.org/licenses/by/3.0/) via Poly Pizza (https://poly.pizza/m/1pI-40LVzWX)
function VideoCamera({ scroll }: { scroll: Scroll }) {
  const { nodes, materials } = useGLTF(path);
  const ref = useRef<Group>(null!);

  const { position, rotation } = useLocation("left", [0, 0.8 * Math.PI, 0]);

  useFrame(({ clock }) => {
    if (!ref.current) return;

    ref.current.position.y = position[1] + 0.05 * Math.sin(2 * clock.getElapsedTime());
    ref.current.rotation.y = rotation[1] + 0.1 * Math.sin(clock.getElapsedTime());

    const t = Math.min(Math.abs(scroll.progress - 0.2), 0.2);
    ref.current.rotation.x = rotation[0] + t * 10;
    ref.current.position.x = position[0] - t * 20;
  })

  return (
    <>
      <group dispose={null} position={position} rotation={rotation} scale={0.004} ref={ref}>
        <group>
          <mesh geometry={(nodes['camera-Mesh'] as Mesh).geometry} material={materials['Plastic Green - Med Roughness']} />
          <mesh geometry={(nodes['camera-Mesh_1'] as Mesh).geometry} material={materials['Plastic Green - Med Roughness_1']} />
          <mesh geometry={(nodes['camera-Mesh_2'] as Mesh).geometry} material={materials['Plastic Green - Med Roughness_2']} />
        </group>
      </group>
      <directionalLight target={ref.current ?? undefined} intensity={2} position={[0, 0, -10]} />
    </>

  )
}

useGLTF.preload(path)

export default VideoCamera;
