'use client';

import { useGLTF } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { useFocus } from '@/context/FocusContext';

export default function Model({ highlightColor, controlsRef }) {
  const { scene, error } = useGLTF('/models/final.glb');
  const { camera } = useThree();
  const { focusPart } = useFocus();

  /* 🔆 FIX DARK MATERIALS */
  useEffect(() => {
    if (!scene) return;

    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        child.castShadow = true;
        child.receiveShadow = true;

        // Further reduce shiny reflections to eliminate remaining glares
        if ('envMapIntensity' in child.material) child.material.envMapIntensity = 0.25;
        if ('roughness' in child.material) child.material.roughness = Math.min((child.material.roughness ?? 0.5) + 0.35, 1);
        if ('metalness' in child.material) child.material.metalness = Math.max((child.material.metalness ?? 0) - 0.6, 0);
        child.material.needsUpdate = true;
      }
    });
  }, [scene]);


  useEffect(() => {
  if (!scene) return;

  console.log('🔍 GLTF Scene Children:');

  scene.traverse((child) => {
    if (child.isMesh) {
      console.log('Mesh name:', child.name);
    }
  });
}, [scene]);

  /* 🎯 CAMERA FOCUS LOGIC */
useEffect(() => {
  if (!scene || !focusPart || !controlsRef?.current) return;

  let targetObject = null;

  if (focusPart === 'ALL') {
    targetObject = scene;
  } else {
    scene.traverse((child) => {
      if (child.isMesh && child.name === focusPart) {
        targetObject = child;

        // highlight
        child.material = child.material.clone();
        child.material.color.set(highlightColor || '#00ffff');
      }
    });
  }

  if (!targetObject) {
    console.warn('❌ Focus target not found:', focusPart);
    return;
  }

  // 🔹 Bounding sphere (BEST)
  const box = new THREE.Box3().setFromObject(targetObject);
  const sphere = box.getBoundingSphere(new THREE.Sphere());

  const center = sphere.center;
  const radius = sphere.radius;
const ZOOM_AXIS = 'z';
  // 🔹 Direction from current camera
 let direction = new THREE.Vector3(0, 0, 1);

if (ZOOM_AXIS === 'x') direction.set(1, 0, 0);
if (ZOOM_AXIS === 'y') direction.set(0, 1, 0);
if (ZOOM_AXIS === 'z') direction.set(0, 0, 1);

  // 🔹 FINAL distance (CLAMPED)
  const distance = Math.max(radius * 2.2, 1.5); // 👈 THIS IS THE KEY

  const newCameraPos = center.clone().add(direction.multiplyScalar(distance));

  // 🎥 Animate camera
  gsap.to(camera.position, {
    x: newCameraPos.x,
    y: newCameraPos.y + radius * 0.3,
    z: newCameraPos.z,
    duration: 1.2,
    ease: 'power3.out',
    onUpdate: () => camera.updateProjectionMatrix(),
  });

  // 🎯 Animate controls target
  gsap.to(controlsRef.current.target, {
    x: center.x,
    y: center.y,
    z: center.z,
    duration: 1.2,
    ease: 'power3.out',
    onUpdate: () => controlsRef.current.update(),
  });

}, [scene, focusPart, highlightColor]);

  if (error) return null;

  return <primitive object={scene} />;
}

useGLTF.preload('/models/final.glb');
