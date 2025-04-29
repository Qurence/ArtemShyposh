import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { ThemeToggle } from "@/components/ThemeToggle";
import { MobileMenu } from "@/components/MobileMenu";
import { cn } from "@/lib/utils";
import '../index.css'; 

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Close mobile menu when resizing from mobile to desktop
  useEffect(() => {
    if (!isMobile) {
      setMobileMenuOpen(false);
    }
  }, [isMobile]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Showcase", path: "/showcase" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 md:px-12 bg-background/80 backdrop-blur-md border-b border-border transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-theme-accent transition-colors duration-300 custom-font"
        >
          AS
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  "nav-link text-foreground hover:text-theme-accent transition-colors duration-300",
                  location.pathname === link.path &&
                    "text-theme-accent after:scale-x-100"
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          <ThemeToggle />
        </div>

        {/* Mobile Navigation */}
        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle />
          <MobileMenu 
            isOpen={mobileMenuOpen} 
            onClose={() => setMobileMenuOpen(!mobileMenuOpen)} 
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
