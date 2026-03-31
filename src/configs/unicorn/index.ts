import type { EslintConfig } from '../../types'
import unicornPlugin from 'eslint-plugin-unicorn'
import { unicornOverrideRules } from './rules'

export const unicorn: EslintConfig = () => [
    {
        ...unicornPlugin.configs.recommended,
        rules: {
            ...unicornPlugin.configs.recommended.rules,
            ...unicornOverrideRules,
        },
    },
    {
        files: ['**/*.{test,spec}.js?(x)'],
        rules: {
            'unicorn/error-message': 'off',
            'unicorn/no-thenable': 'off',
        },
    },
]

export { unicornOverrideRules }
