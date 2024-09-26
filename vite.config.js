import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Lets send",
        short_name: "LS",
        description: "Application pour aider les bars et les restaurateurs à gagner en productivité.",
        theme_color: "#ffffff",
        start_url: "/",
        display: "standalone",
      },
    }),
  ],
});
