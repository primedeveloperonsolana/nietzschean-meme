"use client";

import { ArrowUp } from "lucide-react";
import { TOKEN_CONFIG } from "@/config/token";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-white/5 bg-black py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="font-playfair text-2xl font-bold text-white mb-4">
              {TOKEN_CONFIG.ticker}
            </h3>
            <p className="text-sm text-white/50 leading-relaxed">
              A portal into the abyss of Nietzschean philosophy. Where memes
              meet the eternal recurrence, and the will to power flows on
              Solana.
            </p>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest text-white/40 mb-4">
              Links
            </h4>
            <div className="space-y-2">
              <a
                href={TOKEN_CONFIG.pumpFunUrl(TOKEN_CONFIG.contractAddress)}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-white/40 hover:text-white transition-colors"
              >
                Pump.fun
              </a>
              <a
                href={TOKEN_CONFIG.twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-white/40 hover:text-white transition-colors"
              >
                Twitter / X
              </a>
              <a
                href={TOKEN_CONFIG.dexscreenerUrl(TOKEN_CONFIG.contractAddress)}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-white/40 hover:text-white transition-colors"
              >
                DEX
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest text-white/40 mb-4">
              Contract
            </h4>
            <div className="flex items-center gap-2">
              <code className="text-base text-white/40 bg-white/5 px-16 py-4 rounded break-all cursor-pointer" onClick={() => navigator.clipboard.writeText(TOKEN_CONFIG.contractAddress)}>
                CA: {TOKEN_CONFIG.contractAddress === "Contract_Address" ? "Contract Soon" : TOKEN_CONFIG.contractAddress}
              </code>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-white/5">
          <p className="text-xs text-white/20 mb-4 sm:mb-0">
            &copy; {new Date().getFullYear()} {TOKEN_CONFIG.name}. All rights
            unreserved. Not financial advice. Do your own research. Amor Fati.
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/30 hover:text-white transition-colors"
          >
            Back to top
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
