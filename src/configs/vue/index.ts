import type { Linter } from 'eslint'
import type { Config } from 'eslint/config'
import type { EslintConfig } from '../../types'
import vuePlugin from 'eslint-plugin-vue'
import typescriptEslint from 'typescript-eslint'
import { vueOverrideRules } from './rules'

export interface VueConfigOptions {
    indent?: number
    stylisticConfigs?: Config | Config[]
}

export function getStylisticRules(stylisticConfigs: Config[]): Linter.RulesRecord {
    const stylisticRules: Linter.RulesRecord = {}

    for (const config of stylisticConfigs) {
        if (config.rules) {
            for (const [ruleName, ruleOptions] of Object.entries(config.rules)) {
                if (ruleOptions) {
                    const name = ruleName.startsWith('@stylistic/') ? ruleName.replace('@stylistic/', '') : ruleName

                    if (name in vuePlugin.rules) {
                        stylisticRules[`vue/${name}`] = ruleOptions
                    }
                }
            }
        }
    }

    return stylisticRules
}

export const vue: EslintConfig<VueConfigOptions> = (_context, { indent = 4, stylisticConfigs = [] } = {}) => {
    const recommended = vuePlugin.configs['flat/recommended-error']

    return [
        ...recommended.map((config) => ({ ...config, files: config.files ?? ['**/*.vue'] })),
        {
            files: ['**/*.vue'],
            languageOptions: {
                parserOptions: {
                    ecmaFeatures: {
                        jsx: true,
                    },
                    extraFileExtensions: ['.vue'],
                    parser: typescriptEslint.parser,
                    sourceType: 'module',
                },
            },
            rules: {
                ...getStylisticRules(Array.isArray(stylisticConfigs) ? stylisticConfigs : [stylisticConfigs]),
                ...vueOverrideRules,
                '@stylistic/indent': 'off',
                'vue/html-comment-indent': ['error', indent],
                'vue/html-indent': ['error', indent],
                'vue/script-indent': ['error', indent, { baseIndent: 1, switchCase: 1 }],
            },
        },
    ]
}

export { vueOverrideRules }
