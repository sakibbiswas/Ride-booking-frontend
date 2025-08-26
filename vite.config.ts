


// import { defineConfig } from 'vite'
// import tailwindcss from '@tailwindcss/vite'

// export default defineConfig({
//   plugins: [
//     tailwindcss(),
//   ],
//   build: {
//     outDir: 'dist' // ✅ Vercel expects dist folder
//   },
//   server: {
//     proxy: {
//       '/api': {
//         target: 'http://localhost:5000', // তোমার backend port
//         changeOrigin: true,
//       },
//     },
//   },

// })











// kaj kore 
// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'

// export default defineConfig({
//   plugins: [
//     react(),
//     tailwindcss(),
//   ],
//   // 👇 asset path ঠিক করার জন্য এটা অবশ্যই দরকার
//   base: "/", 
//   build: {
//     outDir: "dist",
//     emptyOutDir: true,
//   },
//   server: {
//     proxy: {
//       "/api": {
//         target: "http://localhost:5000",
//         changeOrigin: true,
//       },
//     },
//   },
// })







import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  base: "/", // important for Vercel deploy
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000", // local dev backend
        changeOrigin: true,
      },
    },
  },
})
