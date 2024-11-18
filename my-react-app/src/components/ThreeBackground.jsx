import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeBackground = () => {
  const mountRef = useRef(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const particlesRef = useRef([]);
  const linesRef = useRef([]);
  const raycaster = useRef(new THREE.Raycaster());
  const clickedParticle = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#0a0014');
    scene.fog = new THREE.Fog(0x0a0014, 20, 50); // Add fog for depth

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Adjust these values for smoother movement
    const particleCount = 150;
    const particles = [];
    const particleGeometry = new THREE.IcosahedronGeometry(0.2, 1); // Increased detail
    
    // Define theme-matching colors
    const themeColors = [
      { h: 220, s: 70, l: 50 }, // Blue (#4299e1 equivalent)
      { h: 270, s: 70, l: 50 }, // Purple (#9f7aea equivalent)
      { h: 300, s: 70, l: 60 }  // Pink (#f687b3 equivalent)
    ];
    
    for (let i = 0; i < particleCount; i++) {
      // Choose color from theme
      const colorIndex = i % themeColors.length;
      const baseColor = themeColors[colorIndex];
      
      const material = new THREE.MeshPhongMaterial({
        color: new THREE.Color().setHSL(
          baseColor.h / 360,
          baseColor.s / 100,
          baseColor.l / 100
        ),
        emissive: new THREE.Color().setHSL(
          baseColor.h / 360,
          baseColor.s / 100,
          (baseColor.l - 20) / 100
        ),
        shininess: 100,
        transparent: true,
        opacity: 0.8
      });

      const particle = new THREE.Mesh(particleGeometry, material);
      
      // Smoother initial distribution
      const radius = 20 + (Math.random() - 0.5) * 8; // Reduced variance
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      
      particle.position.x = radius * Math.sin(phi) * Math.cos(theta);
      particle.position.y = radius * Math.sin(phi) * Math.sin(theta);
      particle.position.z = radius * Math.cos(phi);
      
      particle.userData = {
        originalPosition: particle.position.clone(),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.02, // Reduced velocity
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02
        ),
        connections: [],
        originalScale: 1,
        targetScale: 1,
        rotationSpeed: Math.random() * 0.01 - 0.005, // Slower rotation
        pulsePhase: Math.random() * Math.PI * 2,
        currentColor: new THREE.Color(),
        targetColor: new THREE.Color()
      };

      particles.push(particle);
      scene.add(particle);
    }
    particlesRef.current = particles;

    // Enhanced connection lines with gradient effect
    const createLineMaterial = (startColor, endColor) => {
      return new THREE.LineMaterial({
        color: 0xffffff,
        linewidth: 0.003,
        vertexColors: true,
        dashed: false,
        transparent: true,
        opacity: 0.3
      });
    };

    // Improved lighting
    const ambientLight = new THREE.AmbientLight(0x4299e1, 0.3); // Blue tint
    scene.add(ambientLight);

    const pointLights = [
      { color: 0x4299e1, position: [10, 10, 10] },    // Blue
      { color: 0x9f7aea, position: [-10, -10, -10] }, // Purple
      { color: 0xf687b3, position: [0, 10, -10] }     // Pink
    ].map(light => {
      const pointLight = new THREE.PointLight(light.color, 1.5);
      pointLight.position.set(...light.position);
      scene.add(pointLight);
      return pointLight;
    });

    // Enhanced mouse interaction
    const onMouseMove = (event) => {
      mousePosition.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1
      };

      // Raycast for hover effects
      raycaster.current.setFromCamera(mousePosition.current, camera);
      const intersects = raycaster.current.intersectObjects(particles);

      particles.forEach(particle => {
        particle.userData.targetScale = 1;
      });

      if (intersects.length > 0) {
        intersects[0].object.userData.targetScale = 2;
      }
    };

    // Modified click interaction
    const onClick = (event) => {
      // Get mouse position in 3D space
      const mouseVector = new THREE.Vector3(
        mousePosition.current.x * 20,
        mousePosition.current.y * 20,
        0
      );

      // Create explosion effect from mouse position
      particles.forEach(particle => {
        const distanceToMouse = particle.position.distanceTo(mouseVector);
        const maxDistance = 20; // Maximum effect radius
        
        if (distanceToMouse < maxDistance) {
          // Calculate explosion force based on distance
          const force = particle.position.clone()
            .sub(mouseVector)
            .normalize()
            .multiplyScalar(0.5 * (1 - distanceToMouse / maxDistance));
          
          // Add upward boost
          force.y += 0.2;
          
          // Add randomness for chaotic effect
          force.add(new THREE.Vector3(
            (Math.random() - 0.5) * 0.2,
            (Math.random() - 0.5) * 0.2,
            (Math.random() - 0.5) * 0.2
          ));
          
          // Apply the explosive force
          particle.userData.velocity.copy(force);
          
          // Scale effect
          particle.userData.targetScale = 1.5;
          setTimeout(() => {
            particle.userData.targetScale = 1;
          }, 500 + Math.random() * 500); // Staggered return to normal size
        }
      });

      // Clear existing connections
      linesRef.current.forEach(line => {
        scene.remove(line);
        line.geometry.dispose();
        line.material.dispose();
      });
      linesRef.current = [];

      // Create shockwave effect at mouse position
      const shockwaveGeometry = new THREE.RingGeometry(0.1, 0.5, 32);
      const shockwaveMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color(0x4299e1),
        transparent: true,
        opacity: 0.8,
        side: THREE.DoubleSide
      });
      
      const shockwave = new THREE.Mesh(shockwaveGeometry, shockwaveMaterial);
      shockwave.position.copy(mouseVector);
      shockwave.lookAt(camera.position);
      scene.add(shockwave);

      // Animate shockwave
      const animateShockwave = () => {
        shockwave.scale.x += 0.4;
        shockwave.scale.y += 0.4;
        shockwaveMaterial.opacity -= 0.02;

        if (shockwaveMaterial.opacity > 0) {
          requestAnimationFrame(animateShockwave);
        } else {
          scene.remove(shockwave);
          shockwave.geometry.dispose();
          shockwave.material.dispose();
        }
      };
      
      animateShockwave();

      // Prevent new connections from forming immediately
      setTimeout(() => {
        updateConnections();
      }, 2000);
    };

    // Update connection lines with increased distance threshold
    const updateConnections = () => {
      linesRef.current.forEach(line => scene.remove(line));
      linesRef.current = [];

      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];
        particle.userData.connections = [];

        for (let j = i + 1; j < particles.length; j++) {
          const otherParticle = particles[j];
          const distance = particle.position.distanceTo(otherParticle.position);

          // Dynamic connection threshold based on particle movement
          const velocityMagnitude = particle.userData.velocity.length() + 
                                  otherParticle.userData.velocity.length();
          const baseThreshold = 5; // Increased from 2 to 5
          const dynamicThreshold = baseThreshold + (velocityMagnitude * 2);

          // Create connection only if particles are moving closer to each other
          const relativeVelocity = particle.userData.velocity.clone()
            .sub(otherParticle.userData.velocity);
          const isMovingCloser = particle.position.clone()
            .sub(otherParticle.position)
            .dot(relativeVelocity) < 0;

          if (distance < dynamicThreshold && (isMovingCloser || Math.random() < 0.1)) {
            const geometry = new THREE.BufferGeometry().setFromPoints([
              particle.position,
              otherParticle.position
            ]);
            
            // Opacity based on distance and velocity
            const opacityFactor = Math.min(
              1,
              (velocityMagnitude * 0.5) + (1 - distance / dynamicThreshold)
            );
            
            const line = new THREE.Line(
              geometry,
              new THREE.LineBasicMaterial({
                color: new THREE.Color(10/255, 0/255, 20/255), // rgb(10, 0, 20)
                transparent: true,
                opacity: opacityFactor * 0.15
              })
            );
            
            scene.add(line);
            linesRef.current.push(line);
            particle.userData.connections.push(otherParticle);
          }
        }
      }
    };

    // Create octahedrons with permanent wireframe
    const floatingCount = 8;
    const floaters = [];
    const octahedronGeometry = new THREE.OctahedronGeometry(1.2, 0);
    
    for (let i = 0; i < floatingCount; i++) {
      const material = new THREE.MeshPhongMaterial({
        color: new THREE.Color().setHSL(i / floatingCount, 0.7, 0.5),
        emissive: new THREE.Color().setHSL(i / floatingCount, 0.7, 0.2),
        shininess: 100,
        transparent: true,
        opacity: 0.8,
        wireframe: true, // Always wireframe
        flatShading: true
      });

      const octahedron = new THREE.Mesh(octahedronGeometry, material);
      
      // Random initial position
      octahedron.position.x = (Math.random() - 0.5) * 30;
      octahedron.position.y = (Math.random() - 0.5) * 30;
      octahedron.position.z = (Math.random() - 0.5) * 20;
      
      octahedron.rotation.x = Math.random() * Math.PI;
      octahedron.rotation.y = Math.random() * Math.PI;
      
      octahedron.userData = {
        originalPosition: octahedron.position.clone(),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.1,
          (Math.random() - 0.5) * 0.1,
          (Math.random() - 0.5) * 0.1
        ),
        rotationSpeed: {
          x: (Math.random() - 0.5) * 0.02,
          y: (Math.random() - 0.5) * 0.02,
          z: (Math.random() - 0.5) * 0.02
        },
        pulsePhase: Math.random() * Math.PI * 2,
        targetScale: 1,
        baseColor: new THREE.Color().setHSL(i / floatingCount, 0.7, 0.5),
        changeDirectionTime: Math.random() * 5000 // Random time for direction change
      };

      floaters.push(octahedron);
      scene.add(octahedron);
    }

    // Update animation loop for random movement
    const animate = () => {
      requestAnimationFrame(animate);
      const time = Date.now() * 0.0005;

      // Animate octahedrons with random movement
      floaters.forEach((octahedron, index) => {
        // Update position with velocity
        octahedron.position.add(octahedron.userData.velocity);

        // Random direction changes
        if (Math.random() < 0.01) { // 1% chance each frame to change direction
          octahedron.userData.velocity.set(
            (Math.random() - 0.5) * 0.1,
            (Math.random() - 0.5) * 0.1,
            (Math.random() - 0.5) * 0.1
          );
        }

        // Boundary checking and reflection
        const bounds = {
          x: 25,
          y: 20,
          z: 15
        };

        if (Math.abs(octahedron.position.x) > bounds.x) {
          octahedron.userData.velocity.x *= -1;
          octahedron.position.x = Math.sign(octahedron.position.x) * bounds.x;
        }
        if (Math.abs(octahedron.position.y) > bounds.y) {
          octahedron.userData.velocity.y *= -1;
          octahedron.position.y = Math.sign(octahedron.position.y) * bounds.y;
        }
        if (Math.abs(octahedron.position.z) > bounds.z) {
          octahedron.userData.velocity.z *= -1;
          octahedron.position.z = Math.sign(octahedron.position.z) * bounds.z;
        }

        // Rotation
        octahedron.rotation.x += octahedron.userData.rotationSpeed.x;
        octahedron.rotation.y += octahedron.userData.rotationSpeed.y;
        octahedron.rotation.z += octahedron.userData.rotationSpeed.z;

        // Mouse interaction
        const mouseVector = new THREE.Vector3(
          mousePosition.current.x * 20,
          mousePosition.current.y * 20,
          0
        );
        const distanceToMouse = octahedron.position.distanceTo(mouseVector);
        
        if (distanceToMouse < 10) {
          const repulsionForce = mouseVector.clone()
            .sub(octahedron.position)
            .normalize()
            .multiplyScalar(-0.2); // Increased repulsion
          octahedron.userData.velocity.add(repulsionForce);
        }

        // Limit maximum velocity
        const maxSpeed = 0.2;
        if (octahedron.userData.velocity.length() > maxSpeed) {
          octahedron.userData.velocity.normalize().multiplyScalar(maxSpeed);
        }

        // Add slight random movement
        octahedron.userData.velocity.add(new THREE.Vector3(
          (Math.random() - 0.5) * 0.002,
          (Math.random() - 0.5) * 0.002,
          (Math.random() - 0.5) * 0.002
        ));

        // Rest of the octahedron animation (color, scale, etc.) remains the same...
      });

      // Existing particle animation code...
      particles.forEach((particle, index) => {
        // Smooth particle movement with damping
        particle.position.add(particle.userData.velocity);
        particle.userData.velocity.multiplyScalar(0.99); // Damping factor
        
        // Enhanced mouse interaction with smoother easing
        const mouseVector = new THREE.Vector3(
          mousePosition.current.x * 20,
          mousePosition.current.y * 20,
          0
        );
        const distanceToMouse = particle.position.distanceTo(mouseVector);
        
        if (distanceToMouse < 10) {
          const repulsionForce = mouseVector.sub(particle.position)
            .normalize()
            .multiplyScalar(-0.08); // Gentler repulsion
          particle.userData.velocity.add(repulsionForce);
        }

        // Smoother return to original position
        const originalPosition = particle.userData.originalPosition;
        const distanceToOrigin = particle.position.distanceTo(originalPosition);
        if (distanceToOrigin > 0.1) {
          const returnForce = originalPosition.clone()
            .sub(particle.position)
            .normalize()
            .multiplyScalar(0.01); // Gentler return force
          particle.userData.velocity.add(returnForce);
        }

        // Smoother rotation with lerp
        particle.rotation.x += particle.userData.rotationSpeed;
        particle.rotation.y += particle.userData.rotationSpeed;
        
        // Enhanced pulse effect with smoother transitions
        const pulse = Math.sin(time * 2 + particle.userData.pulsePhase) * 0.05 + 1; // Reduced pulse amplitude
        const targetScale = particle.userData.targetScale * pulse;
        particle.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.05);

        // Update color transitions to match theme
        const baseColor = themeColors[index % themeColors.length];
        const hueOffset = Math.sin(time + particle.userData.pulsePhase) * 20; // Smaller hue variation
        const hue = ((baseColor.h + hueOffset) % 360) / 360;
        const saturation = baseColor.s / 100;
        const lightness = (baseColor.l / 100) + Math.sin(time * 2) * 0.1;

        particle.userData.targetColor.setHSL(hue, saturation, lightness);
        particle.material.color.lerp(particle.userData.targetColor, 0.05);
        particle.material.emissive.lerp(
          particle.userData.targetColor.clone().multiplyScalar(0.5),
          0.05
        );

        // Add slight attraction to nearest torus
        let nearestTorus = null;
        let minDistance = Infinity;
        floaters.forEach(torus => {
          const distance = particle.position.distanceTo(torus.position);
          if (distance < minDistance) {
            minDistance = distance;
            nearestTorus = torus;
          }
        });

        if (nearestTorus && minDistance < 5) {
          const attractionForce = nearestTorus.position.clone()
            .sub(particle.position)
            .normalize()
            .multiplyScalar(0.001);
          particle.userData.velocity.add(attractionForce);
        }
      });

      // Smoother light movement
      pointLights.forEach((light, index) => {
        const radius = 15;
        const speed = 0.2; // Slower light rotation
        const targetX = Math.cos(time * speed + index * Math.PI * 2 / 3) * radius;
        const targetZ = Math.sin(time * speed + index * Math.PI * 2 / 3) * radius;
        
        // Lerp light positions
        light.position.x += (targetX - light.position.x) * 0.05;
        light.position.z += (targetZ - light.position.z) * 0.05;
      });

      // Update connections less frequently for performance
      if (Math.random() < 0.1) {
        updateConnections();
      }

      renderer.render(scene, camera);
    };

    animate();

    // Event listeners
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('click', onClick);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('click', onClick);
      window.removeEventListener('resize', handleResize);
      mountRef.current.removeChild(renderer.domElement);
      
      particles.forEach(particle => {
        particle.geometry.dispose();
        particle.material.dispose();
      });
      
      linesRef.current.forEach(line => {
        line.geometry.dispose();
        line.material.dispose();
      });
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100vw',
        height: '100vh',
        minHeight: '100vh',
        zIndex: 0,
        backgroundColor: '#0a0014',
        cursor: 'pointer',
        overflow: 'hidden'
      }} 
    />
  );
};

export default ThreeBackground; 