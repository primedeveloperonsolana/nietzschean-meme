"use client";

import { useRef, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { Upload, Download, RotateCcw, Zap, Eye, Lock } from "lucide-react";
import { useSolanaTransaction } from "@/hooks/useSolanaTransaction";
import { processImage, loadImage } from "@/lib/canvasProcessor";
import { quotes } from "@/data/quotes";
import { useFadeIn } from "@/hooks/useScrollAnimation";
import { ClientWalletButton } from "@/components/layout/ClientWalletButton";

export function Transfigurator() {
  const fadeRef = useFadeIn<HTMLDivElement>(0);
  const { connected } = useWallet();
  const { sendPayment, isLoading, error } = useSolanaTransaction();

  const [uploadedImage, setUploadedImage] = useState<HTMLImageElement | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasPaid, setHasPaid] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const [showFrame, setShowFrame] = useState(true);
  const [selectedQuote, setSelectedQuote] = useState(quotes[0]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    try {
      const img = await loadImage(url);
      setUploadedImage(img);
      setPreviewImage(null);
      setHasPaid(false);
    } catch {
      alert("Failed to load image");
    }
  };

  const generatePreview = () => {
    if (!uploadedImage) return;
    setIsProcessing(true);

    setTimeout(() => {
      try {
        const result = processImage(uploadedImage, {
          frame: showFrame,
          quote: selectedQuote,
        });
        setPreviewImage(result.dataUrl);
      } catch {
        alert("Processing failed");
      }
      setIsProcessing(false);
    }, 500);
  };

  const handleUnlock = async () => {
    const paid = await sendPayment();
    if (paid) {
      setHasPaid(true);
    }
  };

  const downloadImage = () => {
    if (!previewImage) return;
    const link = document.createElement("a");
    link.href = previewImage;
    link.download = `nietzschean-${Date.now()}.png`;
    link.click();
  };

  return (
    <section id="transfigurator" className="relative py-24 sm:py-32 px-4">
      <div ref={fadeRef} className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
            The Transfigurator
          </h2>
          <p className="text-white/60 max-w-xl mx-auto">
            Upload any image. Preview your Nietzschean transfiguration for free.
            Unlock & download the full masterpiece for 0.01 SOL — all proceeds go
            directly to <span className="text-white font-semibold">$nietzschean</span> token buybacks.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Upload & Controls */}
          <div className="space-y-6">
            {!uploadedImage ? (
              <div
                className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 cursor-pointer ${
                  dragActive
                    ? "border-white bg-white/5"
                    : "border-white/10 hover:border-white/20"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload size={40} className="mx-auto mb-4 text-white/40" />
                <p className="text-white/60 mb-2">Drag & drop your image here</p>
                <p className="text-xs text-white/30">or click to browse</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative rounded-xl overflow-hidden border border-white/10">
                  <img
                    src={uploadedImage.src}
                    alt="Uploaded"
                    className="w-full h-auto max-h-[400px] object-contain bg-black"
                  />
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-4">
                  <h4 className="text-xs uppercase tracking-widest text-white/60">
                    Adjustments
                  </h4>

                  <div>
                    <label className="text-xs text-white/40 mb-2 block">
                      Quote
                    </label>
                    <select
                      value={selectedQuote}
                      onChange={(e) => setSelectedQuote(e.target.value)}
                      className="w-full bg-black border border-white/10 rounded px-3 py-2 text-sm text-white focus:border-white/30 outline-none"
                    >
                      {quotes.map((q, i) => (
                        <option key={i} value={q}>
                          {q.length > 60 ? q.slice(0, 60) + "..." : q}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="frame"
                      checked={showFrame}
                      onChange={(e) => setShowFrame(e.target.checked)}
                      className="accent-white"
                    />
                    <label htmlFor="frame" className="text-sm text-white/60">
                      Add frame
                    </label>
                  </div>

                  <button
                    onClick={() => {
                      setUploadedImage(null);
                      setPreviewImage(null);
                      setHasPaid(false);
                    }}
                    className="flex items-center gap-2 text-xs text-white/30 hover:text-white/60 transition-colors"
                  >
                    <RotateCcw size={12} />
                    Reset image
                  </button>
                </div>

                {!previewImage && (
                  <button
                    onClick={generatePreview}
                    disabled={isProcessing}
                    className="w-full py-4 border border-white/30 text-white font-semibold uppercase tracking-wider rounded hover:bg-white/10 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    <Eye size={18} />
                    {isProcessing ? "Transfiguring..." : "Generate Free Preview"}
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Right: Preview & Unlock */}
          <div className="space-y-6">
            <div className="relative min-h-[400px] bg-white/5 border border-white/10 rounded-xl flex items-center justify-center overflow-hidden">
              {previewImage ? (
                <>
                  <img
                    src={previewImage}
                    alt="Transfigured"
                    className="w-full h-auto max-h-[500px] object-contain"
                  />
                  {!hasPaid && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                      <div className="text-center">
                        <Lock size={32} className="mx-auto mb-3 text-white/60" />
                        <p className="text-sm uppercase tracking-widest text-white/60">
                          Preview Mode
                        </p>
                        <p className="text-xs text-white/30 mt-1">
                          Pay 0.01 SOL to unlock & download
                        </p>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center p-8">
                  <Zap size={40} className="mx-auto mb-4 text-white/20" />
                  <p className="text-white/30">
                    {uploadedImage
                      ? "Click 'Generate Free Preview' to see your transfiguration"
                      : "Upload an image to begin"}
                  </p>
                </div>
              )}

              {isProcessing && !previewImage && (
                <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-sm text-white/60">
                      Communing with the Abyss...
                    </p>
                  </div>
                </div>
              )}
            </div>

            {previewImage && (
              <div className="space-y-3">
                {!connected ? (
                  <ClientWalletButton />
                ) : !hasPaid ? (
                  <>
                    <button
                      onClick={handleUnlock}
                      disabled={isLoading}
                      className="w-full py-4 bg-white text-black font-semibold uppercase tracking-wider rounded hover:bg-white/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading
                        ? "Processing Transaction..."
                        : "Unlock & Download — 0.01 SOL"}
                    </button>
                    <p className="text-xs text-center text-white/30">
                      All proceeds go directly to{" "}
                      <span className="text-white/50 font-semibold">$nietzschean</span>{" "}
                      token buybacks. No dev allocation. Pure community fuel.
                    </p>
                  </>
                ) : (
                  <button
                    onClick={downloadImage}
                    className="w-full py-4 bg-white text-black font-semibold uppercase tracking-wider rounded hover:bg-white/90 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Download size={18} />
                    Download Masterpiece
                  </button>
                )}

                {error && (
                  <p className="text-sm text-white/60 text-center">{error}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
