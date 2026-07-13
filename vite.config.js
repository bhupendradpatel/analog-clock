/// <reference types="vitest/config" />
import {defineConfig} from 'vitest/config';
import react from '@vitejs/plugin-react';

// `base` must match the GitHub Pages sub-path (repo name) so that asset URLs in
// the built index.html resolve correctly at
// https://bhupendradpatel.github.io/analog-clock/
export default defineConfig({
	base: '/analog-clock/',
	plugins: [react()],
	server: {
		port: 3000,
	},
	test: {
		environment: 'jsdom',
		globals: true,
		setupFiles: './src/setupTests.js',
	},
});
