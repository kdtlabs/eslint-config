import type { Config } from 'eslint/config'

export const nodeExtraRules: Config['rules'] = {
    'n/handle-callback-err': ['error', '^(err|error)$'],
    'n/no-missing-import': 'off',
    'n/no-missing-require': 'off',
    'n/no-new-require': 'error',
    'n/no-path-concat': 'error',
    'n/no-unpublished-import': 'off',
    'n/no-unpublished-require': 'off',
    'n/prefer-node-protocol': 'off',
    'n/prefer-promises/dns': 'error',
    'n/prefer-promises/fs': 'error',
    'n/shebang': 'off',
    'no-process-exit': 'off',
}

export const securityOverrideRules: Config['rules'] = {
    'security/detect-bidi-characters': 'error',
    'security/detect-no-csrf-before-method-override': 'off',
    'security/detect-non-literal-fs-filename': 'off',
    'security/detect-object-injection': 'off',
    'security/detect-possible-timing-attacks': 'off',
    'security/detect-pseudoRandomBytes': 'off',
    'security/detect-non-literal-regexp': 'off',
    'security/detect-unsafe-regex': 'off',
}

export const nodeVersionDependentOverrides: Config['rules'] = {
    'n/no-deprecated-api': 'off',
    'n/no-unsupported-features/es-builtins': 'off',
    'n/no-unsupported-features/es-syntax': 'off',
    'n/no-unsupported-features/node-builtins': 'off',
}

export const nodeCjsOnlyOverrides: Config['rules'] = {
    'n/no-exports-assign': 'off',
    'n/no-extraneous-require': 'off',
    'n/no-missing-require': 'off',
    'n/no-unpublished-require': 'off',
}

export const securityNodeOnlyOverrides: Config['rules'] = {
    'security/detect-buffer-noassert': 'off',
    'security/detect-child-process': 'off',
    'security/detect-new-buffer': 'off',
    'security/detect-non-literal-fs-filename': 'off',
    'security/detect-non-literal-require': 'off',
}
