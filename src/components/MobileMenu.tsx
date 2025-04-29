import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Showcase", path: "/showcase" },
];

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const location = useLocation();

  return (
    <>
      <button
        onClick={onClose}
        className="text-foreground hover:text-theme-accent transition-colors duration-300"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}

      {/* Menu */}
      <div
        className={cn(
          "fixed top-0 left-0 right-0 h-screen bg-background z-50 transform transition-transform duration-300 ease-in-out md:hidden",
          isOpen ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <div className="h-full max-w-7xl mx-auto px-6 py-4 flex flex-col">
          <div className="flex items-center justify-end mb-8">
            <button
              onClick={onClose}
              className="text-foreground hover:text-theme-accent transition-colors duration-300"
            >
              <X size={24} />
            </button>
          </div>

          <nav className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  "text-xl py-2 px-4 text-foreground hover:text-theme-accent transition-colors duration-300",
                  location.pathname === link.path && "text-theme-accent"
                )}
                onClick={onClose}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
} 