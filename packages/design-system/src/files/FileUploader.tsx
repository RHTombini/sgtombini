import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  (import.meta.env.VITE_SUPABASE_URL as string) || 'https://placeholder.supabase.co',
  (import.meta.env.VITE_SUPABASE_ANON_KEY as string) || 'placeholder'
);

export interface FileUploaderProps {
  bucket: string;
  path: string;
  onUploaded: (storagePath: string) => void;
  accept?: string;
}

export function FileUploader({ bucket, path, onUploaded, accept }: FileUploaderProps) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (file: File) => {
    setBusy(true);
    setError(null);
    try {
      const storagePath = `${path}/${Date.now()}-${file.name.replace(/\s+/g, '_')}`;
      const { error: upErr } = await supabase.storage
        .from(bucket)
        .upload(storagePath, file, { upsert: false });
      if (upErr) throw new Error(upErr.message);
      onUploaded(storagePath);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha no upload');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="shell-file-uploader">
      <input
        type="file"
        accept={accept}
        disabled={busy}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) void handleFile(file);
        }}
      />
      {busy && <span>Enviando…</span>}
      {error && <span className="ds-field-error">{error}</span>}
    </div>
  );
}
