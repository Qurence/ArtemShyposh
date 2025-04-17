import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const SimpleLaptopSection = () => {
  const mountRef = useRef(null);
  const animationRef = useRef(null);
  const floatingRef = useRef(0);
  const objectRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const container = mountRef.current;
    let width = container.clientWidth;
    let height = container.clientHeight;

    const camera = new THREE.PerspectiveCamera(
      90, // Увеличенный FOV
      width / height,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    container.appendChild(renderer.domElement);

    // Освещение
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.0);
    keyLight.position.set(5, 5, 5);
    keyLight.castShadow = true;
    scene.add(keyLight);
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
    fillLight.position.set(-5, 2, 5);
    scene.add(fillLight);
    const rimLight = new THREE.DirectionalLight(0xffffff, 0.4);
    rimLight.position.set(0, 3, -5);
    scene.add(rimLight);
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6);
    hemiLight.position.set(0, 20, 0);
    scene.add(hemiLight);

    // Загрузка модели
    const loader = new GLTFLoader();
    loader.load(
      "assets/MacBook.glb",
      (gltf) => {
        objectRef.current = gltf.scene;
        updateObjectScaleAndCamera();
        objectRef.current.rotation.set(0, 4, 0);
        objectRef.current.traverse((child) => {
          if (child.isMesh) {
            if (!child.material.map) {
              // console.log("Текстура отсутствует для:", child.material.name);
            }
            if (child.material.opacity < 1 || child.material.alphaTest > 0) {
              child.material.transparent = true;
            }
            child.geometry.computeVertexNormals();
          }
        });
        scene.add(objectRef.current);
      },
      undefined,
      (error) => {
        console.error("Ошибка загрузки модели:", error);
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        const fallbackObject = new THREE.Mesh(geometry, material);
        scene.add(fallbackObject);
      }
    );

    // Управление камерой
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.03;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.minAzimuthAngle = -Math.PI / 5;
    controls.maxAzimuthAngle = Math.PI / 5;
    controls.minPolarAngle = Math.PI / 2;
    controls.maxPolarAngle = Math.PI / 2;

    // Функция для обновления масштаба объекта и положения камеры
    const updateObjectScaleAndCamera = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      const aspect = width / height;

      // Адаптивный масштаб объекта
      let scale = 1.0;
      if (width < 640) {
        scale = 0.8;
      } else if (width < 1024) {
        scale = 0.9;
      }
      if (objectRef.current) {
        objectRef.current.scale.set(scale, scale, scale);
      }

      // Адаптивное положение камеры
      const distance = width < 640 ? 4 : 4.5;
      camera.position.set(0, 0, distance);
      camera.aspect = aspect;
      camera.updateProjectionMatrix();

      // Обновляем размер рендерера
      renderer.setSize(width, height);
    };

    // Анимация
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      floatingRef.current += 0.02;
      if (objectRef.current) {
        objectRef.current.position.y = -1 + Math.sin(floatingRef.current) * 0.05;
      }
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Обработчик изменения размера
    const handleResize = () => {
      updateObjectScaleAndCamera();
    };
    window.addEventListener("resize", handleResize);

    // Очистка
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
      className="w-full h-[300px] sm:h-[500px] md:h-[700px] flex items-center justify-center mx-auto"
    />
  );
};

export default SimpleLaptopSection;