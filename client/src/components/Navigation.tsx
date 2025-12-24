import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Expertise", href: "#expertise" },
    { label: "Showcase", href: "#showcase" },
    { label: "Process", href: "#process" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled 
          ? "bg-white/90 backdrop-blur-md shadow-sm py-4 border-b border-gray-100" 
          : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="z-50">
          <span className={cn(
            "text-2xl font-bold font-display tracking-tight transition-colors",
            isScrolled ? "text-primary" : "text-primary md:text-white"
          )}>
            Kalvan Works
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-accent-foreground",
                isScrolled ? "text-foreground" : "text-white/90 hover:text-white"
              )}
            >
              {link.label}
            </a>
          ))}
          <Button 
            asChild 
            variant={isScrolled ? "default" : "secondary"}
            className={cn(
              "font-semibold rounded-full px-6",
              !isScrolled && "bg-white text-primary hover:bg-white/90"
            )}
          >
            <a href="#contact">Start a Project</a>
          </Button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden z-50 p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6 text-foreground" />
          ) : (
            <Menu className={cn("w-6 h-6", isScrolled ? "text-foreground" : "text-primary md:text-white")} />
          )}
        </button>

        {/* Mobile Nav Overlay */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 bg-background z-40 flex flex-col items-center justify-center gap-8 md:hidden animate-in fade-in duration-200">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-2xl font-display font-medium text-foreground hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Button asChild size="lg" className="rounded-full px-8 mt-4">
              <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Start a Project</a>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
