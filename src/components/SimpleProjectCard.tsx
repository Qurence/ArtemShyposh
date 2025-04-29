import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, Pointer } from "lucide-react";
import { cn } from "@/lib/utils";
import ProjectModal from "./ProjectModal";
import { ProjectProps } from "@/const/projects";

const SimpleProjectCard = ({
  title,
  description,
  image,
  link,
  technologies,
  className,
}: ProjectProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        className={cn(
          "overflow-hidden rounded-lg border border-border bg-card text-card-foreground shadow-sm transition-all duration-300 hover:border-theme-accent hover:scale-[1.03] cursor-pointer",
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsModalOpen(true)}
      >
        <div className="relative aspect-video overflow-hidden">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 ease-in-out"
            style={{
              transform: isHovered ? "scale(1.05)" : "scale(1)",
            }}
          />
          <div
            className={cn(
              "absolute inset-0 flex items-center justify-center transition-all duration-300",
              "lg:opacity-0",
              isHovered ? "lg:opacity-100" : "lg:opacity-0"
            )}
          >
            <Pointer
              className="w-16 h-16 drop-shadow-lg text-white animate-pulse [stroke-width:2px]"
              style={{
                animationDuration: "1.5s",
                filter: "drop-shadow(0 0 2px black)",
              }}
            />
          </div>
        </div>
        <div className="p-5">
          <div className="flex flex-col items-center gap-4 lg:flex-row lg:justify-between">
            <h3 className="text-xl font-bold text-center">{title}</h3>
            <Button variant="accent" size="sm" asChild>
              <a href={link} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                <Eye size={16} />
                View Project
              </a>
            </Button>
          </div>
        </div>
      </div>

      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={title}
        description={description}
        image={image}
        link={link}
        technologies={technologies}
      />
    </>
  );
};

export default SimpleProjectCard;
