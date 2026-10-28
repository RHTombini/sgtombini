import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL as string,
  import.meta.env.VITE_SUPABASE_ANON_KEY as string
);

const BUCKET = 'documents';

export async function uploadDocumentFile(
  documentId: string,
  file: File
): Promise<{ storagePath: string }> {
  const safeName = file.name.replace(/\s+/g, '_');
  const storagePath = `${documentId}/${Date.now()}-${safeName}`;

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(storagePath, file, { upsert: false });

  if (error) throw new Error(error.message);
  return { storagePath };
}

export async function getSignedDownloadUrl(storagePath: string): Promise<string> {
  const { data, error } = await supabase.storage
    .from(BUCKET)
    .createSignedUrl(storagePath, 60 * 10); // 10 minutos

  if (error || !data) throw new Error(error?.message ?? 'Falha ao gerar URL');
  return data.signedUrl;
}
