/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BINANCE_FAPI_URL?: string
  readonly VITE_USE_MOCK?: string
  readonly VITE_ADSENSE_CLIENT?: string
  readonly VITE_ADSENSE_SLOT_SIDEBAR?: string
  readonly VITE_ADSENSE_SLOT_CONTENT?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
