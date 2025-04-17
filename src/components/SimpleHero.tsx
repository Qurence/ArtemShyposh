import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import SimpleLaptopSection from "@/components/SimpleLaptopSection";

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
            <a href="/cv.pdf" target="_blank" rel="noopener noreferrer" download>
              <Download className="mr-2" />
              Download CV
            </a>
          </Button>
        </div>

        {/* Right Column - Laptop Visualization */}
        <div className="w-full md:w-1/2 h-[300px] sm:h-[500px] md:h-[800px] relative">
          <SimpleLaptopSection />
        </div>
      </div>
    </section>
  );
};

export default SimpleHero;