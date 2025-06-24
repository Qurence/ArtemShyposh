import { useEffect, useState, useRef, useLayoutEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download, Fingerprint } from "lucide-react";
import SimpleLaptopSection from "@/components/SimpleLaptopSection";
import { Link } from "react-router-dom";
import { useMediaQuery } from "@/hooks/use-media-query";

// Simple typewriter effect
const TypewriterText = ({ text }) => {
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!reverse) {
        if (index < text.length) {
          setDisplayText(text.substring(0, index + 1));
          setIndex(index + 1);
        } else {
          setTimeout(() => setReverse(true), 2000);
        }
      } else {
        if (index > 0) {
          setDisplayText(text.substring(0, index - 1));
          setIndex(index - 1);
        } else {
          setTimeout(() => setReverse(false), 500);
        }
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [index, reverse, text]);

  return (
    <span className="inline-block relative">
      {displayText}
      <span
        className="absolute right-[-4px] top-0 h-full w-[2px] bg-theme-accent"
        style={{
          animation: "blink 0.75s step-end infinite",
          opacity: index === text.length && !reverse ? 0 : 1,
        }}
      />
    </span>
  );
};

const SimpleHero = () => {
  const [screenData, setScreenData] = useState(null);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const buttonRef = useRef(null);
  const containerRef = useRef(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(min-width: 769px) and (max-width: 1024px)");

  useLayoutEffect(() => {
    if (!screenData || !buttonRef.current || !containerRef.current) return;
    const { corners, matrix, currentRotation } = screenData;
    if (!corners || corners.length !== 4 || !matrix) return;
    const btn = buttonRef.current;
    const container = containerRef.current;
    const cw = container.offsetWidth;
    const ch = container.offsetHeight;

    // Расширенная калибровка смещений для разных устройств
    let offsetX = 0;
    let offsetY = 0;
    const width = window.innerWidth;
    if (width <= 480) { // extra small
      offsetX = -0.05;
      offsetY = -0.25;
    } else if (width <= 768) { // small
      offsetX = 0.1;
      offsetY = -0.25;
    } else if (width <= 1024) { // medium (tablet)
      offsetX = -0.04;
      offsetY = 0.22;
    } else if (width <= 1440) { // large (desktop)
      offsetX = -0.02;
      offsetY = 0.01;
    } else if (width <= 1700) { // large (desktop)
      offsetX = -0.08;
      offsetY = -0.15;
    } else { // extra large
      offsetX = -0.16;
      offsetY = -0.22;
    }

    // Центр экрана ноутбука
    const cx = (corners[0].x + corners[1].x + corners[2].x + corners[3].x) / 4;
    const cy = (corners[0].y + corners[1].y + corners[2].y + corners[3].y) / 4;

    btn.style.left = `${(cx + offsetX) * cw}px`;
    btn.style.top = `${(cy + offsetY) * ch}px`;

    // Логика поворота, перспективы и масштабирования кнопки
    const topEdge = Math.abs(corners[0].y - corners[1].y);
    const bottomEdge = Math.abs(corners[2].y - corners[3].y);
    const tiltFactor = (bottomEdge - topEdge) * 2;

    const maxRotation = 30;
    const laptopRotationDegrees = (currentRotation * 180) / Math.PI;
    const perspectiveMultiplier = laptopRotationDegrees > 0 ? -1 : 1;
    const maxPerspectiveAngle = 20;
    const dynamicPerspectiveAngle = (Math.abs(laptopRotationDegrees) / maxRotation) * maxPerspectiveAngle * perspectiveMultiplier;

    const perspectiveDistance = width <= 480 ? 900 : width <= 768 ? 1000 : width <= 1024 ? 1250 : 1500;
    const scaleBase = Math.cos(Math.abs(laptopRotationDegrees) * (Math.PI / 180));
    const baseScale = width <= 480 ? 0.6 : width <= 768 ? 0.65 : width <= 1024 ? 0.7 : 0.75;
    const scale = baseScale + (scaleBase * 0.25);
    const tiltAngleX = tiltFactor * 15;

    btn.style.transform = `
      translate(-50%, -50%)
      perspective(${perspectiveDistance}px)
      rotateY(${-laptopRotationDegrees * 1.3}deg)
      rotateX(${tiltAngleX}deg)
      scale(${scale})
    `;
    btn.style.transformOrigin = 'center center';
    btn.style.transition = 'none';
  }, [screenData]);

  return (
    <section className="min-h-screen pt-20 flex flex-col md:flex-row items-center justify-center">
      <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center">
        {/* Left Column - Text */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left mb-12 md:mb-0">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-theme-accent h-[70px]">
            <TypewriterText text="ARTEM SHYPOSH" />
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-muted-foreground">
            Full-stack Developer
          </p>
          <Button variant="accent" size="lg" asChild>
            <a href="/ArtemShyposh/cv.pdf" target="_blank" rel="noopener noreferrer" download>
              <Download className="mr-2" />
              Download CV
            </a>
          </Button>
        </div>

        {/* Right Column - Laptop Visualization */}
        <div className="w-full md:w-1/2 h-[300px] sm:h-[500px] md:h-[800px] relative">
          <SimpleLaptopSection onScreenPosition={setScreenData} containerRef={containerRef} onModelLoaded={() => setIsModelLoaded(true)} />
          {isModelLoaded && (
            <Link to="/about" style={{ pointerEvents: 'auto' }}>
              <Button
                ref={buttonRef}
                variant={(isMobile || isTablet) ? "outline" : "accent"}
                size={(isMobile || isTablet) ? "icon" : "lg"}
                className={`absolute z-10 ${(isMobile || isTablet) ? 'rounded-full w-10 h-10' : ''}`}
                style={{
                  minWidth: (isMobile || isTablet) ? 'auto' : 120,
                  pointerEvents: 'auto',
                }}
              >
                {(isMobile || isTablet) ? (
                  <Fingerprint className="w-8 h-8 text-yellow-400" />
                ) : (
                  "About Me"
                )}
              </Button>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default SimpleHero;