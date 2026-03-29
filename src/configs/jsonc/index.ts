import type { Config } from 'eslint/config'
import type { EslintConfig } from '../../types'
import pluginJsonc from 'eslint-plugin-jsonc'
import { jsoncFiles } from './constants'
import { formattingRules as baseRules, sortPackageJsonRules, sortTsconfigRules } from './rules'

export interface JsoncConfigOptions {
    indent?: number
    sortPackageJson?: boolean
    sortTsconfig?: boolean
}

export const jsonc: EslintConfig<JsoncConfigOptions> = (_, { indent = 4, sortPackageJson = true, sortTsconfig = true } = {}) => {
    const baseConfigs = pluginJsonc.configs['flat/recommended-with-json']
    const jsonRules = baseConfigs[2]?.rules
    const jsoncRules = pluginJsonc.configs['flat/recommended-with-jsonc'][2]?.rules
    const json5Rules = pluginJsonc.configs['flat/recommended-with-json5'][2]?.rules

    const formattingRules: Config['rules'] = {
        ...baseRules,
        'jsonc/indent': ['error', indent],
    }

    const configs: Config[] = [
        ...baseConfigs.slice(0, 2),

        // Strict JSON: recommended-with-json rules + formatting
        {
            files: ['**/*.json'],
            ignores: jsoncFiles,
            rules: {
                ...jsonRules,
                ...formattingRules,
                'jsonc/comma-dangle': ['error', 'never'],
            },
        },

        // JSONC (tsconfig, .vscode, etc.): recommended-with-jsonc rules + formatting
        {
            files: ['**/*.jsonc', ...jsoncFiles],
            rules: {
                ...jsoncRules,
                ...formattingRules,
                'jsonc/comma-dangle': ['error', 'always-multiline'],
            },
        },

        // JSON5: recommended-with-json5 rules + formatting
        {
            files: ['**/*.json5'],
            rules: {
                ...json5Rules,
                ...formattingRules,
                'jsonc/comma-dangle': ['error', 'always-multiline'],
            },
        },
    ]

    if (sortPackageJson) {
        configs.push(
            {
                files: ['**/package.json'],
                rules: sortPackageJsonRules,
            },
        )
    }

    if (sortTsconfig) {
        configs.push(
            {
                files: ['**/[jt]sconfig.json', '**/[jt]sconfig.*.json'],
                rules: sortTsconfigRules,
            },
        )
    }

    return configs
}
