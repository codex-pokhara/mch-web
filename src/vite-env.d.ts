/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly VITE_APP_SERVER_URL: string
  // Add other env variables you use
}
interface ImportMeta {
  readonly env: ImportMetaEnv
}
