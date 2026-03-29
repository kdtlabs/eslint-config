import type { EslintConfig } from '../types'
import { jsdoc as createConfig } from 'eslint-plugin-jsdoc'

export const jsdoc: EslintConfig = () => createConfig({
    config: 'flat/recommended-typescript-error',
    rules: {
        // --- Redundant with TypeScript (no-types already bans types in JSDoc) ---
        'jsdoc/check-types': 'off',
        'jsdoc/require-throws-type': 'off',
        'jsdoc/require-yields-type': 'off',
        'jsdoc/valid-types': 'off',

        // --- Too noisy (TS types are sufficient, forcing these leads to meaningless docs) ---
        'jsdoc/require-jsdoc': 'off',
        'jsdoc/require-param': 'off',
        'jsdoc/require-param-description': 'off',
        'jsdoc/require-returns': 'off',
        'jsdoc/require-returns-description': 'off',
        'jsdoc/require-yields': 'off',

        // --- Tweak: allow blank lines between tag groups for readability ---
        'jsdoc/tag-lines': 'off',

        // --- Enable: high-value non-recommended rules ---
        'jsdoc/check-indentation': 'error',
        'jsdoc/informative-docs': 'error',
        'jsdoc/no-bad-blocks': 'error',
        'jsdoc/no-blank-blocks': 'error',
        'jsdoc/sort-tags': 'error',
    },
})
