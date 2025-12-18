// Model.js - Updated with error handling
'use client';

import { useGLTF } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import * as THREE from 'three';

export default function Model() {
  const { scene, error } = useGLTF('/models/van.glb');
  const { camera } = useThree();
  const [loading, setLoading] = useState(true);
useEffect(() => {
  if (!scene || error) return;

  const box = new THREE.Box3().setFromObject(scene);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());

  // Center model
  scene.position.sub(center);

  const maxDim = Math.max(size.x, size.y, size.z);
  const fov = camera.fov * (Math.PI / 180);

  // Correct distance calculation
  let cameraZ = maxDim / Math.tan(fov / 2);

  cameraZ *= 1.5; // ✅ sweet spot (1.3–1.8)

  camera.position.set(0, maxDim * 0.5, cameraZ);
  camera.lookAt(0, 0, 0);
  camera.updateProjectionMatrix();
}, [scene, camera, error]);


  if (error) {
    console.log('Model error:', error);
    return null;
  }

  return <primitive object={scene} />;
}

useGLTF.preload('/models/van.glb');