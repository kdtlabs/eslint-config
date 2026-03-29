import type { EslintConfig } from '../../types'
import regexpPlugin from 'eslint-plugin-regexp'
import { regexpOverrideRules } from './rules'

export const regexp: EslintConfig = () => [
    {
        ...regexpPlugin.configs['flat/recommended'],
        rules: {
            ...regexpPlugin.configs['flat/recommended'].rules,
            ...regexpOverrideRules,
        },
    },
]

export { regexpOverrideRules }
