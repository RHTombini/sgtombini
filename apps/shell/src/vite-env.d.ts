/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_IDENTITY_URL?: string;
  readonly VITE_EMPLOYEES_API_URL?: string;
  readonly VITE_DOCUMENTS_API_URL?: string;
  readonly VITE_CRM_API_URL?: string;
  readonly VITE_SUPABASE_URL?: string;
  readonly VITE_SUPABASE_ANON_KEY?: string;
  readonly VITE_INTRANET_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
