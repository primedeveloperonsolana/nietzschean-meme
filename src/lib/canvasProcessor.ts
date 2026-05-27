export interface ProcessedImage {
  dataUrl: string;
  width: number;
  height: number;
}

export interface OverlayItem {
  x: number;
  y: number;
  scale: number;
  rotation: number;
}

export async function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

export function processImage(
  originalImage: HTMLImageElement,
  overlays: {
    mustache?: OverlayItem;
    frame?: boolean;
    background?: string;
    quote?: string;
  }
): ProcessedImage {
  const canvas = document.createElement("canvas");
  const size = Math.max(originalImage.width, originalImage.height, 800);
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get canvas context");

  // Fill background
  if (overlays.background) {
    ctx.fillStyle = overlays.background;
    ctx.fillRect(0, 0, size, size);
  } else {
    ctx.fillStyle = "#0a0a0a";
    ctx.fillRect(0, 0, size, size);
  }

  // Calculate image draw size to fit centered
  const imgRatio = originalImage.width / originalImage.height;
  let drawW = size * 0.8;
  let drawH = drawW / imgRatio;
  if (drawH > size * 0.8) {
    drawH = size * 0.8;
    drawW = drawH * imgRatio;
  }
  const drawX = (size - drawW) / 2;
  const drawY = (size - drawH) / 2;

  // Draw original image with B&W filters
  ctx.save();
  ctx.filter = "contrast(1.3) grayscale(0.8) brightness(0.9)";
  ctx.drawImage(originalImage, drawX, drawY, drawW, drawH);
  ctx.restore();

  // Apply vignette
  const vignette = ctx.createRadialGradient(
    size / 2,
    size / 2,
    size * 0.3,
    size / 2,
    size / 2,
    size * 0.7
  );
  vignette.addColorStop(0, "rgba(0,0,0,0)");
  vignette.addColorStop(1, "rgba(0,0,0,0.6)");
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, size, size);

  // Apply film grain (light)
  const imageData = ctx.getImageData(0, 0, size, size);
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const grain = (Math.random() - 0.5) * 20;
    data[i] = Math.min(255, Math.max(0, data[i] + grain));
    data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + grain));
    data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + grain));
  }
  ctx.putImageData(imageData, 0, 0);

  // Add border/frame if requested
  if (overlays.frame) {
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 3;
    ctx.strokeRect(drawX - 8, drawY - 8, drawW + 16, drawH + 16);

    // Inner decorative line
    ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
    ctx.lineWidth = 1;
    ctx.strokeRect(drawX - 4, drawY - 4, drawW + 8, drawH + 8);
  }

  // Add quote if provided
  if (overlays.quote) {
    ctx.save();
    ctx.font = "italic 24px 'Playfair Display', serif";
    ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
    ctx.textAlign = "center";
    ctx.shadowColor = "rgba(0,0,0,0.8)";
    ctx.shadowBlur = 8;

    const maxWidth = size * 0.7;
    const words = overlays.quote.split(" ");
    const lines: string[] = [];
    let currentLine = "";

    for (const word of words) {
      const testLine = currentLine ? currentLine + " " + word : word;
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) lines.push(currentLine);

    const lineHeight = 34;
    const startY = size - 80 - (lines.length - 1) * lineHeight;

    lines.forEach((line, i) => {
      ctx.fillText(line, size / 2, startY + i * lineHeight);
    });

    ctx.restore();
  }

  return {
    dataUrl: canvas.toDataURL("image/png"),
    width: size,
    height: size,
  };
}
