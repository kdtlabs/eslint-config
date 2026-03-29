import type { EslintConfig } from '../../types'
import vuePlugin from 'eslint-plugin-vue'
import typescriptEslint from 'typescript-eslint'
import { vueOverrideRules } from './rules'

export interface VueConfigOptions {
    indent?: number
}

export const vue: EslintConfig<VueConfigOptions> = (_context, options = {}) => {
    const { indent = 4 } = options
    const recommended = vuePlugin.configs['flat/recommended-error']

    return [
        ...recommended.map((config) => ({
            ...config,
            files: config.files ?? ['**/*.vue'],
        })),
        {
            files: ['**/*.vue'],
            languageOptions: {
                parserOptions: {
                    parser: typescriptEslint.parser,
                },
            },
            rules: {
                ...vueOverrideRules,
                'vue/html-comment-indent': ['error', indent],
                'vue/html-indent': ['error', indent],
                'vue/script-indent': ['error', indent, { baseIndent: 0, switchCase: 1 }],
            },
        },
    ]
}

export { vueOverrideRules }
