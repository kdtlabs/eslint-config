import type { EslintConfig } from '../../types'
import stylisticPlugin from '@stylistic/eslint-plugin'
import { kdt } from '../../plugins'
import { resolveOptions } from '../../utils'
import { maxLenOptions } from './constants'
import { stylisticRules } from './rules'

export interface StyleOptions {
    indent?: 'tab' | number
    printWidth?: boolean | number
}

export const stylistic: EslintConfig<StyleOptions> = ({ isInEditor }, { indent = 4, ...options } = {}) => {
    const config = stylisticPlugin.configs.customize({
        arrowParens: true,
        blockSpacing: true,
        braceStyle: '1tbs',
        indent: [indent],
        jsx: true,
        quoteProps: 'consistent',
        quotes: 'single',
        semi: false,
    })

    const printWidth = resolveOptions(options.printWidth, false)

    return [
        {
            plugins: { '@stylistic': stylisticPlugin, kdt },
            rules: {
                ...stylisticPlugin.configs['disable-legacy'].rules,
                ...config.rules,
                ...stylisticRules,
                '@stylistic/max-len': printWidth === false ? 'off' : ['error', { ...maxLenOptions, code: printWidth }],
                '@stylistic/no-trailing-spaces': isInEditor ? 'warn' : 'error',
                'kdt/arrow-empty-body-newline': isInEditor ? 'warn' : 'error',
                'kdt/import-single-line': 'error',
                'kdt/object-curly-newline': 'error',
                'kdt/simple-arrow': 'error',
                'kdt/sort-union-types': 'error',
            },
        },
    ]
}

export { stylisticRules }
