// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin';

export default tseslint.config({
  files: ['**/*.ts'],
  extends: [
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    stylistic.configs.recommended,
  ]
}, {
  files: ["**/*.spec.ts"],
  rules: {
    "@typescript-eslint/no-unused-expressions": "off"
  }
})
