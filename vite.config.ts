import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: [
            "react",
            "react-dom",
            "react-router-dom",
            "lucide-react",
            "react-chessboard",
            "react-toastify",
          ],
          icp: [
            "@dfinity/agent",
            "@dfinity/candid",
            "@dfinity/identity",
            "@dfinity/principal",
          ],
          identitykit: ["@nfid/identitykit"],
          chess: ["chess.js"],
          filepicker: ["use-file-picker"],
          pusher: ["pusher-js"],
        },
      },
    },
  },
});
