export const TOKEN_CONFIG = {
  name: "nietzschean",
  ticker: "nietzschean",
  contractAddress: "Contract_Address",
  pumpFunUrl: (ca: string) => `https://pump.fun/coin/${ca}`,
  jupiterUrl: (ca: string) => `https://jupiter.swap/sol-${ca}`,
  dexscreenerUrl: (ca: string) => `https://dexscreener.com/solana/${ca}`,
  twitterUrl: "https://x.com/nietzscheanfun",
} as const;

export const TREASURY_WALLET = "BnkMZbR9YpeL7TQqmWWvzzVm1xAN9J81zRkS5aJgdoC8";
export const GENERATION_PRICE_SOL = 0.01;

// Replace this with your own RPC endpoint for production
// Get a free one at: https://helius.xyz (recommended) or https://ankr.com/rpc/solana
export const RPC_URL = "https://mainnet.helius-rpc.com/?api-key=13f8292c-9e0e-4940-9043-5d4553e6c527";
