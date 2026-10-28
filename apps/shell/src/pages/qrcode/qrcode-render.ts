import QRCode from 'qrcode';

export interface RenderOptions {
  payload: string;
  color: string;
  logoUrl: string | null;
  size?: number;
}

export async function renderQrToCanvas(
  canvas: HTMLCanvasElement,
  options: RenderOptions
): Promise<void> {
  const size = options.size ?? 320;

  await QRCode.toCanvas(canvas, options.payload, {
    width: size,
    margin: 2,
    errorCorrectionLevel: 'H',
    color: {
      dark: options.color,
      light: '#FFFFFF',
    },
  });

  if (!options.logoUrl) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const img = await loadImage(options.logoUrl);
  const logoSize = Math.round(size * 0.22);
  const pad = Math.round(logoSize * 0.12);

  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  const cx = size / 2;
  const cy = size / 2;
  const r = logoSize / 2 + pad;
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fill();

  ctx.drawImage(img, cx - logoSize / 2, cy - logoSize / 2, logoSize, logoSize);
}

function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Falha ao carregar logo'));
    img.src = url;
  });
}

export function downloadCanvasAsPng(canvas: HTMLCanvasElement, fileName: string): void {
  const url = canvas.toDataURL('image/png');
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName.endsWith('.png') ? fileName : `${fileName}.png`;
  a.click();
}
