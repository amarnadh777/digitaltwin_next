'use client';

import { useGLTF } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import * as THREE from 'three';

export default function Model({ highlightColor }) {
  const { scene, error } = useGLTF('/models/bike.glb');
  const { camera } = useThree();

  useEffect(() => {
    if (!scene || error) return;

    // Camera fit (run once, but safe to keep here)
    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    scene.position.sub(center);

    const maxDim = Math.max(size.x, size.y, size.z);
    const fov = camera.fov * (Math.PI / 180);
    let cameraZ = maxDim / Math.tan(fov / 2);

    cameraZ *= 1.5;

    camera.position.set(0, maxDim * 0.5, cameraZ);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();

    // 🔑 APPLY COLOR FROM PARAM
    scene.traverse((child) => {
      if (child.isMesh && child.name === 'Object_2') {
        child.material = child.material.clone();
        child.material.color.set(highlightColor);
      }
    });

    console.log('Applied highlight color:', highlightColor);
  }, [scene, camera, error, highlightColor]); // 🔴 highlightColor added

  if (error) return null;

  return <primitive object={scene} />;
}

useGLTF.preload('/models/bike.glb');
9