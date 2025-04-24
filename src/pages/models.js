// pages/model.js
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ModelPage = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    const loader = new THREE.GLTFLoader(); // Loader for GLB files

    loader.load(
      '/path/to/your/model.glb', // Replace with your GLB model path
      (gltf) => {
        scene.add(gltf.scene);
        gltf.scene.scale.set(2, 2, 2); // Scale if needed
      },
      undefined,
      (error) => {
        console.error(error);
      }
    );

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      renderer.dispose(); // Clean up when component unmounts
    };
  }, []);

  return <div ref={containerRef} />;
};

export default ModelPage;
