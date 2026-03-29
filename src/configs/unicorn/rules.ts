import type { Config } from 'eslint/config'

export const unicornOverrideRules: Config['rules'] = {
    // --- Enable: high-value non-recommended rules ---
    'unicorn/custom-error-definition': 'error',

    // --- Disable: covered by @typescript-eslint (type-aware, superior) ---
    'unicorn/no-this-assignment': 'off',
    'unicorn/prefer-array-find': 'off',
    'unicorn/prefer-includes': 'off',
    'unicorn/prefer-regexp-test': 'off',
    'unicorn/prefer-string-starts-ends-with': 'off',

    // --- Disable: too opinionated or high false-positive rate ---
    'unicorn/import-style': 'off',
    'unicorn/new-for-builtins': 'off',
    'unicorn/no-array-callback-reference': 'off',
    'unicorn/no-array-method-this-argument': 'off',
    'unicorn/no-array-push-push': 'off',
    'unicorn/no-array-reduce': 'off',
    'unicorn/no-await-expression-member': 'off',
    'unicorn/no-empty-file': 'off',
    'unicorn/no-null': 'off',
    'unicorn/no-process-exit': 'off',
    'unicorn/prefer-event-target': 'off',
    'unicorn/prefer-math-min-max': 'off',
    'unicorn/prefer-module': 'off',
    'unicorn/prefer-top-level-await': 'off',
    'unicorn/prevent-abbreviations': 'off',
    'unicorn/require-number-to-fixed-digits-argument': 'off',

    // --- Downgrade: stylistic, not bug prevention ---
    'unicorn/explicit-length-check': 'warn',

    // --- Tweak: reduce false positives in TS/React projects ---
    'unicorn/consistent-function-scoping': ['error', { checkArrowFunctions: false }],
    'unicorn/filename-case': ['error', { cases: { kebabCase: true, pascalCase: true }, ignore: [String.raw`.*\.md$`] }],
    'unicorn/no-useless-undefined': ['error', { checkArguments: false }],
    'unicorn/prefer-export-from': ['error', { ignoreUsedVariables: true }],
    'unicorn/prefer-ternary': ['error', 'only-single-line'],
    'unicorn/switch-case-braces': ['error', 'avoid'],
}
