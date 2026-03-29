export const lineAroundCommentOptions = {
    allowArrayStart: true,
    allowBlockStart: true,
    allowClassStart: true,
    allowObjectStart: true,
    beforeBlockComment: true,
    beforeLineComment: true,
}

export const paddingLineBetweenStatements = [
    { blankLine: 'never', next: ['break', 'default'], prev: '*' },
    { blankLine: 'never', next: '*', prev: ['break', 'case', 'default'] },
    { blankLine: 'never', next: 'case', prev: 'switch' },
    { blankLine: 'always', next: 'interface', prev: '*' },
    { blankLine: 'always', next: '*', prev: 'interface' },
    { blankLine: 'always', next: 'class', prev: '*' },
    { blankLine: 'always', next: '*', prev: 'class' },
    { blankLine: 'always', next: '*', prev: 'directive' },
    { blankLine: 'always', next: '*', prev: ['do', 'for', 'while'] },
    { blankLine: 'always', next: ['do', 'for', 'while'], prev: '*' },
    { blankLine: 'always', next: '*', prev: 'function' },
    { blankLine: 'always', next: 'function', prev: 'directive' },
    { blankLine: 'always', next: '*', prev: 'if' },
    { blankLine: 'always', next: 'if', prev: '*' },
    { blankLine: 'always', next: '*', prev: ['multiline-block-like', 'multiline-expression'] },
    { blankLine: 'always', next: ['multiline-block-like', 'multiline-expression'], prev: '*' },
    { blankLine: 'always', next: '*', prev: ['multiline-const', 'multiline-let', 'multiline-var'] },
    { blankLine: 'always', next: ['multiline-const', 'multiline-let', 'multiline-var'], prev: '*' },
    { blankLine: 'always', next: 'return', prev: '*' },
    { blankLine: 'always', next: '*', prev: 'switch' },
    { blankLine: 'always', next: 'switch', prev: '*' },
    { blankLine: 'always', next: '*', prev: 'try' },
    { blankLine: 'always', next: 'try', prev: '*' },
    { blankLine: 'always', next: '*', prev: 'with' },
    { blankLine: 'always', next: 'with', prev: '*' },
]

export const commaDangleOptions = {
    arrays: 'always-multiline',
    enums: 'always-multiline',
    exports: 'never',
    functions: 'always-multiline',
    generics: 'never',
    imports: 'never',
    objects: 'always-multiline',
    tuples: 'never',
}

export const maxLenOptions = {
    ignoreComments: false,
    ignoreRegExpLiterals: true,
    ignoreStrings: true,
    ignoreTemplateLiterals: true,
    ignoreTrailingComments: true,
    ignoreUrls: true,
}
