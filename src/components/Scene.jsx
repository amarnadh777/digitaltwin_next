'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Environment } from '@react-three/drei';
import { Suspense } from 'react';
import Model from './Model';

export default function Scene({ controlsRef }) {
  return (
    <Canvas shadows camera={{ fov: 50 }}>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />

      <Suspense fallback={null}>
        <Model />
        <ContactShadows
          position={[0, -1, 0]}
          opacity={0.4}
          scale={20}
          blur={2}
          far={4.5}
        />
        <Environment preset="city" />
      </Suspense>

      {/* 🔑 CONTROLS REF CONNECTED HERE */}
 <OrbitControls
  ref={controlsRef}
  enableDamping
  minDistance={1}
  maxDistance={300}
/>
    </Canvas>
  );
}
