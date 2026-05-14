import { useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Float, Sparkles, Stars, ContactShadows, Icosahedron } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useAuthModalStore } from '@/store/useAuthModalStore';
import { useInView } from 'react-intersection-observer';
import * as THREE from 'three';

// Optimized glass/crystal object
function CryptoCrystal({ position, scale, rotation, color }) {
  const mesh = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    mesh.current.rotation.y = Math.sin(t / 2) * 0.3 + rotation[1];
    mesh.current.rotation.x = Math.cos(t / 2) * 0.3 + rotation[0];
  });

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={1.5} position={position}>
      <mesh ref={mesh} scale={scale}>
        <Icosahedron args={[1, 0]}>
          <meshPhysicalMaterial 
            color={color}
            transmission={0.9}
            opacity={1}
            metalness={0.1}
            roughness={0.1}
            ior={1.5}
            thickness={2}
            specularIntensity={1}
          />
        </Icosahedron>
      </mesh>
    </Float>
  );
}

// Mouse interactive rig that shifts the camera slightly
function CameraRig() {
  const { camera, pointer } = useThree();
  useFrame(() => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * 1.5, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, pointer.y * 1.5, 0.05);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

// Full Scene
function HeroScene() {
  return (
    <>
      <color attach="background" args={['#040D26']} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1.5} color="#bd24df" />
      <directionalLight position={[-10, -10, -10]} intensity={1.5} color="#2d6ade" />

      {/* Floating Crystals */}
      <CryptoCrystal position={[-3, 1, -2]} scale={1.5} rotation={[0.5, 0.2, 0]} color="#bd24df" />
      <CryptoCrystal position={[3.5, -1, -1]} scale={1.2} rotation={[0.1, 0.5, 0.2]} color="#2d6ade" />
      <CryptoCrystal position={[-2, -2, -3]} scale={0.8} rotation={[0, 0.8, 0.4]} color="#F7931A" />
      <CryptoCrystal position={[4, 2, -4]} scale={1} rotation={[0.7, 0, 0.3]} color="#26A17B" />

      {/* Optimized Particles & Stars */}
      <Stars radius={50} depth={50} count={1000} factor={3} saturation={0} fade speed={0.5} />
      <Sparkles count={50} scale={10} size={3} speed={0.2} opacity={0.3} color="#bd24df" />

      {/* Ground shadows */}
      <ContactShadows position={[0, -4, 0]} opacity={0.3} scale={20} blur={2.5} far={4} color="#000000" />

      {/* Lighting Environment */}
      <Environment preset="city" />
      
      {/* Interactive Camera */}
      <CameraRig />
    </>
  );
}

export default function HeroSection() {
  const { openModal } = useAuthModalStore();
  const { ref, inView } = useInView({ threshold: 0 });

  return (
    <section ref={ref} className="relative h-screen w-full overflow-hidden bg-[#040D26]">
      {/* WebGL Canvas Background - Only render when in view */}
      <div className="absolute inset-0 z-0">
        {inView && (
          <Canvas 
            camera={{ position: [0, 0, 8], fov: 45 }} 
            dpr={[1, 1.5]}
            gl={{ antialias: false, powerPreference: "high-performance" }}
          >
            <HeroScene />
          </Canvas>
        )}
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex items-center pt-16 pointer-events-none">
        <div className="container">
          <div className="max-w-4xl">
            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20 text-xs font-bold tracking-[0.2em] uppercase text-white mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              The Next-Gen Reward OS
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl sm:text-7xl lg:text-8xl font-black leading-[1.05] tracking-tight mb-6 text-white"
              style={{ textShadow: '0 10px 40px rgba(0,0,0,0.5)' }}
            >
              Unlock <span className="gradient-text">Web3</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/60">
                Earnings Potential.
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg sm:text-xl text-lightblue/90 max-w-2xl leading-relaxed mb-10"
              style={{ textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}
            >
              A cinematic ecosystem engineered for maximum returns. Complete tasks, earn points, and withdraw instantly to your FaucetPay wallet.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-4 pointer-events-auto"
            >
              <button
                onClick={() => openModal('REGISTER')}
                className="gradient-btn px-8 py-4 rounded-2xl font-black text-white text-sm tracking-wide shadow-[0_0_40px_rgba(189,36,223,0.4)] hover:scale-105 active:scale-95 transition-all duration-300"
              >
                Create Account →
              </button>
              <button
                onClick={() => openModal('LOGIN')}
                className="px-8 py-4 rounded-2xl font-bold text-white text-sm tracking-wide glass border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              >
                Access Dashboard
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom gradient to blend with next section */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#040D26] to-transparent z-10 pointer-events-none" />
    </section>
  );
}
