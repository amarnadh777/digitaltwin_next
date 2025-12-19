'use client';

import dynamic from 'next/dynamic';
import { useRef } from 'react';

const Scene = dynamic(() => import('./Scene'), { ssr: false });

export default function ThreeCanvas({ highlightColor }) {
  const controlsRef = useRef(null);


 
  return (
    <div
      className="absolute inset-0"
      style={{
        background: 'radial-gradient(circle, #202025 0%, #111 100%)',
        pointerEvents: 'auto',
        zIndex: 0
      }}
    >
      <Scene controlsRef={controlsRef}  highlightColor={highlightColor} />
    </div>
  );
}
