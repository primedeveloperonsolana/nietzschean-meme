import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { SolanaProvider } from "@/components/layout/SolanaProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "nietzschean | The Will to Power on Solana",
  description:
    "A memecoin portal into the abyss of Nietzschean philosophy. Become the Übermensch. Embrace the Eternal Recurrence. Will to Power on Solana.",
  openGraph: {
    title: "nietzschean | The Will to Power",
    description: "A memecoin portal into Nietzschean philosophy",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "nietzschean | The Will to Power",
    description: "A memecoin portal into Nietzschean philosophy",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} antialiased dark`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-black text-white" suppressHydrationWarning>
        <SolanaProvider>{children}</SolanaProvider>
      </body>
    </html>
  );
}
