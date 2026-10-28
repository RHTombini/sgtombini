/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SGT_URL?: string;
  readonly VITE_WHATSAPP_RH_URL?: string;
  readonly VITE_LINKEDIN_URL?: string;
  readonly VITE_INSTAGRAM_URL?: string;
  readonly VITE_SITE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
