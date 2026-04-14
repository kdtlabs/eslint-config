import type { Config } from 'eslint/config'

export const incompatibleRules: Config['rules'] = {
    // --- Core JS rules ---
    'logical-assignment-operators': 'off',
    'no-alert': 'off',
    'no-console': 'off',
    'no-empty-pattern': 'off',
    'no-irregular-whitespace': 'off',
    'no-labels': 'off',
    'no-lone-blocks': 'off',
    'no-restricted-imports': 'off',
    'no-restricted-syntax': 'off',
    'no-undef': 'off',
    'no-unused-expressions': 'off',
    'no-unused-labels': 'off',
    'no-unused-vars': 'off',
    'unicode-bom': 'off',

    // --- @stylistic ---
    '@stylistic/lines-around-comment': 'off',

    // --- import-x ---
    'import-x/no-empty-named-blocks': 'off',

    // --- jsdoc (all crash on markdown sourceCode) ---
    'jsdoc/check-access': 'off',
    'jsdoc/check-alignment': 'off',
    'jsdoc/check-indentation': 'off',
    'jsdoc/check-property-names': 'off',
    'jsdoc/check-tag-names': 'off',
    'jsdoc/check-values': 'off',
    'jsdoc/empty-tags': 'off',
    'jsdoc/escape-inline-tags': 'off',
    'jsdoc/informative-docs': 'off',
    'jsdoc/multiline-blocks': 'off',
    'jsdoc/no-blank-blocks': 'off',
    'jsdoc/no-multi-asterisks': 'off',
    'jsdoc/reject-any-type': 'off',
    'jsdoc/reject-function-type': 'off',
    'jsdoc/require-next-type': 'off',
    'jsdoc/require-property': 'off',
    'jsdoc/require-property-description': 'off',
    'jsdoc/require-property-name': 'off',
    'jsdoc/sort-tags': 'off',
    'jsdoc/ts-no-empty-object-type': 'off',

    // --- n (node) ---
    'n/no-unsupported-features/es-syntax': 'off',
    'n/no-unsupported-features/node-builtins': 'off',

    // --- perfectionist ---
    'perfectionist/sort-exports': 'off',
    'perfectionist/sort-imports': 'off',
    'perfectionist/sort-modules': 'off',

    // --- regexp ---
    'regexp/no-legacy-features': 'off',
    'regexp/no-missing-g-flag': 'off',
    'regexp/no-useless-dollar-replacements': 'off',
    'regexp/no-useless-flag': 'off',
    'regexp/prefer-escape-replacement-dollar-char': 'off',
    'regexp/prefer-lookaround': 'off',
    'regexp/prefer-regexp-exec': 'off',
    'regexp/prefer-regexp-test': 'off',

    // --- sonarjs ---
    'sonarjs/assertions-in-tests': 'off',
    'sonarjs/chai-determinate-assertion': 'off',
    'sonarjs/disabled-timeout': 'off',
    'sonarjs/no-same-argument-assert': 'off',
    'sonarjs/unused-import': 'off',

    // --- typescript-eslint ---
    '@typescript-eslint/consistent-type-imports': 'off',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/no-redeclare': 'off',
    '@typescript-eslint/no-require-imports': 'off',
    '@typescript-eslint/no-unused-expressions': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-use-before-define': 'off',

    // --- unicorn ---
    'unicorn/expiring-todo-comments': 'off',

    // --- unused-imports ---
    'unused-imports/no-unused-imports': 'off',
    'unused-imports/no-unused-vars': 'off',

    // --- command ---
    'command/command': 'off',
}

export const markdownOverrideRules: Config['rules'] = {
    'markdown/no-duplicate-headings': ['error', { checkSiblingsOnly: true }],
    'markdown/no-html': ['error', { allowed: ['br', 'sup', 'sub', 'kbd', 'details', 'summary', 'picture', 'source', 'img'] }],
    'markdown/no-missing-atx-heading-space': 'off',
    'markdown/no-missing-link-fragments': 'off',
    'markdown/no-space-in-emphasis': ['error', { checkStrikethrough: true }],
    'markdown/table-column-count': ['error', { checkMissingCells: true }],
}

export const preferencesOverrideRules: Config['rules'] = {
    'markdown-preferences/canonical-code-block-language': 'error',
    'markdown-preferences/no-heading-trailing-punctuation': 'error',
}

export const linksOverrideRules: Config['rules'] = {
    'markdown-links/no-missing-fragments': ['error', { ignoreCase: true, slugify: 'github' }],
}

export const linksDeadUrlRules: Config['rules'] = {
    'markdown-links/no-dead-urls': ['error', { ignoreLocalhost: true, maxRetries: 2, timeout: 5000 }],
}
