import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Replace with your own Sentry auth token
const sentryAuthToken = "YOUR_SENTRY_AUTH_TOKEN"; // Add your Sentry auth token here

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    sentryVitePlugin({
      org: "jsm-x9",
      project: "javascript-react",
      authToken: sentryAuthToken, // Add your auth token here
      release: "your-release-version", // Optional: Define a version for your release
      telemetry: false, // Optional: Disable Sentry's telemetry
    }),
  ],

  build: {
    sourcemap: true,
  },
});
