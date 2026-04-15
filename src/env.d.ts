/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_GOOGLE_ADS_ID: string;
  readonly PUBLIC_GOOGLE_ADS_CONVERSION_LABEL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
