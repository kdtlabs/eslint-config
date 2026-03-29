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
    'sonarjs/cyclomatic-complexity': ['warn', { threshold: 15 }],
    'sonarjs/no-collapsible-if': 'warn',
    'sonarjs/no-for-in-iterable': 'error',
    'sonarjs/no-implicit-dependencies': 'off',
    'sonarjs/no-inconsistent-returns': 'off',
    'sonarjs/no-incorrect-string-concat': 'warn',
    'sonarjs/no-nested-switch': 'warn',
    'sonarjs/no-return-type-any': 'warn',
    'sonarjs/non-number-in-arithmetic-expression': 'error',
    'sonarjs/prefer-immediate-return': 'warn',
    'sonarjs/strings-comparison': 'warn',
    'sonarjs/values-not-convertible-to-numbers': 'error',

    // --- Downgrade: too strict as error for practical use ---
    'sonarjs/fixme-tag': 'warn',
    'sonarjs/max-switch-cases': ['warn', 30],
    'sonarjs/no-commented-code': 'warn',
    'sonarjs/no-duplicate-in-composite': 'warn',
    'sonarjs/no-hardcoded-ip': 'warn',
    'sonarjs/no-small-switch': 'warn',
}
