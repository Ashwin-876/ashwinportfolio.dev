import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

export default function ThreeAirplane() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // 1. Setup Scene, Camera, Renderer
    const width = container.clientWidth || 80;
    const height = container.clientHeight || 80;

    const scene = new THREE.Scene();
    
    // Perspective Camera focusing on center
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 5);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.2));

    // 2. Add Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 0.9);
    dirLight1.position.set(5, 5, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xffffff, 0.4);
    dirLight2.position.set(-5, 3, -5);
    scene.add(dirLight2);

    // 3. Load OBJ Model directly (bypassing MTLLoader for zero-dependency visual styling)
    let airplaneGroup = new THREE.Group();
    scene.add(airplaneGroup);

    const objLoader = new OBJLoader();
    objLoader.setPath('/models/airplane/');
    objLoader.load(
      '11804_Airplane_v2_l2.obj',
      (object) => {
        // Add object to group first and force matrix updates so Box3 works correctly
        airplaneGroup.add(object);
        airplaneGroup.updateMatrixWorld(true);
        object.updateMatrixWorld(true);

        // Auto scale and center the model
        const box = new THREE.Box3().setFromObject(object);
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        
        if (maxDim > 0) {
          // Scale it to fit the 80px container
          const scale = 2.8 / maxDim;
          object.scale.set(scale, scale, scale);

          // Center the pivot point
          const center = box.getCenter(new THREE.Vector3());
          object.position.x = -center.x * scale;
          object.position.y = -center.y * scale;
          object.position.z = -center.z * scale;
        }

        // Rotate the plane from Z-up/Y-forward (exporter style) to Y-up/Z-forward (Three.js style)
        airplaneGroup.rotation.x = -Math.PI / 2; // Lay flat
        airplaneGroup.rotation.y = Math.PI; // Face forward
        airplaneGroup.rotation.z = 0;

        // Premium styling (Platinum-Chrome body and Ice-Blue glass)
        const bodyMaterial = new THREE.MeshStandardMaterial({
          color: 0xcccccc,      // Matte platinum silver
          metalness: 0.85,      // Shiny metallic reflection
          roughness: 0.15,      // Polished metal texture
          flatShading: false
        });

        const glassMaterial = new THREE.MeshStandardMaterial({
          color: 0x4f7cff,      // Brand accent blue glass
          metalness: 0.9,
          roughness: 0.05,
          transparent: true,
          opacity: 0.65,         // Transparent windows
          side: THREE.DoubleSide
        });

        object.traverse((child) => {
          if (child.isMesh) {
            const nameLower = child.name.toLowerCase();
            if (nameLower.includes('glass')) {
              child.material = glassMaterial;
            } else {
              child.material = bodyMaterial;
            }
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        camera.lookAt(0, 0, 0); // Explicitly look at center
        setLoading(false);
      },
      (xhr) => {
        // Progress tracking
      },
      (err) => {
        console.error('An error happened loading the OBJ model:', err);
        setError('Failed to parse 3D mesh');
        setLoading(false);
      }
    );

    // 4. Animation & Render loop
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Handle container size dynamic recalculations
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w > 0 && h > 0 && (renderer.domElement.width !== w || renderer.domElement.height !== h)) {
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      }

      const elapsedTime = clock.getElapsedTime();

      // Gentle realistic flying wiggles applied to the inner mesh child (keeps base layout alignment)
      if (airplaneGroup.children.length > 0) {
        const mesh = airplaneGroup.children[0];
        mesh.rotation.z = Math.sin(elapsedTime * 2.2) * 0.06; // Roll wobble
        mesh.rotation.x = Math.cos(elapsedTime * 1.6) * 0.04; // Pitch wobble
        mesh.rotation.y = Math.sin(elapsedTime * 0.8) * 0.08; // Yaw wobble
      }

      renderer.render(scene, camera);
    };

    animate();

    // 5. Handle resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      scene.clear();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full relative flex items-center justify-center"
      style={{ minWidth: '80px', minHeight: '80px' }}
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-[#4F7CFF] border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center text-[8px] text-red-500 font-mono">
          3D ERR
        </div>
      )}
    </div>
  );
}
