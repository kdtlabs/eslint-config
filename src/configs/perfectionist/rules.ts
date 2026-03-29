import type { Config } from 'eslint/config'

const unionTypeGroups = ['named', 'import', 'operator', 'conditional', 'function', 'object', 'tuple', 'intersection', 'union', 'literal', 'keyword', 'nullish']
const intersectionTypeGroups = ['named', 'import', 'operator', 'conditional', 'function', 'object', 'tuple', 'union', 'intersection', 'literal', 'keyword', 'nullish']

const sortImportsGroups = [
    'type-import',
    ['type-parent', 'type-sibling', 'type-index', 'type-internal'],
    'value-builtin',
    'value-external',
    'value-internal',
    ['value-parent', 'value-sibling', 'value-index'],
    'side-effect',
    'ts-equals-import',
    'unknown',
]

export const perfectionistOverrideRules: Config['rules'] = {
    'import-x/order': 'off',
    'kdt/sort-union-types': 'off',
    'sort-imports': 'off',
    'sort-named-imports': 'off',

    'perfectionist/sort-decorators': 'off',
    'perfectionist/sort-enums': ['error', { order: 'asc', partitionByComment: true, type: 'natural' }],
    'perfectionist/sort-exports': ['error', { order: 'asc', partitionByComment: true, partitionByNewLine: true, type: 'natural' }],
    'perfectionist/sort-imports': ['error', { groups: sortImportsGroups, newlinesBetween: 0, newlinesInside: 0, order: 'asc', partitionByComment: true, type: 'natural' }],
    'perfectionist/sort-interfaces': ['error', { order: 'asc', partitionByComment: true, type: 'natural' }],
    'perfectionist/sort-intersection-types': ['error', { groups: intersectionTypeGroups, order: 'asc', type: 'natural' }],
    'perfectionist/sort-modules': 'off',
    'perfectionist/sort-named-imports': ['error', { newlinesBetween: 0, newlinesInside: 0, order: 'asc', partitionByComment: true, type: 'natural' }],
    'perfectionist/sort-object-types': ['error', { order: 'asc', partitionByComment: true, type: 'natural' }],
    'perfectionist/sort-objects': ['error', { order: 'asc', partitionByComment: true, partitionByNewLine: true, type: 'natural' }],
    'perfectionist/sort-union-types': ['error', { groups: unionTypeGroups, order: 'asc', type: 'natural' }],
    'perfectionist/sort-variable-declarations': 'off',
}
