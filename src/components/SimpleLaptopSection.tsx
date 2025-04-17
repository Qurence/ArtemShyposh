import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const SimpleLaptopSection = () => {
  const mountRef = useRef(null);
  const animationRef = useRef(null);
  const floatingRef = useRef(0);

  useEffect(() => {
    // Настройка сцены
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    const container = mountRef.current;
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    container.appendChild(renderer.domElement);

    // Освещение
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5); // Увеличенная интенсивность
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(5, 5, 5); // Свет спереди
    scene.add(directionalLight);
    const backLight = new THREE.DirectionalLight(0xffffff, 0.8); // Свет сзади
    backLight.position.set(-5, 0, -5);
    scene.add(backLight);
    const bottomLight = new THREE.DirectionalLight(0xffffff, 0.5); // Свет снизу
    bottomLight.position.set(0, -5, 0);
    scene.add(bottomLight);

    // Загрузка модели
    let object;
    const loader = new GLTFLoader();
    loader.load(
      "public/assets/MacBook.glb",
      (gltf) => {
        object = gltf.scene;
        object.scale.set(1.3, 1.3, 1.3);
        object.rotation.set(0.1, 3.7, -0.1);
        // Обход материалов для проверки и настройки
        object.traverse((child) => {
          if (child.isMesh) {
            console.log("Материал:", child.material.name, child.material);
            // Проверка текстур
            if (!child.material.map) {
              console.log("Текстура отсутствует для:", child.material.name);
            }
            // Поддержка прозрачности
            if (child.material.opacity < 1 || child.material.alphaTest > 0) {
              child.material.transparent = true;
            }
            // Пересчет нормалей для корректного освещения
            child.geometry.computeVertexNormals();
          }
        });
        scene.add(object);
      },
      undefined,
      (error) => {
        console.error("Ошибка загрузки модели:", error);
        // Заглушка в случае ошибки
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        scene.add(object);
      }
    );

    // Позиция камеры
    camera.position.set(0, 0, 5);

    // Управление камерой
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
    controls.enablePan = false;

    // Анимация
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      floatingRef.current += 0.05;
      if (object) {
        object.position.y = Math.sin(floatingRef.current) * 0.2; // Плавающая анимация
      }
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Обработка изменения размера
    const handleResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);

    // Очистка при размонтировании
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