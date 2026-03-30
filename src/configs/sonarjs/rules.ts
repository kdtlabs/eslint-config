import type { Config } from 'eslint/config'

export const sonarjsOverrideRules: Config['rules'] = {
    // --- Disable: covered by existing core rules (already well-configured) ---
    'sonarjs/block-scoped-var': 'off',
    'sonarjs/no-fallthrough': 'off',
    'sonarjs/no-labels': 'off',
    'sonarjs/prefer-default-last': 'off',

    // --- Disable: covered by unused-imports plugin ---
    'sonarjs/no-unused-vars': 'off',
    'sonarjs/unused-import': 'off',

    // --- Disable: covered by @typescript-eslint (type-aware, superior) ---
    'sonarjs/deprecation': 'off',
    'sonarjs/no-array-delete': 'off',
    'sonarjs/prefer-regexp-exec': 'off',

    // --- Disable: covered by core no-eval + no-implied-eval + no-new-func ---
    'sonarjs/code-eval': 'off',

    // --- Disable: covered by core no-new-wrappers ---
    'sonarjs/no-primitive-wrappers': 'off',

    // --- Disable: covered by regexp/require-unicode-regexp (has autofix, better detection) ---
    'sonarjs/unicode-aware-regex': 'off',

    // --- Disable: contradicts unicorn/prefer-global-this + no-restricted-globals ---
    'sonarjs/no-global-this': 'off',

    // --- Disable: too opinionated or high false-positive rate ---
    'sonarjs/arguments-order': 'off',
    'sonarjs/assertions-in-tests': 'off',
    'sonarjs/cognitive-complexity': 'off',
    'sonarjs/function-return-type': 'off',
    'sonarjs/hashing': 'off',
    'sonarjs/no-async-constructor': 'off',
    'sonarjs/no-clear-text-protocols': 'off',
    'sonarjs/no-duplicate-string': 'off',
    'sonarjs/no-hardcoded-secrets': 'off',
    'sonarjs/no-invariant-returns': 'off',
    'sonarjs/no-nested-assignment': 'off',
    'sonarjs/no-nested-conditional': 'off',
    'sonarjs/no-nested-functions': 'off',
    'sonarjs/no-nested-template-literals': 'off',
    'sonarjs/no-os-command-from-path': 'off',
    'sonarjs/no-selector-parameter': 'off',
    'sonarjs/pseudo-random': 'off',
    'sonarjs/redundant-type-aliases': 'off',
    'sonarjs/todo-tag': 'off',
    'sonarjs/updated-loop-counter': 'off',

    // --- Enable: high-value non-recommended rules ---
    'sonarjs/cyclomatic-complexity': ['error', { threshold: 15 }],
    'sonarjs/no-collapsible-if': 'error',
    'sonarjs/no-for-in-iterable': 'error',
    'sonarjs/no-implicit-dependencies': 'off',
    'sonarjs/no-inconsistent-returns': 'off',
    'sonarjs/no-incorrect-string-concat': 'error',
    'sonarjs/no-nested-switch': 'error',
    'sonarjs/no-return-type-any': 'error',
    'sonarjs/non-number-in-arithmetic-expression': 'error',
    'sonarjs/prefer-immediate-return': 'error',
    'sonarjs/strings-comparison': 'error',
    'sonarjs/values-not-convertible-to-numbers': 'error',

    // --- Upgrade: warn -> error ---
    'sonarjs/fixme-tag': 'error',
    'sonarjs/max-switch-cases': ['error', 30],
    'sonarjs/no-commented-code': 'error',
    'sonarjs/no-duplicate-in-composite': 'error',
    'sonarjs/no-hardcoded-ip': 'error',
    'sonarjs/no-small-switch': 'error',
}
