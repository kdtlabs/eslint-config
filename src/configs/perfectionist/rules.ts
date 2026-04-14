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

const sortClassesGroup = [
    // 1. Properties — static before instance, readonly before non-readonly, per access modifier
    ['public-static-readonly-property'],
    ['public-static-property', 'public-static-function-property'],
    ['public-readonly-property'],
    ['public-property', 'public-function-property'],
    ['protected-static-readonly-property'],
    ['protected-static-property', 'protected-static-function-property'],
    ['protected-readonly-property'],
    ['protected-property', 'protected-function-property'],
    ['private-static-readonly-property'],
    ['private-static-property', 'private-static-function-property'],
    ['private-readonly-property'],
    ['private-property', 'private-function-property'],

    // 2. Constructor
    'constructor',

    // 3. Static methods — public → protected → private
    'public-static-methods',
    'protected-static-methods',
    'private-static-methods',

    // 4. Getters — public → protected → private
    'public-getters',
    'protected-getters',
    'private-getters',

    // 5. Setters — public → protected → private
    'public-setters',
    'protected-setters',
    'private-setters',

    // 6. Instance methods — public → protected → private
    'public-methods',
    'protected-methods',
    'private-methods',

    // 7. Remaining
    'static-block',
    'index-signature',
    'unknown',
]

const customGroups = [
    { groupName: 'constructor', selector: 'constructor' },
    { groupName: 'public-static-methods', modifiers: ['public', 'static'], newlinesInside: 1, selector: 'method' },
    { groupName: 'protected-static-methods', modifiers: ['protected', 'static'], newlinesInside: 1, selector: 'method' },
    { groupName: 'private-static-methods', modifiers: ['private', 'static'], newlinesInside: 1, selector: 'method' },
    { groupName: 'public-getters', modifiers: ['public'], newlinesInside: 1, selector: 'get-method' },
    { groupName: 'protected-getters', modifiers: ['protected'], newlinesInside: 1, selector: 'get-method' },
    { groupName: 'private-getters', modifiers: ['private'], newlinesInside: 1, selector: 'get-method' },
    { groupName: 'public-setters', modifiers: ['public'], newlinesInside: 1, selector: 'set-method' },
    { groupName: 'protected-setters', modifiers: ['protected'], newlinesInside: 1, selector: 'set-method' },
    { groupName: 'private-setters', modifiers: ['private'], newlinesInside: 1, selector: 'set-method' },
    { groupName: 'public-methods', modifiers: ['public'], newlinesInside: 1, selector: 'method' },
    { groupName: 'protected-methods', modifiers: ['protected'], newlinesInside: 1, selector: 'method' },
    { groupName: 'private-methods', modifiers: ['private'], newlinesInside: 1, selector: 'method' },
]

export const perfectionistOverrideRules: Config['rules'] = {
    '@stylistic/lines-between-class-members': 'off',
    'kdt/sort-union-types': 'off',
    'sort-named-imports': 'off',

    'perfectionist/sort-classes': ['error', { customGroups, groups: sortClassesGroup, newlinesBetween: 1, type: 'unsorted' }],
    'perfectionist/sort-decorators': 'off',
    'perfectionist/sort-enums': 'off',
    'perfectionist/sort-exports': ['error', { order: 'asc', partitionByComment: true, partitionByNewLine: true, type: 'natural' }],
    'perfectionist/sort-imports': ['error', { groups: sortImportsGroups, newlinesBetween: 0, newlinesInside: 0, order: 'asc', partitionByComment: true, type: 'natural' }],
    'perfectionist/sort-interfaces': 'off',
    'perfectionist/sort-intersection-types': ['error', { groups: intersectionTypeGroups, order: 'asc', type: 'natural' }],
    'perfectionist/sort-modules': 'off',
    'perfectionist/sort-named-imports': ['error', { newlinesBetween: 0, newlinesInside: 0, order: 'asc', partitionByComment: true, type: 'natural' }],
    'perfectionist/sort-object-types': 'off',
    'perfectionist/sort-objects': 'off',
    'perfectionist/sort-union-types': ['error', { groups: unionTypeGroups, order: 'asc', type: 'natural' }],
    'perfectionist/sort-variable-declarations': 'off',
}
