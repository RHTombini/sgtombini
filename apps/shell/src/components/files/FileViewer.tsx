import { useEffect, useRef, useState } from 'react';
import * as pdfjs from 'pdfjs-dist';

pdfjs.GlobalWorkerOptions.workerSrc =
  'https://cdn.jsdelivr.net/npm/pdfjs-dist@4.6.82/build/pdf.worker.min.mjs';

interface Props {
  signedUrl: string;
  mime: string;
}

export function FileViewer({ signedUrl, mime }: Props) {
  if (mime === 'application/pdf') {
    return <PdfViewer signedUrl={signedUrl} />;
  }
  if (mime.startsWith('image/')) {
    return <img src={signedUrl} alt="Anexo" style={{ maxWidth: '100%' }} />;
  }
  return (
    <a href={signedUrl} target="_blank" rel="noreferrer">
      Abrir arquivo
    </a>
  );
}

function PdfViewer({ signedUrl }: { signedUrl: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const pdf = await pdfjs.getDocument(signedUrl).promise;
        const page = await pdf.getPage(1);
        const viewport = page.getViewport({ scale: 1.5 });
        const canvas = canvasRef.current;
        if (!canvas || cancelled) return;
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        await page.render({ canvasContext: ctx, viewport }).promise;
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Falha ao abrir PDF');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [signedUrl]);

  return (
    <div className="shell-pdf-viewer">
      {error ? (
        <span className="ds-field-error">{error}</span>
      ) : (
        <canvas ref={canvasRef} />
      )}
    </div>
  );
}
