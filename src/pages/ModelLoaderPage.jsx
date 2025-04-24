import { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader, DRACOLoader } from 'three-stdlib';
import { OrbitControls } from 'three-stdlib';
import FileUpload from './FileUpload'; // Make sure this is styled too
import { motion } from 'framer-motion';

const ModelLoaderPage = () => {
  const [modelFile, setModelFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef(null);
  const currentModelRef = useRef(null);
  const camera = useRef(null);
  const renderer = useRef(null);
  const controls = useRef(null);

  useEffect(() => {
    if (!modelFile) return;

    const scene = new THREE.Scene();

    // Set background based on theme
    
      scene.background = new THREE.Color(0xf7f9fc);
      const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
      directionalLight.position.set(5, 5, 5).normalize();
      scene.add(directionalLight);
      scene.add(new THREE.AmbientLight(0x404040, 1.5));
      scene.add(new THREE.HemisphereLight(0xaaaaaa, 0x000000, 0.7));
    

    // Initialize Camera
    camera.current = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.current.position.z = 2;

    // Initialize Renderer
    renderer.current = new THREE.WebGLRenderer({ antialias: true });
    renderer.current.setSize(window.innerWidth, window.innerHeight);
    renderer.current.setClearColor(0xf7f9fc, 1);
    containerRef.current.innerHTML = '';
    containerRef.current.appendChild(renderer.current.domElement);

    const animate = () => {
      requestAnimationFrame(animate);
      controls.current.update();
      renderer.current.render(scene, camera.current);
    };

    // Load Model
    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath(
      'https://www.gstatic.com/draco/versioned/decoders/1.5.6/'
    );
    loader.setDRACOLoader(dracoLoader);

    const reader = new FileReader();
    reader.onload = (e) => {
      setIsLoading(true); // Start loading
      const arrayBuffer = e.target.result;
      loader.parse(arrayBuffer, '', (gltf) => {
        const model = gltf.scene;
        model.scale.set(4, 4, 4);
        scene.add(model);
        currentModelRef.current = model;
        setIsLoading(false); // Done loading
        animate();
      });
    };
    reader.readAsArrayBuffer(modelFile);

    // Set up Orbit Controls
    controls.current = new OrbitControls(camera.current, renderer.current.domElement);
    controls.current.enableDamping = true;
    controls.current.dampingFactor = 0.1;
    controls.current.screenSpacePanning = false;
    controls.current.maxPolarAngle = Math.PI;

    // Resize handling
    window.addEventListener('resize', () => {
      camera.current.aspect = window.innerWidth / window.innerHeight;
      camera.current.updateProjectionMatrix();
      renderer.current.setSize(window.innerWidth, window.innerHeight);
    });

    return () => {
      renderer.current.dispose();
    };
  }, [modelFile]);

  const handleFileUpload = (file) => {
    setModelFile(file);
  };

  const resetCamera = () => {
    camera.current.position.set(0, 0, 2);
    controls.current.target.set(0, 0, 0);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col min-h-screen bg-gradient-to-br from-white to-slate-200 text-gray-800"
    >
      {/* Upload Section */}
      <div className="relative z-10 w-full flex flex-col items-center py-10 px-6 bg-white shadow-md">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 drop-shadow-sm">
          Upload & View Your 3D Model
        </h1>
        <p className="text-gray-600 text-center max-w-xl mb-6">
          This page allows you to upload your <code className="bg-gray-100 px-1 rounded text-sm">.glb</code> model and preview it in real-time.
        </p>
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <FileUpload onFileUpload={handleFileUpload} />
        </div>
        {/* Reset Camera Button */}
        {modelFile && (
          <button
            onClick={resetCamera}
            className="mt-4 text-blue-600 text-sm hover:underline"
          >
            Reset Camera View
          </button>
        )}
      </div>

      {/* 3D Model Canvas */}
      <div ref={containerRef} className="flex-grow w-full h-full relative">
        {/* Loading Spinner */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500" />
          </div>
        )}
        {/* No model loaded message */}
        {!modelFile && !isLoading && (
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
            <p className="text-gray-400 text-lg">No model loaded. Upload a <code>.glb</code> file to begin!</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ModelLoaderPage;
