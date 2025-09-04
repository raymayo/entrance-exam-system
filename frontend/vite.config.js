import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  optimizeDeps: {
    include: ["html-to-image"],
  },
  server: {
    // Specify the development server port
    port: 8080,
  },
  // Base name of your app
  base: "/",
})
