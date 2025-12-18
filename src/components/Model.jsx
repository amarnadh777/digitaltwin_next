'use client';
import { useGLTF } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import * as THREE from 'three';

export default function Model() {
  const { scene } = useGLTF('/models/jcb.glb');
  const { camera } = useThree();

  useEffect(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    // Center model at origin
    scene.position.sub(center);

    const maxDim = Math.max(size.x, size.y, size.z);
    const fov = camera.fov * (Math.PI / 180);
    let cameraZ = Math.abs(maxDim / Math.tan(fov / 2));

    cameraZ *= 1.8; // Buffer to see the whole building
    camera.position.set(maxDim, maxDim, cameraZ);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
  }, [scene, camera]);

  return <primitive object={scene} />;
}

useGLTF.preload('/models/jcb.glb');