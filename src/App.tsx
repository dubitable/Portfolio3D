import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls, useTexture } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import { useScroll } from './hooks/scroll';
import * as THREE from "three";

import Computer from './models/Computer';

import "./App.css"
import VideoCamera from './models/Camera';
import Cap from './models/Cap';
import Plane from './models/Plane';
import Hammer from './models/Hammer';
import Sign from './models/Sign';


function Background() {
  const texture = useTexture("/texture/space.jpg");
  const { scene } = useThree();

  useEffect(() => {
    scene.background = texture
  }, [scene, texture])


  return null;
}

function App() {
  const textRef = useRef<HTMLDivElement>(null!);
  const scroll = useScroll(textRef);

  return (
    <>
      <div id="canvas">
        <Canvas
          camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 0, 2] }}
          gl={{
            outputColorSpace: THREE.LinearSRGBColorSpace,
            toneMapping: THREE.NoToneMapping,
          }}
          flat>
          <Background />
          <ambientLight color={0xffffff} intensity={0.25} />

          <Computer scroll={scroll} />
          <VideoCamera scroll={scroll} />
          <Cap scroll={scroll} />
          <Plane scroll={scroll} />
          <Hammer scroll={scroll} />
          <Sign scroll={scroll} />

          <OrbitControls />
        </Canvas>
      </div>
      <div id="text" ref={textRef}>

        <section>
          <div id="intro" className="container">
            <div className="panel panel-text">
              <div className="show">
                <h1> Pierre Quereuil</h1>
              </div>
            </div>
            <div className="panel panel-empty"></div>
          </div>
        </section>

        <section id="about">
          <div className="container">
            <div className="panel panel-empty"></div>
            <div className="panel panel-text">
              <div className="show">
                <h3> About Me</h3>
              </div>
            </div>
          </div>
        </section>

        <section id="education">
          <div className="container">
            <div className="panel panel-text">
              <div className="show">
                <h3> Education </h3>
              </div>
            </div>
            <div className="panel panel-empty"></div>
          </div>
        </section>

        <section id="experience">
          <div className="container">
            <div className="panel panel-empty"></div>
            <div className="panel panel-text">
              <div className="show">
                <h3> Professional Experience </h3>
              </div>
            </div>
          </div>
        </section>

        <section id="projects">
          <div className="container">
            <div className="panel panel-text">
              <div className="show">
                <h3> Projects </h3>
              </div>
            </div>
            <div className="panel panel-empty"></div>
          </div>
        </section>

        <section id="links">
          <div className="container">
            <div className="panel panel-empty"></div>
            <div className="panel panel-text">
              <div className="show">
                <h3> Quick Links </h3>
              </div>
            </div>
          </div>
        </section>

      </div>
    </>

  )
}

export default App;