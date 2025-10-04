import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navItems = [{
    name: "About",
    href: "#about"
  }, {
    name: "Experience",
    href: "#experience"
  }, {
    name: "Projects",
    href: "#projects"
  }, {
    name: "Tech",
    href: "#tech"
  }, {
    name: "Education",
    href: "#education"
  }, {
    name: "Achievements",
    href: "#achievements"
  }, {
    name: "Certifications",
    href: "#certifications"
  }, {
    name: "Gallery",
    href: "#gallery"
  }, {
    name: "Contact",
    href: "#contact"
  }];
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth"
      });
      setIsMobileMenuOpen(false);
    }
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  return <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-card/95 backdrop-blur-md shadow-soft" : "bg-transparent"}`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <button onClick={scrollToTop} className="text-2xl font-bold text-foreground hover:text-accent transition-colors">&lt;DS&gt;</button>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-6 items-center">
            {navItems.map(item => <button key={item.name} onClick={() => scrollToSection(item.href)} className="text-sm font-medium text-foreground/80 hover:text-accent transition-colors">
                {item.name}
              </button>)}
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button & Theme Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && <div className="md:hidden mt-4 pb-4 flex flex-col gap-3">
            {navItems.map(item => <button key={item.name} onClick={() => scrollToSection(item.href)} className="text-left text-sm font-medium text-foreground/80 hover:text-accent transition-colors py-2">
                {item.name}
              </button>)}
          </div>}
      </div>
    </nav>;
};
export default Navbar;