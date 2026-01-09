import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import styles from "./GlobalScene.module.css";

gsap.registerPlugin(ScrollTrigger);

function RotatingSphere() {
  const meshRef = useRef(null);
  const rotationRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const scrollTrigger = ScrollTrigger.create({
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
      onUpdate: (self) => {
        rotationRef.current.y = self.progress * Math.PI * 2;
        rotationRef.current.x = self.progress * Math.PI * 0.5;
      },
    });

    return () => {
      scrollTrigger.kill();
    };
  }, []);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y = gsap.utils.interpolate(
        meshRef.current.rotation.y,
        rotationRef.current.y,
        0.1
      );
      meshRef.current.rotation.x = gsap.utils.interpolate(
        meshRef.current.rotation.x,
        rotationRef.current.x,
        0.1
      );
    }
  });

  return (
    <Sphere ref={meshRef} args={[3, 32, 32]} position={[0, 0, 0]}>
      <MeshDistortMaterial
        color="#99ff88"
        transparent
        opacity={0.3}
        distort={0.4}
        speed={2}
        roughness={0.1}
        metalness={0.5}
      />
    </Sphere>
  );
}

function Particles() {
  const particlesRef = useRef(null);
  const particlesData = useRef([]);

  const particles = Array.from({ length: 200 }, (_, i) => ({
    id: i,
    initialX: (Math.random() - 0.5) * 20,
    initialY: (Math.random() - 0.5) * 20,
    initialZ: (Math.random() - 0.5) * 20,
    speed: Math.random() * 0.002 + 0.001,
    offset: Math.random() * Math.PI * 2,
  }));

  useEffect(() => {
    particlesData.current = particles;
  }, []);

  useFrame((state) => {
    if (particlesRef.current && particlesRef.current.children) {
      particlesRef.current.children.forEach((node, i) => {
        if (particlesData.current[i]) {
          const particle = particlesData.current[i];
          const time = state.clock.getElapsedTime();
          
          node.position.y = particle.initialY + Math.sin(time * particle.speed * 10 + particle.offset) * 2;
          
          node.rotation.y = time * particle.speed * 5;
        }
      });
    }
  });

  return (
    <group ref={particlesRef}>
      {particles.map((particle) => (
        <mesh key={particle.id} position={[particle.initialX, particle.initialY, particle.initialZ]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial
            color="#99ff88"
            transparent
            opacity={0.6}
            emissive="#99ff88"
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={1} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#99ff88" />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#99ff88" />
      <directionalLight position={[5, 5, 5]} intensity={0.5} />
      <RotatingSphere />
      <Particles />
    </>
  );
}

function GlobalScene() {
  const canvasRef = useRef(null);


  return (
    <div ref={canvasRef} className={styles.globalScene}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
      >
        <Scene />
      </Canvas>
    </div>
  );
}

export default GlobalScene;
