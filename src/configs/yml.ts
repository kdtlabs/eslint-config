import type { EslintConfig } from '../types'
import pluginYml from 'eslint-plugin-yml'

export interface YmlConfigOptions {
    indent?: number
}

export const yml: EslintConfig<YmlConfigOptions> = (_, { indent = 4 } = {}) => [
    ...pluginYml.configs['flat/standard'],
    {
        files: ['**/*.yml', '**/*.yaml'],
        rules: {
            'yml/indent': ['error', indent],
            'yml/no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 0 }],
            'yml/require-string-key': 'error',
        },
    },
]
