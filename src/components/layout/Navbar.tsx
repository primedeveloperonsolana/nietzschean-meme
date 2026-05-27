"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { TOKEN_CONFIG } from "@/config/token";
import { ClientWalletButton } from "./ClientWalletButton";

const navLinks = [
  { label: "nietzschean", href: "#" },
  { label: "Transfigure", href: "#transfigurator" },
  { label: "Meme Culture", href: "#meme-culture" },
  { label: "Influence", href: "#influence" },
  { label: "Works", href: "#works" },
  { label: "Philosophy", href: "#philosophy" },
  { label: "Quotes", href: "#quotes" },
  { label: "Biography", href: "#biography" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/90 backdrop-blur-md border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="w-full px-6 lg:px-12 xl:px-20">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <a
            href="#"
            className="font-playfair text-xl lg:text-2xl font-bold text-white tracking-wider shrink-0"
          >
            {TOKEN_CONFIG.ticker}
          </a>

          {/* Desktop nav */}
          <div className="hidden xl:flex items-center gap-8 2xl:gap-12">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-[11px] uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors duration-300 whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <a
              href={TOKEN_CONFIG.pumpFunUrl(TOKEN_CONFIG.contractAddress)}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center px-5 py-2 text-xs font-semibold uppercase tracking-wider bg-white text-black rounded hover:bg-white/90 transition-colors duration-300"
            >
              Buy Now
            </a>
            <div className="hidden sm:block">
              <ClientWalletButton />
            </div>
            <button
              className="xl:hidden text-white"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="xl:hidden bg-black/95 backdrop-blur-md border-t border-white/5">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="block text-sm uppercase tracking-widest text-white/40 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href={TOKEN_CONFIG.pumpFunUrl(TOKEN_CONFIG.contractAddress)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-white text-black rounded"
            >
              Buy Now
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
