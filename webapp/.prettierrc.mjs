import parent from '../.prettierrc.mjs';

/** @type {import("prettier").Config} */
export default {
  ...parent,
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindFunctions: ['cn', 'cva'],
  tailwindStylesheet: './src/index.css',
};
