import type { EslintConfig } from '../../types'
import comments from '@eslint-community/eslint-plugin-eslint-comments'
import jsPlugin from '@eslint/js'
import antfuPlugin from 'eslint-plugin-antfu'
import importX from 'eslint-plugin-import-x'
import unusedImports from 'eslint-plugin-unused-imports'
import { GLOB_EXCLUDE } from '../../constants'
import { getEnvironmentGlobals } from '../../utils'
import { javascriptRules, javascriptRulesInEditor } from './rules'

// @ts-expect-error: no types
import promisePlugin from 'eslint-plugin-promise'

export const javascript: EslintConfig = ({ environments: environment, isInEditor }) => [
    { ignores: GLOB_EXCLUDE },
    {
        extends: ['js/recommended', 'import-x/flat/recommended', 'promise/recommended'],
        languageOptions: {
            ecmaVersion: 'latest',
            globals: getEnvironmentGlobals(environment),
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
                ecmaVersion: 'latest',
                sourceType: 'module',
            },
            sourceType: 'module',
        },
        linterOptions: {
            reportUnusedDisableDirectives: true,
        },
        plugins: {
            '@eslint-community/eslint-comments': comments,
            'antfu': antfuPlugin,
            'import-x': importX,
            'js': jsPlugin,
            'promise': promisePlugin,
            'unused-imports': unusedImports,
        },
        rules: {
            ...javascriptRules,
            ...comments.configs.recommended.rules,
            ...isInEditor ? javascriptRulesInEditor : {},
        },
    },
    {
        files: [`scripts/**/*.?([cm])[jt]s?(x)`],
        rules: {
            'no-alert': 'off',
            'no-console': 'off',
        },
    },
    {
        files: ['**/*.{test,spec}.js?(x)'],
        rules: {
            'no-unused-expressions': 'off',
        },
    },
    {
        files: ['**/bin/**/*'],
        rules: {
            'antfu/no-import-dist': 'off',
            'antfu/no-import-node-modules-by-path': 'off',
        },
    },
]

export { javascriptRules, javascriptRulesInEditor }
