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
]

export { unicornOverrideRules }
