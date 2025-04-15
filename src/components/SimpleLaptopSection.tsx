import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const SimpleLaptopSection = () => {
  const mountRef = useRef(null);
  const animationRef = useRef(null);
  const floatingRef = useRef(0);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    const container = mountRef.current;
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.outputColorSpace = THREE.SRGBColorSpace; // Исправлено: outputColorSpace вместо outputEncoding
    renderer.toneMapping = THREE.ACESFilmicToneMapping; // Для PBR-материалов
    container.appendChild(renderer.domElement);

    // Освещение
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    let object;
    const loader = new GLTFLoader();
    loader.load(
      "public/assets/MacBook_Air_13.glb", 
      (gltf) => {
        object = gltf.scene;
        object.scale.set(1, 1, 1);
        // Пройтись по материалам для отладки
        object.traverse((child) => {
          if (child.isMesh) {
            console.log("Материал:", child.material.name, child.material);
            if (!child.material.map) {
              console.log("Текстура отсутствует для:", child.material.name);
            }
            // Поддержка прозрачности
            if (child.material.opacity < 1 || child.material.alphaTest > 0) {
              child.material.transparent = true;
            }
            child.material.side = THREE.DoubleSide; // На случай проблем с видимостью
          }
        });
        scene.add(object);
      },
      undefined,
      (error) => {
        console.error("Ошибка загрузки модели:", error);
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshStandardMaterial({ color: 0x555555 });
        object = new THREE.Mesh(geometry, material);
        scene.add(object);
      }
    );

    camera.position.set(0, 0, 5);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
    controls.enablePan = false;

    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      floatingRef.current += 0.05;
      if (object) {
        object.position.y = Math.sin(floatingRef.current) * 0.2;
      }
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", handleResize);
      container.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full h-[500px] flex items-center justify-center"
    />
  );
};

export default SimpleLaptopSection;