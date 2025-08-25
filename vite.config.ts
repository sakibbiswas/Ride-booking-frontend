// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })



import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  build: {
    outDir: 'dist' // ✅ Vercel expects dist folder
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // তোমার backend port
        changeOrigin: true,
      },
    },
  },

})