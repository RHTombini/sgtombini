/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_IDENTITY_URL?: string;
  readonly VITE_DOCUMENTS_API_URL?: string;
  readonly VITE_SUPABASE_URL?: string;
  readonly VITE_SUPABASE_ANON_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
