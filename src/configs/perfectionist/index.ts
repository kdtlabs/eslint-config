import type { EslintConfig } from '../../types'
import perfectionistPlugin from 'eslint-plugin-perfectionist'
import { perfectionistOverrideRules } from './rules'

export const perfectionist: EslintConfig = () => [
    {
        ...perfectionistPlugin.configs['recommended-natural'],
        rules: {
            ...perfectionistPlugin.configs['recommended-natural'].rules,
            ...perfectionistOverrideRules,
        },
    },
]

export { perfectionistOverrideRules }
