'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { Suspense } from 'react';
import * as THREE from 'three';
import Model from './Model';
import Loader from './Loader';


export default function Scene({ controlsRef, highlightColor }) {
  return (
    <Canvas
      shadows
      camera={{ fov: 50, position: [0, 3, 8] }}
      gl={{ antialias: true }}
      onCreated={({ gl }) => {
        gl.outputColorSpace = THREE.SRGBColorSpace;
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.physicallyCorrectLights = true;
        gl.toneMappingExposure = 0.6; // lower exposure to reduce glare
      }}
    >
      {/* 🌍 VERY SOFT ENV (fill only) */}
      <Environment preset="studio" intensity={0.08} />

      {/* 🌑 VERY LOW AMBIENT */}
      <ambientLight intensity={0.08} />

      {/* ☀️ MAIN LIGHT (reduced to avoid harsh speculars) */}
      <directionalLight
        castShadow
        position={[8, 12, 6]}
        intensity={0.5}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* ✨ SOFT FILL (subtler) */}
      <spotLight
        position={[-6, 10, 6]}
        intensity={0.12}
        angle={0.35}
        penumbra={0.7}
      />

      {/* 🎯 HIGHLIGHT ONLY (minimal) */}
      <pointLight
        position={[2, 4, 3]}
        intensity={0.06}
        distance={20}
        color={highlightColor || '#00ffff'}
      />

      <Suspense fallback={<Loader/>}>
        <Model controlsRef={controlsRef} highlightColor={highlightColor} />
      </Suspense>

      <OrbitControls ref={controlsRef} enableDamping />
    </Canvas>
  );
}
