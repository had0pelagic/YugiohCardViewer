import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { DoubleSide } from "three";

export default function Model({ image, position, scale, card_geometry }) {
  const ref = useRef();
  const texture = useTexture(image);
  useFrame(() => (ref.current.rotation.y += 0.001));

  return (
    <>
      <group ref={ref}>
        <mesh position={position} castShadow axis={[0, 0, 0]} scale={scale}>
          <boxBufferGeometry args={card_geometry} />
          <meshStandardMaterial
            attach="material"
            map={texture}
            side={DoubleSide}
          />
        </mesh>
      </group>
    </>
  );
}
