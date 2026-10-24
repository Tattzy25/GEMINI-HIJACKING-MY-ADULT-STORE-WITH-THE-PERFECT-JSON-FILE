import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import type { Product } from '../types';

interface ThreeDProductViewerProps {
  product: Product;
  activeHapticMode?: string;
  isHapticActive?: boolean;
}

export const ThreeDProductViewer: React.FC<ThreeDProductViewerProps> = ({
  product,
  activeHapticMode = 'Harmonic Resonance',
  isHapticActive = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [thermalMode, setThermalMode] = useState<boolean>(false);
  const [explodedView, setExplodedView] = useState<boolean>(false);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);

  // Store mutable state in refs for Three.js render loop without remounting
  const stateRef = useRef({
    thermalMode: false,
    explodedView: false,
    autoRotate: true,
    isHapticActive: false,
    activeHapticMode: 'Harmonic Resonance',
  });

  useEffect(() => {
    stateRef.current.thermalMode = thermalMode;
    stateRef.current.explodedView = explodedView;
    stateRef.current.autoRotate = autoRotate;
    stateRef.current.isHapticActive = isHapticActive;
    stateRef.current.activeHapticMode = activeHapticMode;
  }, [thermalMode, explodedView, autoRotate, isHapticActive, activeHapticMode]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Detect headless environment for lightweight rendering
    const isHeadless =
      typeof navigator !== 'undefined' &&
      (Boolean((navigator as { webdriver?: boolean }).webdriver) ||
        /HeadlessChrome/i.test(navigator.userAgent));

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    // Scene & Camera
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0c0c0e);

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0.5, 4.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isHeadless,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isHeadless ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(3, 4, 3);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xf43f5e, 1.8);
    rimLight.position.set(-3, -2, -2);
    scene.add(rimLight);

    const cyanFillLight = new THREE.DirectionalLight(0x38bdf8, 1.2);
    cyanFillLight.position.set(2, -3, 2);
    scene.add(cyanFillLight);

    // Root Group
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Build Product Geometry depending on geometryType
    const spec = product.model3D || {
      geometryType: 'wand' as const,
      primaryColor: '#18181b',
      accentColor: '#e11d48',
      roughness: 0.35,
      metalness: 0.65,
      motorNodes: [{ x: 0, y: 1.2, z: 0, label: 'Resonant Core', maxRpm: 12000 }],
      thermalZones: [{ name: 'Silicone Tip', targetTempC: 38 }],
    };
    const baseColor = new THREE.Color(spec.primaryColor);
    const accentColor = new THREE.Color(spec.accentColor);

    const mainMat = new THREE.MeshStandardMaterial({
      color: baseColor,
      roughness: spec.roughness,
      metalness: spec.metalness,
    });

    const accentMat = new THREE.MeshStandardMaterial({
      color: accentColor,
      roughness: 0.15,
      metalness: 0.9,
    });

    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });

    const bodyParts: THREE.Object3D[] = [];

    if (spec.geometryType === 'wand') {
      // Main ergonomic shaft
      const shaftGeo = new THREE.CylinderGeometry(0.24, 0.32, 2.2, 32, 16);
      const shaftMesh = new THREE.Mesh(shaftGeo, mainMat);
      shaftMesh.position.y = -0.3;
      rootGroup.add(shaftMesh);
      bodyParts.push(shaftMesh);

      // Ergonomic soft head
      const headGeo = new THREE.SphereGeometry(0.52, 32, 24);
      headGeo.scale(1, 1.2, 1);
      const headMesh = new THREE.Mesh(headGeo, accentMat);
      headMesh.position.y = 1.1;
      rootGroup.add(headMesh);
      bodyParts.push(headMesh);

      // Titanium collar ring
      const ringGeo = new THREE.TorusGeometry(0.34, 0.05, 16, 32);
      ringGeo.rotateX(Math.PI / 2);
      const ringMesh = new THREE.Mesh(ringGeo, accentMat);
      ringMesh.position.y = 0.65;
      rootGroup.add(ringMesh);

      // Base cap
      const baseGeo = new THREE.CylinderGeometry(0.32, 0.28, 0.2, 32);
      const baseMesh = new THREE.Mesh(baseGeo, accentMat);
      baseMesh.position.y = -1.45;
      rootGroup.add(baseMesh);
    } else if (spec.geometryType === 'ring') {
      // Sculptural Torus Ring
      const ringGeo = new THREE.TorusGeometry(0.85, 0.28, 24, 48);
      const ringMesh = new THREE.Mesh(ringGeo, mainMat);
      rootGroup.add(ringMesh);
      bodyParts.push(ringMesh);

      // Accent sensory node
      const nodeGeo = new THREE.SphereGeometry(0.4, 24, 24);
      nodeGeo.scale(1.2, 0.8, 1);
      const nodeMesh = new THREE.Mesh(nodeGeo, accentMat);
      nodeMesh.position.set(0, 0.88, 0);
      rootGroup.add(nodeMesh);
      bodyParts.push(nodeMesh);
    } else if (spec.geometryType === 'sculpture') {
      // Curved anatomically contoured form
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, -1.2, 0),
        new THREE.Vector3(0.3, -0.4, 0.1),
        new THREE.Vector3(-0.2, 0.5, 0),
        new THREE.Vector3(0.4, 1.2, -0.2),
      ]);
      const tubeGeo = new THREE.TubeGeometry(curve, 40, 0.35, 24, false);
      const tubeMesh = new THREE.Mesh(tubeGeo, mainMat);
      rootGroup.add(tubeMesh);
      bodyParts.push(tubeMesh);

      const bulbGeo = new THREE.SphereGeometry(0.48, 32, 24);
      const bulbMesh = new THREE.Mesh(bulbGeo, accentMat);
      bulbMesh.position.set(0.4, 1.2, -0.2);
      rootGroup.add(bulbMesh);
      bodyParts.push(bulbMesh);
    } else {
      // Pod shape
      const podGeo = new THREE.CapsuleGeometry(0.48, 1.2, 16, 32);
      const podMesh = new THREE.Mesh(podGeo, mainMat);
      rootGroup.add(podMesh);
      bodyParts.push(podMesh);

      const bandGeo = new THREE.TorusGeometry(0.5, 0.04, 16, 32);
      bandGeo.rotateX(Math.PI / 2);
      const bandMesh = new THREE.Mesh(bandGeo, accentMat);
      rootGroup.add(bandMesh);
    }

    // Holographic Wireframe Ghost (for exploded view)
    const ghostGroup = new THREE.Group();
    spec.motorNodes.forEach((node: any) => {
      const motorGeo = new THREE.SphereGeometry(0.18, 16, 12);
      const motorMesh = new THREE.Mesh(motorGeo, wireMat);
      motorMesh.position.set(node.x, node.y, node.z);
      ghostGroup.add(motorMesh);

      // Center glowing core
      const coreGeo = new THREE.SphereGeometry(0.08, 8, 8);
      const coreMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
      const core = new THREE.Mesh(coreGeo, coreMat);
      core.position.set(node.x, node.y, node.z);
      ghostGroup.add(core);
    });
    ghostGroup.visible = false;
    rootGroup.add(ghostGroup);

    // Subtle Ground Shadow Disc
    const groundGeo = new THREE.CircleGeometry(1.6, 32);
    groundGeo.rotateX(-Math.PI / 2);
    const groundMat = new THREE.MeshBasicMaterial({
      color: 0x050507,
      transparent: true,
      opacity: 0.6,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.position.y = -1.6;
    scene.add(ground);

    // Mouse drag interaction
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      rootGroup.rotation.y += deltaX * 0.008;
      rootGroup.rotation.x += deltaY * 0.008;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Render loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      const { thermalMode: isThermal, explodedView: isExploded, autoRotate: isAutoRot, isHapticActive: hapticOn } =
        stateRef.current;

      // Auto rotation when idle
      if (isAutoRot && !isDragging) {
        rootGroup.rotation.y += 0.006;
      }

      // Haptic Vibration oscillation
      if (hapticOn) {
        const vibrationFreq = 45;
        const vibrationAmp = 0.015;
        rootGroup.position.x = Math.sin(elapsedTime * vibrationFreq) * vibrationAmp;
        rootGroup.position.z = Math.cos(elapsedTime * (vibrationFreq * 0.8)) * vibrationAmp;
      } else {
        rootGroup.position.x = 0;
        rootGroup.position.z = 0;
      }

      // Thermal Heatmap Visualizer
      if (isThermal) {
        const thermalPulse = (Math.sin(elapsedTime * 2) + 1) * 0.5;
        accentMat.color.setRGB(0.95 + thermalPulse * 0.05, 0.2 + thermalPulse * 0.3, 0.2);
        mainMat.color.setRGB(0.1 + thermalPulse * 0.15, 0.08, 0.18 + thermalPulse * 0.1);
      } else {
        accentMat.color.copy(accentColor);
        mainMat.color.copy(baseColor);
      }

      // Exploded / Internal Motor Nodes View
      ghostGroup.visible = isExploded;
      wireMat.opacity = isExploded ? 0.6 : 0;
      if (isExploded) {
        mainMat.wireframe = true;
        mainMat.opacity = 0.4;
        mainMat.transparent = true;
      } else {
        mainMat.wireframe = false;
        mainMat.opacity = 1;
        mainMat.transparent = false;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      domElement.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [product]);

  return (
    <div className="relative w-full h-[380px] md:h-[460px] bg-neutral-950 rounded-2xl overflow-hidden border border-neutral-800/80 shadow-2xl flex flex-col">
      {/* 3D Canvas Container */}
      <div
        ref={containerRef}
        className="w-full flex-1 cursor-grab active:cursor-grabbing relative"
        aria-label={`Interactive 3D model of ${product.name}. Drag to rotate.`}
      >
        {/* Subtle Watermark-Free Mode Indicators */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5 pointer-events-none">
          <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
            3D Spatial Render · {product.model3D?.geometryType || 'wand'}
          </span>
          {isHapticActive && (
            <span className="text-xs font-mono text-rose-400 flex items-center gap-1.5 animate-pulse">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-rose-500" />
              Motors Active: {activeHapticMode}
            </span>
          )}
        </div>

        {/* Rotation Hint */}
        <div className="absolute bottom-3 left-4 z-10 text-[11px] text-neutral-500 font-mono pointer-events-none">
          Click & Drag to Inspect · 360° Axis
        </div>
      </div>

      {/* Interactive Controls Bar */}
      <div className="p-3 bg-neutral-900/90 backdrop-blur-md border-t border-neutral-800 flex flex-wrap items-center justify-between gap-2 z-10 text-xs">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setAutoRotate(!autoRotate)}
            className={`px-2.5 py-1.5 rounded-md font-medium transition-colors ${
              autoRotate ? 'bg-neutral-800 text-neutral-100' : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            {autoRotate ? 'Pause Orbit' : 'Orbit'}
          </button>

          {product.thermalSupported && (
            <button
              type="button"
              onClick={() => setThermalMode(!thermalMode)}
              className={`px-2.5 py-1.5 rounded-md font-medium transition-colors flex items-center gap-1.5 ${
                thermalMode
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <span>Thermal Zone (38°C)</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setExplodedView(!explodedView)}
            className={`px-2.5 py-1.5 rounded-md font-medium transition-colors ${
              explodedView
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Internal Actuators ({product.model3D?.motorNodes?.length || 2})
          </button>
        </div>

        <div className="text-[11px] font-mono text-neutral-500 hidden sm:block">
          IPX8 Liquid Titanium · WebGL PBR
        </div>
      </div>
    </div>
  );
};
