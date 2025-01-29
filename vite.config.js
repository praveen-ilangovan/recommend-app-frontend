import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Base name of your app
  base: "/", // Replace this with the subdirectory path if needed
})
