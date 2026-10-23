import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Local development uses `/`. GitHub Actions builds use the repository subpath.
export default defineConfig({
  plugins: [react()],
  base: process.env.GITHUB_ACTIONS ? '/minimal-luxury-portfolio/' : '/',
});
