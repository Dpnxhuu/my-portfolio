import React, { useState, useEffect } from "react";
import { Code, Menu, X } from "lucide-react";
import { NAV_LINKS, PERSONAL_INFO } from "../../utils/constants";
import { useScrollSpy, scrollToSection } from "../../hooks/useScrollSpy";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const activeSection = useScrollSpy(NAV_LINKS.map((link) => link.id));

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (sectionId) => {
    scrollToSection(sectionId);
    setIsMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-1000 w-full md:py-4 py-2 transition-all duration-300 
  ${isScrolled ? "bg-black/30 backdrop-blur-lg" : "bg-transparent"}`}
      style={{ transform: "translate3d(0, 0, 0)" }}
    >
      <div className="max-w-330 mx-auto px-5">
        <div className="flex items-center justify-between">
          {/* Logo */}

          <div className=" flex items-center gap-4">
            <Code className="w-6 h-6 text-primary" />

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-2xl cursor-pointer font-bold bg-linear-to-r from-primary via-primary/50 to-primary/30 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
              aria-label="home"
            >
              {PERSONAL_INFO.name.split(" ")[0]}
            </button>
          </div>
          {/* desktop Navigation */}
          <nav className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-base font-medium cursor-pointer transition-all duration-300
              ${activeSection === link.id ? "text-white" : "text-white/70 hover:text-white"}`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* CTA button */}

          <div className="hidden md:flex items-center gap-2">
            <button
              id="hire-button"
              onClick={() => handleNavClick("contact")}
              className="active:scale-95 active:bg-green-600 active:shadow-[0_0_0_4px_rgba(74,222,128,0.25)] px-7 py-3.5 cursor-pointer bg-white text-[#212121] font-medium text-base rounded-2xl border border-white hover:shadow-[0_4px_20px_rgba(74,222,128,0.45)] hover:bg-primary/90 transition-all duration-200"
            >
              Hire Me
            </button>
          </div>
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-4  text-white transition-all duration-200"
            area-label="menu"
            aria-expanded={isMenuOpen.toString()}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6"/>
            ) : (
              <Menu className="w-6 h-6"/>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${isMenuOpen ? "max-h-100 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="bg-black/95 backdrop-blur-lg border-t border-white/10 px-5 py-6 space-y-3">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`block w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-300 ${activeSection === link.id ? "text-white bg-white/10" : "text-white/70 hover:text-white hover:bg-white/5"}`}
            >
              {link.label}
            </button>
          ))}

          <button
            onClick={() => handleNavClick("contact")}
            className="w-full px-7 py-3.5 bg-white text-[#212121] font-medium text-base rounded-2xl border border-white active:scale-95 transition-all duration-150 mt-2"
          >
            Hire Me
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
