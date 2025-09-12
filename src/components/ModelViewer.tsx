import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useFBX, Environment, PerspectiveCamera } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

interface ModelProps {
  modelPath: string;
}

// Model component
function MonopolyGuy({ modelPath }: ModelProps) {
  const group = useRef<THREE.Group>(null);
  const fbx = useFBX(modelPath);
  const mixer = useRef<THREE.AnimationMixer | null>(null);
  
  // Set up model materials and animations
  useEffect(() => {
    if (fbx) {
      // Apply shadows
      fbx.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          (child as THREE.Mesh).castShadow = true;
          (child as THREE.Mesh).receiveShadow = true;
        }
      });

      // Set up animations if they exist
      if (fbx.animations && fbx.animations.length > 0) {
        mixer.current = new THREE.AnimationMixer(fbx);
        
        // Play all animations
        fbx.animations.forEach((clip) => {
          const action = mixer.current!.clipAction(clip);
          action.play();
        });
      }
    }

    // Cleanup function
    return () => {
      if (mixer.current) {
        mixer.current.stopAllAction();
        mixer.current = null;
      }
    };
  }, [fbx]);

  // Update animation mixer - removed unused 'state' parameter
  useFrame((_, delta) => {
    if (mixer.current) {
      mixer.current.update(delta);
    }
  });

  return (
    <group
      ref={group}
      dispose={null}
      position={[0, -0.2, 0]}
      scale={0.2}
    >
      <primitive object={fbx} />
    </group>
  );
}

// Custom camera component with positioned field of view
function CustomCamera() {
  return (
    <PerspectiveCamera
      makeDefault
      position={[0.09, -0.5, 0.8]}
      fov={30}
      near={0.1}
      far={100}
    />
  );
}

// Fallback component
const LoadingFallback: React.FC = () => (
  <mesh position={[0, 0, 0]}>
    <boxGeometry args={[0.5, 0.5, 0.5]} />
    <meshStandardMaterial color="hotpink" wireframe opacity={0.6} transparent />
  </mesh>
);

// Main model viewer component
const ModelViewer: React.FC = () => {
  const modelPath = "/models/mono.fbx"; // Changed to .fbx extension
  
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: 'spring',
        stiffness: 30,    // less stiff = slower spring motion
        damping: 14,      // more damping = smoother end
        duration: 1.5     // longer duration for fade-in
      }}
      className="fixed bottom-0 right-0 md:right-6 w-48 h-48 md:w-64 md:h-80 lg:w-50 lg:h-50 z-10"
    >
      <Canvas
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
      >
        <CustomCamera />
        <ambientLight intensity={0.7} />
        <spotLight
          position={[-5, -10, -7]}
          angle={0.15}
          penumbra={1}
          intensity={1.5}
          castShadow
        />
        <Suspense fallback={<LoadingFallback />}>
          <MonopolyGuy modelPath={modelPath} />
          <Environment preset="city" />
        </Suspense>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.8}
          rotateSpeed={0.4}
          autoRotate={false}
        />
      </Canvas>
    </motion.div>
  );
};

export default ModelViewer;