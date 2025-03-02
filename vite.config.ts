import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/fetch-dogs/', // 👈 Ensure this matches your GitHub repository name
  plugins: [react()],
  build: {
    outDir: 'dist', // ✅ Ensures correct output folder
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      }
    },
    chunkSizeWarningLimit: 1000, // ✅ Adjusts the chunk size warning limit
  },
  server: {
    open: true,
  },
});
