'use client';

import { useGLTF } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { useFocus } from '@/context/FocusContext';

export default function Model({ highlightColor, controlsRef }) {
  const { scene, error } = useGLTF('/models/final.glb');
  const { camera } = useThree();

  const { focusConfig } = useFocus(); // ✅ NEW API

  const previousHighlight = useRef(null);

  /* -------------------------------------------------------
     🔆 MATERIAL FIX (run once)
  ------------------------------------------------------- */
  useEffect(() => {
    if (!scene) return;

    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        child.castShadow = true;
        child.receiveShadow = true;

        if ('envMapIntensity' in child.material)
          child.material.envMapIntensity = 0.25;

        if ('roughness' in child.material)
          child.material.roughness = Math.min(
            (child.material.roughness ?? 0.5) + 0.35,
            1
          );

        if ('metalness' in child.material)
          child.material.metalness = Math.max(
            (child.material.metalness ?? 0) - 0.6,
            0
          );

        child.material.needsUpdate = true;
      }
    });
  }, [scene]);

  /* -------------------------------------------------------
     🔍 DEBUG MESH NAMES
  ------------------------------------------------------- */
  useEffect(() => {
    if (!scene) return;

    console.log('🔍 GLTF Meshes:');
    scene.traverse((child) => {
      if (child.isMesh) console.log(child.name);
    });
  }, [scene]);

  /* -------------------------------------------------------
     🎯 CAMERA + FOCUS LOGIC
  ------------------------------------------------------- */
  useEffect(() => {
    if (!scene || !focusConfig || !controlsRef?.current) return;

    const { part, offset } = focusConfig;

    let targetObject = null;

    // 🔁 Reset previous highlight
    if (previousHighlight.current) {
      previousHighlight.current.material.color.set('#ffffff');
      previousHighlight.current = null;
    }

    // 🔎 Find mesh
    if (part === 'ALL') {
      targetObject = scene;
    } else {
      scene.traverse((child) => {
        if (child.isMesh && child.name === part) {
          targetObject = child;

          // highlight
          child.material = child.material.clone();
          // child.material.color.set(highlightColor || '#00ffff');
          previousHighlight.current = child;
        }
      });
    }

    if (!targetObject) {
      console.warn('❌ Focus target not found:', part);
      return;
    }

    /* ------------------ CAMERA MATH ------------------ */

    const box = new THREE.Box3().setFromObject(targetObject);
    const sphere = box.getBoundingSphere(new THREE.Sphere());

    const center = sphere.center;
    const radius = sphere.radius;

    // Default offset if not provided
    const camOffset = {
      x: offset?.x ?? 5,
      y: offset?.y ?? 2,
      z: offset?.z ?? Math.max(radius * 3, 6),
    };

    const newCameraPos = new THREE.Vector3(
      center.x + camOffset.x,
      center.y + camOffset.y,
      center.z + camOffset.z
    );

    /* ------------------ GSAP ANIMATION ------------------ */

    gsap.to(camera.position, {
      x: newCameraPos.x,
      y: newCameraPos.y,
      z: newCameraPos.z,
      duration: 1.2,
      ease: 'power3.out',
      onUpdate: () => camera.updateProjectionMatrix(),
    });

    gsap.to(controlsRef.current.target, {
      x: center.x,
      y: center.y,
      z: center.z,
      duration: 1.2,
      ease: 'power3.out',
      onUpdate: () => controlsRef.current.update(),
    });
  }, [scene, focusConfig, highlightColor]);

  if (error) return null;

  return <primitive object={scene} />;
}

useGLTF.preload('/models/final.glb');
