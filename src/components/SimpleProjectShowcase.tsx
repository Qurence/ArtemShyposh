import { useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import SimpleProjectCard from "@/components/SimpleProjectCard";
import { ProjectProps, projects } from "@/const/projects";
import { motion } from "framer-motion";

const SimpleProjectShowcase = ({ limit, isShowcase = false }: { limit?: number, isShowcase?: boolean }) => {
  const isMobile = useIsMobile();
  const carouselRef = useRef<HTMLDivElement>(null);
  const displayProjects = limit ? projects.slice(0, limit) : projects;

  if (isMobile && !isShowcase) {
    return (
      <div className="w-full overflow-hidden">
        <motion.div
          ref={carouselRef}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-4 pb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          onViewportLeave={() => ({ opacity: 0 })}
          viewport={{ amount: 0.1 }}
          transition={{ duration: 0.5 }}
        >
          {displayProjects.map((project, index) => (
            <motion.div
              key={index}
              className="snap-center shrink-0 w-[280px] sm:w-[320px]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              onViewportLeave={() => ({ opacity: 0, y: 20 })}
              viewport={{ amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <SimpleProjectCard
                {...project}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div 
      className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'} gap-6`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      onViewportLeave={() => ({ opacity: 0 })}
      viewport={{ amount: 0.2 }}
      transition={{ duration: 0.5 }}
    >
      {displayProjects.map((project, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          onViewportLeave={() => ({ opacity: 0, y: 20 })}
          viewport={{ amount: 0.1 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <SimpleProjectCard
            {...project}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default SimpleProjectShowcase;
