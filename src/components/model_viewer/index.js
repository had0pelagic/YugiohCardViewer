import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, softShadows } from "@react-three/drei";
import Model from "./model";
import CardBackside from "../../files/images/card_backside.png";

export default function ModelViewer({ image }) {
  return (
    <Canvas camera={{ fov: 60, zoom: 1.8, position: [5, 0.5, 0] }} shadows>
      {softShadows()}
      <ambientLight intensity={1} />
      <directionalLight
        position={[0, 10, 0]}
        castShadow
        intensity={0.9}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <pointLight position={[-10, 0, -20]} intensity={0.5} />

      <OrbitControls />

      <group>
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -1, 0]}
          receiveShadow
        >
          <planeBufferGeometry attach="geometry" args={[100, 100]} />
          <shadowMaterial attach="material" />
        </mesh>
      </group>

      <Model
        image={CardBackside}
        position={[0, 0, 0]}
        scale={[1, 1, 0.005]}
        card_geometry={[1.2, 2.1, 1.2]}
      />
      <Model
        image={image}
        position={[0, 0, 0.006]}
        scale={[1, 1, 0.005]}
        card_geometry={[1.2, 2.1, 1.2]}
      />
    </Canvas>
  );
}
