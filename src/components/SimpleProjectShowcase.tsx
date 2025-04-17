
import { useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import SimpleProjectCard, { ProjectProps } from "@/components/SimpleProjectCard";

// Sample project data
const projects: ProjectProps[] = [
  {
    title: "UList",
    description: "An application for creating shared lists where you can add people and update lists synchronously in real time.",
    image: "/projects/image/demo1.png",
    link: "https://qurence.github.io/ULists/",
  },
  {
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates.",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    link: "#",
  },
  {
    title: "Crypto Dashboard",
    description: "Real-time cryptocurrency dashboard with advanced analytics.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    link: "#",
  },
  {
    title: "Social Network",
    description: "A social networking platform focusing on privacy and user experience.",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
    link: "#",
  },
  {
    title: "Weather App",
    description: "Location-based weather forecast with interactive maps.",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    link: "#",
  },
  {
    title: "Fitness Tracker",
    description: "Personal fitness tracker with workout plans and progress analytics.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    link: "#",
  },
];

const SimpleProjectShowcase = ({ limit }: { limit?: number }) => {
  const isMobile = useIsMobile();
  const carouselRef = useRef<HTMLDivElement>(null);
  const displayProjects = limit ? projects.slice(0, limit) : projects;

  if (isMobile) {
    return (
      <div className="w-full overflow-hidden">
        <div
          ref={carouselRef}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-4 pb-4"
        >
          {displayProjects.map((project, index) => (
            <div
              key={index}
              className="snap-center shrink-0 w-[280px] sm:w-[320px]"
            >
              <SimpleProjectCard
                {...project}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {displayProjects.map((project, index) => (
        <SimpleProjectCard
          key={index}
          {...project}
        />
      ))}
    </div>
  );
};

export default SimpleProjectShowcase;
