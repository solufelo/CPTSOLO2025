/** Feature flags — flip via .env.local without touching routes or deleting auth code. */
export const isAuthEnabled = import.meta.env.VITE_ENABLE_AUTH === 'true';
