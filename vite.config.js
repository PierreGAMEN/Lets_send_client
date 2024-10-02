import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        name: 'Lets_send',
        short_name: 'LS',
        start_url: '/',
        display: 'fullscreen', // Mode plein écran
        background_color: '#ffffff',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'LS.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'LS.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      // Autres options de configuration, si nécessaire
    })
  ],
});
