import type { Config } from 'eslint/config'
import { importX } from 'eslint-plugin-import-x'
import typescriptEslint from 'typescript-eslint'
import { flatRules } from '../../utils'

export const typescriptRules: Config['rules'] = {
    ...flatRules(typescriptEslint.configs.strict.map((c) => c.rules)),
    ...flatRules(typescriptEslint.configs.stylistic.map((c) => c.rules)),
    ...importX.configs.typescript.rules,

    // Turn off core rules replaced by @typescript-eslint
    'no-use-before-define': 'off',

    // @typescript-eslint base rules
    '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
    '@typescript-eslint/ban-ts-comment': ['error', { 'ts-ignore': 'allow-with-description' }],
    '@typescript-eslint/consistent-type-assertions': 'off',
    '@typescript-eslint/consistent-type-definitions': 'off',
    '@typescript-eslint/consistent-type-imports': ['error', { disallowTypeAnnotations: false, fixStyle: 'inline-type-imports', prefer: 'type-imports' }],
    '@typescript-eslint/explicit-member-accessibility': 'error',
    '@typescript-eslint/no-dynamic-delete': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-empty-object-type': ['error', { allowInterfaces: 'with-single-extends', allowWithName: 'Props$' }],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-extraneous-class': 'off',
    '@typescript-eslint/no-import-type-side-effects': 'error',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-require-imports': 'error',
    '@typescript-eslint/no-unnecessary-condition': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-use-before-define': ['error', { classes: false, functions: false, variables: true }],
    '@typescript-eslint/no-useless-constructor': 'off',
    '@typescript-eslint/no-useless-empty-export': 'error',
    '@typescript-eslint/triple-slash-reference': 'off',
    '@typescript-eslint/unified-signatures': 'off',
}

export const typescriptTypeAwareRules: Config['rules'] = {
    ...flatRules(typescriptEslint.configs.strictTypeChecked.map((c) => c.rules)),
    ...flatRules(typescriptEslint.configs.stylisticTypeChecked.map((c) => c.rules)),

    // Type-aware rules
    '@typescript-eslint/consistent-type-exports': 'error',
    '@typescript-eslint/no-base-to-string': 'off',
    '@typescript-eslint/no-confusing-void-expression': 'off',
    '@typescript-eslint/no-deprecated': 'error',
    '@typescript-eslint/no-dynamic-delete': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/no-invalid-void-type': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-redundant-type-constituents': 'off',
    '@typescript-eslint/no-unnecessary-qualifier': 'error',
    '@typescript-eslint/no-unnecessary-type-parameters': 'off',
    '@typescript-eslint/no-unsafe-argument': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/prefer-readonly': 'error',
    '@typescript-eslint/prefer-regexp-exec': 'error',
    '@typescript-eslint/require-array-sort-compare': ['error', { ignoreStringArrays: true }],
    '@typescript-eslint/restrict-template-expressions': ['error', { allowAny: true, allowBoolean: true, allowNever: true, allowNullish: true, allowNumber: true, allowRegExp: true }],
    '@typescript-eslint/unbound-method': 'off',
    '@typescript-eslint/use-unknown-in-catch-callback-variable': 'off',
}
