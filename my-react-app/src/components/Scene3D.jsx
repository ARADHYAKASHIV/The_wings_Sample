import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, Suspense, useState } from 'react'
import { 
  Stars,
  Float,
  PerspectiveCamera,
  MeshDistortMaterial,
  GradientTexture,
  OrbitControls
} from '@react-three/drei'
import * as THREE from 'three'

function InteractiveSphere({ position, colors, scale = 1, speed = 1 }) {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * speed) * 0.3
      meshRef.current.rotation.y = Math.cos(state.clock.elapsedTime * speed) * 0.3
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * speed) * 0.2
    }
  })

  return (
    <Float
      speed={2}
      rotationIntensity={2}
      floatIntensity={2}
    >
      <mesh
        ref={meshRef}
        position={position}
        scale={clicked ? scale * 1.2 : hovered ? scale * 1.1 : scale}
        onClick={() => setClicked(!clicked)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          speed={1}
          distort={hovered ? 0.6 : 0.4}
          radius={1}
        >
          <GradientTexture
            stops={[0, 0.5, 1]}
            colors={colors}
          />
        </MeshDistortMaterial>
      </mesh>
    </Float>
  )
}

function ParticleField() {
  const particlesRef = useRef()

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })

  const particleCount = 1000
  const positions = new Float32Array(particleCount * 3)

  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3
    positions[i3] = (Math.random() - 0.5) * 25
    positions[i3 + 1] = (Math.random() - 0.5) * 25
    positions[i3 + 2] = (Math.random() - 0.5) * 25
  }

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#ffffff"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

function Scene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={75} />
      <OrbitControls 
        enableZoom={false}
        enablePan={false}
        maxPolarAngle={Math.PI * 0.65}
        minPolarAngle={Math.PI * 0.35}
      />

      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} />
      <pointLight position={[-10, -10, -5]} intensity={1} color="#4299e1" />

      <InteractiveSphere 
        position={[0, 0, 0]} 
        colors={['#4299e1', '#805ad5', '#d53f8c']}
        scale={2}
        speed={0.5}
      />

      <InteractiveSphere 
        position={[-4, 2, -2]} 
        colors={['#805ad5', '#d53f8c', '#ed64a6']}
        scale={1}
        speed={0.7}
      />

      <InteractiveSphere 
        position={[4, -2, -2]} 
        colors={['#d53f8c', '#ed64a6', '#4299e1']}
        scale={1.2}
        speed={0.3}
      />

      <Stars 
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />

      <ParticleField />

      <fog attach="fog" args={['#000014', 5, 30]} />
    </>
  )
}

function Scene3D() {
  return (
    <div className="fixed inset-0" style={{ backgroundColor: '#000014', zIndex: -1 }}>
      <Canvas
        dpr={[1, 2]}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          outputEncoding: THREE.sRGBEncoding
        }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default Scene3D 