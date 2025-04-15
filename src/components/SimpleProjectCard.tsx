
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { cn } from "@/lib/utils";

export type ProjectProps = {
  title: string;
  description: string;
  image: string;
  link: string;
  className?: string;
};

const SimpleProjectCard = ({
  title,
  description,
  image,
  link,
  className,
}: ProjectProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border border-border bg-card text-card-foreground shadow-sm transition-all duration-300 hover:border-theme-accent hover:scale-[1.03]",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4 text-sm">{description}</p>
        <Button variant="accent" size="sm" asChild>
          <a href={link} target="_blank" rel="noopener noreferrer">
            <Eye size={16} />
            View Project
          </a>
        </Button>
      </div>
    </div>
  );
};

export default SimpleProjectCard;
