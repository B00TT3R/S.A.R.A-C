import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';


createInertiaApp({
    resolve: (name) => resolvePageComponent(`./${name}.tsx`, import.meta.glob('./**/*.tsx')),
    title: ()=>"S.A.R.A",
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
});
