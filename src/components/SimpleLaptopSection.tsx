import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import gsap from "gsap";

const SimpleLaptopSection = () => {
  const mountRef = useRef(null);
  const animationRef = useRef(null);
  const floatingRef = useRef(0);
  const objectRef = useRef(null);
  const controlsRef = useRef(null);
  const isDraggingRef = useRef(false);
  const currentAzimuthRef = useRef({ value: 0 }); // Объект для GSAP

  useEffect(() => {
    const scene = new THREE.Scene();
    const container = mountRef.current;
    let width = container.clientWidth;
    let height = container.clientHeight;

    const camera = new THREE.PerspectiveCamera(90, width / height, 0.1, 1000);

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
    controlsRef.current = controls;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.minAzimuthAngle = -Math.PI / 5;
    controls.maxAzimuthAngle = Math.PI / 5;
    controls.minPolarAngle = Math.PI / 2;
    controls.maxPolarAngle = Math.PI / 2;

    // Начальный угол
    currentAzimuthRef.current.value = controls.getAzimuthalAngle();

    // Отслеживание взаимодействия с мышью
    controls.addEventListener("start", () => {
      isDraggingRef.current = true;
      // console.log("Начало перетаскивания");
    });

    controls.addEventListener("end", () => {
      isDraggingRef.current = false;
      // console.log("Конец перетаскивания, возврат к начальным углам");
      // Останавливаем предыдущую анимацию
      gsap.killTweensOf(currentAzimuthRef.current);
      // Обновляем текущий угол перед новой анимацией
      currentAzimuthRef.current.value = controls.getAzimuthalAngle();
      // Анимация возврата с GSAP
      gsap.to(currentAzimuthRef.current, {
        value: 0, // Начальный azimuth
        duration: 1.8, // Длительность анимации
        ease: "elastic.out(1, 0.3)", // Смягчение
        overwrite: "auto", // Автоматически управляет конфликтами анимаций
        onUpdate: () => {
          if (controlsRef.current && !isDraggingRef.current) {
            // Обновляем угол в OrbitControls
            const distance = controlsRef.current.getDistance();
            const azimuth = THREE.MathUtils.clamp(
              currentAzimuthRef.current.value,
              controls.minAzimuthAngle,
              controls.maxAzimuthAngle
            );
            controlsRef.current.object.position.set(
              distance * Math.sin(azimuth),
              0,
              distance * Math.cos(azimuth)
            );
            controlsRef.current.object.lookAt(controlsRef.current.target);
            // Логирование
            console.log({
              isDragging: isDraggingRef.current,
              currentAzimuth: currentAzimuthRef.current.value,
              cameraPosition: controlsRef.current.object.position.toArray(),
            });
          }
        },
        onComplete: () => {
          console.log("Анимация возврата завершена");
        },
      });
    });

    // Функция для обновления масштаба объекта и положения камеры
    const updateObjectScaleAndCamera = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      const aspect = width / height;

      let scale = 0.9;
      if (width < 640) {
        scale = 0.7;
      } else if (width < 1024) {
        scale = 1;
      }
      if (objectRef.current) {
        objectRef.current.scale.set(scale, scale, scale);
      }

      const distance = width < 640 ? 4 : 4.5;
      camera.position.set(0, 0, distance);
      camera.aspect = aspect;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
    };

    // Анимация
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      floatingRef.current += 0.02;
      if (objectRef.current) {
        objectRef.current.position.y = -1 + Math.sin(floatingRef.current) * 0.05;
      }
      // Testind update
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
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 min-w-[390px] min-h-[390px] w-[60vw] h-[60vw] max-w-none max-h-none z-0"
      style={{overflow: 'visible'}}
    />
  );
};

export default SimpleLaptopSection;
