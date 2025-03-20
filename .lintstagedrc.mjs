import { relative } from 'node:path';
import { cwd } from 'node:process';

/**
 * @param {string[]} filenames
 * @returns {string}
 */
const buildEslintCommand = (filenames) =>
  `next lint --file ${filenames.map((f) => relative(cwd(), f)).join(' --file ')}`;

/**
 * @type {import('lint-staged').Configuration}
 */
const config = {
  '*': ['prettier --check --ignore-unknown'],
  '*.{js,jsx,ts,tsx,cjs,mjs}': [buildEslintCommand],
};

export default config;
