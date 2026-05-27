"use client";

import { useEffect, useState } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export function ClientWalletButton() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="px-3 py-1.5 text-xs uppercase tracking-wider border border-white/30 rounded text-white/50 bg-transparent">
        Connect Wallet
      </button>
    );
  }

  return <WalletMultiButton />;
}
