import type { Config } from 'eslint/config'
import { compilerOptionsSortOrder, exportsSortOrder, gitHooksSortOrder, packageJsonSortOrder, tsconfigRootSortOrder } from './constants'

export const formattingRules: Config['rules'] = {
    'jsonc/array-bracket-newline': ['error', 'consistent'],
    'jsonc/array-bracket-spacing': 'error',
    'jsonc/array-element-newline': ['error', 'consistent'],
    'jsonc/comma-style': 'error',
    'jsonc/key-spacing': ['error', { afterColon: true, beforeColon: false }],
    'jsonc/object-curly-newline': ['error', { consistent: true }],
    'jsonc/object-curly-spacing': ['error', 'always'],
    'jsonc/object-property-newline': ['error', { allowAllPropertiesOnSameLine: true }],
    'jsonc/quotes': ['error', 'double'],
}

export const sortPackageJsonRules: Config['rules'] = {
    'jsonc/sort-array-values': [
        'error',
        {
            order: { type: 'asc' },
            pathPattern: '^files$',
        },
    ],
    'jsonc/sort-keys': [
        'error',
        {
            order: packageJsonSortOrder,
            pathPattern: '^$',
        },
        {
            order: { type: 'asc' },
            pathPattern: '^(?:dev|peer|optional|bundled)?[Dd]ependencies(?:Meta)?$',
        },
        {
            order: { type: 'asc' },
            pathPattern: String.raw`^(?:resolutions|overrides|pnpm\.overrides)$`,
        },
        {
            order: { type: 'asc' },
            pathPattern: String.raw`^workspaces\.catalog$`,
        },
        {
            order: { type: 'asc' },
            pathPattern: String.raw`^workspaces\.catalogs\.[^.]+$`,
        },
        {
            order: exportsSortOrder,
            pathPattern: '^exports.*$',
        },
        {
            order: gitHooksSortOrder,
            pathPattern: '^(?:gitHooks|husky|simple-git-hooks)$',
        },
    ],
}

export const sortTsconfigRules: Config['rules'] = {
    'jsonc/sort-keys': [
        'error',
        {
            order: tsconfigRootSortOrder,
            pathPattern: '^$',
        },
        {
            order: compilerOptionsSortOrder,
            pathPattern: '^compilerOptions$',
        },
    ],
}
