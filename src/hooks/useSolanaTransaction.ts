"use client";

import { useCallback, useState } from "react";
import {
  Connection,
  PublicKey,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import { TREASURY_WALLET, GENERATION_PRICE_SOL, RPC_URL } from "@/config/token";

export function useSolanaTransaction() {
  const { publicKey, signTransaction, connected } = useWallet();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const sendPayment = useCallback(async () => {
    if (!connected || !publicKey || !signTransaction) {
      setError("Please connect your wallet first");
      return false;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const connection = new Connection(RPC_URL, "confirmed");

      const recipient = new PublicKey(TREASURY_WALLET);
      const amount = GENERATION_PRICE_SOL * LAMPORTS_PER_SOL;

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: recipient,
          lamports: amount,
        })
      );

      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = publicKey;

      const signed = await signTransaction(transaction);
      const signature = await connection.sendRawTransaction(signed.serialize());

      await connection.confirmTransaction(signature, "confirmed");

      setSuccess(true);
      setIsLoading(false);
      return true;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Transaction failed"
      );
      setIsLoading(false);
      return false;
    }
  }, [connected, publicKey, signTransaction]);

  return { sendPayment, isLoading, error, success };
}
