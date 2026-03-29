import type { EslintConfig } from '../types'
import pluginToml from 'eslint-plugin-toml'

export interface TomlConfigOptions {
    indent?: number
}

export const toml: EslintConfig<TomlConfigOptions> = (_, { indent = 4 } = {}) => [
    ...pluginToml.configs['flat/standard'],
    {
        files: ['**/*.toml'],
        rules: {
            'toml/array-element-newline': ['error', 'consistent'],
            'toml/indent': ['error', indent],
            'toml/no-mixed-type-in-array': 'error',
        },
    },
]
