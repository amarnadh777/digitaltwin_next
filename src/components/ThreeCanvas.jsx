'use client';
import dynamic from 'next/dynamic';

const Scene = dynamic(() => import('./Scene'), { ssr: false });

export default function ThreeCanvas() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none', // 🔑 REQUIRED
        background: 'radial-gradient(circle, #202025 0%, #111 100%)'
      }}
    >
      <Scene />
    </div>
  );
}
