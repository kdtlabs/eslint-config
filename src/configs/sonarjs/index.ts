import type { Config } from 'eslint/config'
import type { EslintConfig } from '../../types'
import sonarjsPlugin from 'eslint-plugin-sonarjs'
import { sonarjsOverrideRules } from './rules'

const recommended = sonarjsPlugin.configs?.recommended as Config

export const sonarjs: EslintConfig = () => [
    {
        ...recommended,
        rules: {
            ...recommended.rules,
            ...sonarjsOverrideRules,
        },
    },
]

export { sonarjsOverrideRules }
