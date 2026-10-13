import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  className?: string;
}

const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "performances", label: "Calendar" },
  { id: "media", label: "Media" },
  { id: "contact", label: "Contact" },
];

const scrollToSection = (id: string) => {
  if (id === "home") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  // scroll-padding-top in index.css keeps the section clear of the header
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

const Header: React.FC<HeaderProps> = ({ className }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock page scroll and allow Escape to close while the mobile menu is open
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setIsMobileMenuOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "py-2 md:py-3 bg-white/90 backdrop-blur-md border-b border-gray-200/20 shadow-sm"
            : "py-3 md:py-5 bg-transparent text-white",
          className
        )}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-end">
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                className="py-2 text-sm font-medium hover:text-orangery-500 transition-colors"
                onClick={() => scrollToSection(item.id)}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button
            className="md:hidden -mr-2 flex h-11 w-11 items-center justify-center"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={isMobileMenuOpen}
          >
            {/* bg-current follows the header text colour, so it stays visible over the hero photo */}
            <span className="block w-6">
              <span className="block w-6 h-0.5 bg-current mb-1.5" />
              <span className="block w-6 h-0.5 bg-current mb-1.5" />
              <span className="block w-4 h-0.5 bg-current" />
            </span>
          </button>
        </div>
      </header>

      {/* Mobile menu — rendered outside <header> so its backdrop-blur can't trap this fixed overlay */}
      <div
        className={cn(
          "fixed inset-0 z-[60] bg-white text-foreground flex flex-col px-6 pt-20 pb-10 transition-transform duration-500 ease-in-out md:hidden",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full invisible"
        )}
        aria-hidden={!isMobileMenuOpen}
      >
        <button
          className="absolute top-3 right-2 flex h-11 w-11 items-center justify-center"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-label="Close menu"
        >
          <span className="relative block w-6 h-6">
            <span className="absolute left-0 top-1/2 block w-6 h-0.5 bg-foreground rotate-45" />
            <span className="absolute left-0 top-1/2 block w-6 h-0.5 bg-foreground -rotate-45" />
          </span>
        </button>

        <nav className="flex flex-col">
          {navItems.map((item) => (
            <button
              key={item.id}
              className="py-4 text-left text-2xl font-serif border-b border-gray-100 hover:text-orangery-500 transition-colors"
              onClick={() => {
                setIsMobileMenuOpen(false);
                // Wait for the scroll lock to release before scrolling
                setTimeout(() => scrollToSection(item.id), 0);
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Header;
