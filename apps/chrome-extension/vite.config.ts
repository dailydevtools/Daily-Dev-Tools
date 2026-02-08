import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { writeFileSync, copyFileSync, mkdirSync, existsSync } from 'fs';

// Plugin to copy manifest, icons, and fix output structure
const postBuildPlugin = () => ({
    name: 'post-build',
    closeBundle() {
        const distDir = resolve(__dirname, 'dist');
        const publicDir = resolve(__dirname, 'public');

        // Copy manifest.json
        copyFileSync(
            resolve(publicDir, 'manifest.json'),
            resolve(distDir, 'manifest.json')
        );

        // Create sidepanel.html with correct paths
        const sidepanelHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>DailyDevTools</title>
    <script type="module" src="sidepanel.js"></script>
    <link rel="stylesheet" href="assets/sidepanel-B86nFqxn.css">
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`;
        writeFileSync(resolve(distDir, 'sidepanel.html'), sidepanelHtml);

        // Copy icons folder
        const iconsDistDir = resolve(distDir, 'icons');
        if (!existsSync(iconsDistDir)) {
            mkdirSync(iconsDistDir, { recursive: true });
        }

        // Copy icon files if they exist
        const iconSizes = ['16', '48', '128'];
        iconSizes.forEach(size => {
            const iconPath = resolve(publicDir, 'icons', `icon-${size}.png`);
            if (existsSync(iconPath)) {
                copyFileSync(iconPath, resolve(iconsDistDir, `icon-${size}.png`));
            }
        });
    }
});

export default defineConfig({
    plugins: [react(), postBuildPlugin()],
    base: './',
    build: {
        outDir: 'dist',
        emptyOutDir: true,
        rollupOptions: {
            input: {
                sidepanel: resolve(__dirname, 'src/sidepanel/index.html'),
                background: resolve(__dirname, 'src/background/service-worker.ts'),
            },
            output: {
                entryFileNames: (chunkInfo) => {
                    if (chunkInfo.name === 'background') {
                        return 'background.js';
                    }
                    return 'sidepanel.js';
                },
                chunkFileNames: 'chunks/[name]-[hash].js',
                assetFileNames: 'assets/[name]-[hash].[ext]',
            },
        },
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
            '@dailydevtools/core-utils': resolve(__dirname, '../../packages/core-utils/src'),
        },
    },
});
