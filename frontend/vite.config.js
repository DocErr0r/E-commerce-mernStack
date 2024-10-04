import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
      '/api/':'http://localhost:5678',
      // '/public/':'http://localhost:5678'
      // '/api/':{
      //   target:'http://localhost:5678',
      //   changeOrigin:true,
      //   rewrite:(path)=>path.replace(/^\/api/,'')
      // }
    }
  }
})
