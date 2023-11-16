import { defineConfig } from "vite"
import path from "path";
import react from "@vitejs/plugin-react"
import { VitePWA } from "vite-plugin-pwa"

export default defineConfig({
  base: "/",
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      workbox: {
        importScripts: ["service-worker.js", "firebase-messaging-sw.js"], // 이게 제일 중요
        // importScripts: ["service-worker.js"], // 인앱브라우저 문제
      },
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: 'Ding Dong',
        short_name: 'Ding Dong',
        description: '딩동! 편지왔어요. 딩동! 놀러왔어요',
        start_url: '/',
        display: 'standalone',
        icons: [
          {
            src: "/assets/icons/pwa_icon.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },

    }),
  ],
  server: {
    host: "0.0.0.0",
    port: 3000,
    cors: true,
    // proxy: {
    //   '/ws': {
    //     target: 'ws://:8080', 
    //     ws: true,
    //     changeOrigin: true, 
    //   },
    // }
  },
  resolve: {
    alias: [
      { find: "@", replacement: path.resolve(__dirname, "src") },
      { find: "public", replacement: path.resolve(__dirname, "public") },
    ],
  },
  define: {
    global: "window",
  },
})
