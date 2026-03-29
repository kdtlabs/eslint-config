import type { Config } from 'eslint/config'

export const regexpOverrideRules: Config['rules'] = {
    // --- Restore: keep custom option from javascript config (recommended overrides it) ---
    'prefer-regex-literals': ['error', { disallowRedundantWrapping: true }],

    // --- Enable: high-value non-recommended rules ---
    'regexp/no-control-character': 'error',
    'regexp/no-octal': 'error',
    'regexp/no-standalone-backslash': 'error',
    'regexp/prefer-escape-replacement-dollar-char': 'error',
    'regexp/prefer-quantifier': 'error',
    'regexp/require-unicode-regexp': 'error',

    // --- Enable: security (ReDoS via quadratic moves, complements no-super-linear-backtracking) ---
    'regexp/no-super-linear-move': 'warn',

    // --- Enable: better patterns, warn for gradual adoption ---
    'regexp/prefer-lookaround': 'warn',
    'regexp/prefer-regexp-test': 'warn',

    // --- Enable: named capture group ecosystem (all warn for gradual adoption) ---
    'regexp/prefer-named-backreference': 'warn',
    'regexp/prefer-named-capture-group': 'warn',
    'regexp/prefer-named-replacement': 'warn',
    'regexp/prefer-result-array-groups': 'warn',

    // --- Upgrade: warn -> error (real bugs, not style) ---
    'regexp/no-empty-alternative': 'error',
    'regexp/no-potentially-useless-backreference': 'error',
    'regexp/no-useless-flag': 'error',

    // --- Tweak: enable autofix for unused capturing groups ---
    'regexp/no-unused-capturing-group': ['error', { fixable: true }],

    // --- Tweak: enforce \d consistently inside character classes ---
    'regexp/prefer-d': ['error', { insideCharacterClass: 'd' }],

    // --- Tweak: catch potential ReDoS, not just certain ---
    'regexp/no-super-linear-backtracking': ['error', { report: 'potential' }],
}
