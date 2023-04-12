import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react-swc';
import path from 'path'

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.tsx',
            refresh: true,
        }),
        react(),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './resources/js'),
            '<>': path.resolve(__dirname, './resources/js/Components'),
            "&": path.resolve(__dirname, 'resources/js/Sections/Main/Pages'),
            '-ts': path.resolve(__dirname, './resources/js/Types'),
        },
    },
});
