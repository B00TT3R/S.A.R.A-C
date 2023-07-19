import { Config } from 'tailwindcss';

import formsPlugin from '@tailwindcss/forms';

const config: Config = {
  content: [
    './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
    './storage/framework/views/*.php',
    './resources/views/**/*.blade.php',
    './resources/js/**/*.tsx',
  ],
  theme: {
    extend: {
      gap: {
        inherit: 'inherit',
      },
    },
  },
  plugins: [formsPlugin],
};

export default config;
