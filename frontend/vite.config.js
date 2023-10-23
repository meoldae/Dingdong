import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({ registerType: 'autoUpdate',
    injectRegister: "auto",
    workbox: {
      importScripts: ["service-worker.js"], // 이게 제일 중요
    },
    devOptions: {
      enabled: true,
    },
   })
  ],
})
