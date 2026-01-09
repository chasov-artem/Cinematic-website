import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import styles from "./ThreeSphereIcon.module.css";

/**
 * Внутрішня структура з точок (point cloud)
 */
function InnerParticles() {
  const pointsRef = useRef(null);
  const count = 1000;

  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Розподіляємо точки в сферичній формі (збільшені в 3 рази)
      const radius = 1.2 + Math.random() * 0.9; // 0.4*3 до 0.7*3
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      // Дуже повільне обертання, щоб середина не зникала
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
      // Фіксуємо X обертання, щоб точки завжди були видимі
      pointsRef.current.rotation.x = 0;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.09} // 0.03 * 3
        color="#00ff88"
        transparent
        opacity={1}
        sizeAttenuation={true}
        emissive="#00ff88"
        emissiveIntensity={2}
      />
    </points>
  );
}

/**
 * Зовнішній хвилястий шар
 */
function OuterWaveLayer() {
  const meshRef = useRef(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Пульсація та обертання (збільшені розміри в 3 рази)
      const time = state.clock.getElapsedTime();
      meshRef.current.rotation.y = time * 0.25;
      // Фіксуємо X обертання для стабільності
      meshRef.current.rotation.x = 0;
    }
  });

  return (
    <Sphere ref={meshRef} args={[2.7, 64, 64]} position={[0, 0, 0]}>
      <MeshDistortMaterial
        color="#00ffff"
        transparent
        opacity={0.3}
        distort={0.5}
        speed={3}
        roughness={0}
        metalness={0}
        emissive="#00ffff"
        emissiveIntensity={1.5}
      />
    </Sphere>
  );
}

/**
 * Внутрішня світла сфера
 */
function InnerGlowSphere() {
  const meshRef = useRef(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Повільне обертання, щоб сфера завжди була видима
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.x = 0;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1.5, 32, 32]} position={[0, 0, 0]}>
      <meshStandardMaterial
        color="#00ff88"
        transparent
        opacity={0.7}
        emissive="#00ff88"
        emissiveIntensity={2.5}
        roughness={0.1}
        metalness={0.3}
      />
    </Sphere>
  );
}

/**
 * Three.js сфера з зеленою тінню для Wisdom Guide
 */
function AnimatedSphere() {
  const groupRef = useRef(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Загальне обертання всієї сфери (повільніше, щоб середина не зникала)
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.25;
      // Фіксуємо X та Z обертання для стабільності
      groupRef.current.rotation.x = 0;
      groupRef.current.rotation.z = 0;
    }
  });

  return (
    <group ref={groupRef}>
      {/* М'яка зелена тінь знизу (збільшена в 3 рази) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
        <circleGeometry args={[4.5, 32]} />
        <meshStandardMaterial
          color="#00ff88"
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Зовнішній хвилястий шар */}
      <OuterWaveLayer />
      
      {/* Внутрішня структура з точок */}
      <InnerParticles />
      
      {/* Внутрішня світла сфера */}
      <InnerGlowSphere />
    </group>
  );
}

/**
 * Canvas wrapper для Three.js сфери
 */
function ThreeSphereIcon() {
  return (
    <div className={styles.threeSphereContainer}>
      <Canvas
        camera={{ position: [0, 0, 12], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.8} />
        <pointLight position={[15, 15, 15]} intensity={3} color="#00ff88" />
        <pointLight position={[-15, -15, -15]} intensity={2} color="#00ffff" />
        <pointLight position={[0, 15, 0]} intensity={2.5} color="#00ff88" />
        <pointLight position={[0, -15, 0]} intensity={1.5} color="#00ff88" />
        <pointLight position={[0, 0, 0]} intensity={2} color="#00ff88" />
        <directionalLight position={[9, 9, 9]} intensity={1} />
        <AnimatedSphere />
      </Canvas>
    </div>
  );
}

export default ThreeSphereIcon;
