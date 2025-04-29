import { useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import SimpleProjectCard from "@/components/SimpleProjectCard";
import { ProjectProps, projects } from "@/const/projects";

const SimpleProjectShowcase = ({ limit, isShowcase = false }: { limit?: number, isShowcase?: boolean }) => {
  const isMobile = useIsMobile();
  const carouselRef = useRef<HTMLDivElement>(null);
  const displayProjects = limit ? projects.slice(0, limit) : projects;

  if (isMobile && !isShowcase) {
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
    <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'} gap-6`}>
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
