import { useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type ProjectModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  image: string;
  link: string;
  technologies: { name: string; color: string }[];
  className?: string;
};

const ProjectModal = ({
  isOpen,
  onClose,
  title,
  description,
  image,
  link,
  technologies,
  className,
}: ProjectModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm",
        className
      )}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl mx-4 bg-card rounded-lg shadow-lg overflow-hidden animate-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2 z-10"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
        <div className="relative aspect-video">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">{title}</h2>
          <p className="text-muted-foreground mb-6">{description}</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {technologies.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded-full text-sm"
                style={{ backgroundColor: tech.color }}
              >
                {tech.name}
              </span>
            ))}
          </div>
          <Button variant="accent" asChild>
            <a href={link} target="_blank" rel="noopener noreferrer">
              View Project
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal; 