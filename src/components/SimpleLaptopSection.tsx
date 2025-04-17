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

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    const container = mountRef.current;

    const width = container.clientWidth;
    const height = container.clientHeight;

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
    let object;
    const loader = new GLTFLoader();
    loader.load(
      "public/assets/MacBook.glb",
      (gltf) => {
        object = gltf.scene;
        // Адаптивный масштаб в зависимости от ширины экрана
        const isMobile = window.innerWidth < 720;
        // object.scale.set(
        //   isMobile ? 1.0 : 2,
        //   isMobile ? 1.1 : 1.5,
        //   isMobile ? 1.0 : 2
        // );
        object.scale.set(2, 1.5, 2);

        object.rotation.set(0.1, 3.7, -0.1);

        object.traverse((child) => {
          if (child.isMesh) {
            if (!child.material.map) {
              console.log("Текстура отсутствует для:", child.material.name);
            }
            if (child.material.opacity < 1 || child.material.alphaTest > 0) {
              child.material.transparent = true;
            }
            child.geometry.computeVertexNormals();
          }
        });

        scene.add(object);
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

    // Камера: адаптация под мобильные
    if (window.innerWidth < 640) {
      camera.position.set(0, 0, 12);
    } else {
      camera.position.set(0, 0, 10);
    }
    

    // Управление камерой
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.03;
    controls.enableZoom = false;
    controls.enablePan = false;

    controls.minAzimuthAngle = -Math.PI / 6;
    controls.maxAzimuthAngle = Math.PI / 6;

    controls.minPolarAngle = Math.PI / 2;
    controls.maxPolarAngle = Math.PI / 2;

    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      floatingRef.current += 0.05;
      if (object) {
        object.position.y = -1.5 + Math.sin(floatingRef.current) * 0.05;
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
      className="w-full max-w-[320px] sm:max-w-[480px] md:max-w-none h-[350px] sm:h-[500px] md:h-[700px] flex items-center justify-center"
    />
  );
};

export default SimpleLaptopSection;
