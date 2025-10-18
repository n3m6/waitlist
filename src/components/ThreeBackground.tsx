import { useEffect, useRef } from "react";
import * as THREE from "three";

const ThreeBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);

    // Create grid of dots
    const dotsGeometry = new THREE.BufferGeometry();
    const dotsMaterial = new THREE.PointsMaterial({
      color: 0xe96479,
      size: 2,
      transparent: true,
      opacity: 0.6,
    });

    const dotsCount = 2000;
    const positions = new Float32Array(dotsCount * 3);

    for (let i = 0; i < dotsCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
    }

    dotsGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3),
    );
    const dots = new THREE.Points(dotsGeometry, dotsMaterial);
    scene.add(dots);

    // Create wireframe geometric shape
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x7db9b6,
      wireframe: true,
      transparent: true,
      opacity: 0.2,
    });

    const octahedronGeometry = new THREE.OctahedronGeometry(8, 0);
    const octahedron = new THREE.Mesh(octahedronGeometry, wireframeMaterial);
    octahedron.position.set(20, -10, -20);
    scene.add(octahedron);

    camera.position.z = 50;

    // Animation
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate shape slowly
      octahedron.rotation.x += 0.002;
      octahedron.rotation.y += 0.001;

      // Rotate dots field
      dots.rotation.y += 0.0005;

      // Parallax effect with mouse
      camera.position.x += (mouseX * 5 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 5 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (
        containerRef.current &&
        containerRef.current.contains(renderer.domElement)
      ) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      dotsGeometry.dispose();
      dotsMaterial.dispose();
      octahedronGeometry.dispose();
      wireframeMaterial.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10 opacity-40"
      style={{ pointerEvents: "none" }}
    />
  );
};

export default ThreeBackground;
