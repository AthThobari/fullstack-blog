import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
base: '/blog',
server: {
host: true,
port: 5173,
allowedHosts: [
"coursework.web.id",
"ibnujarir.my.id",
],
},
  plugins: [react(),
tailwindcss(),
],
})
