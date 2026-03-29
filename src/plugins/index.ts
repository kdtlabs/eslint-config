import type { ESLint } from 'eslint'
import { arrowEmptyBodyNewline } from './rules/arrow-empty-body-newline'
import { importSingleLine } from './rules/import-single-line'
import { objectCurlyNewline } from './rules/object-curly-newline'
import { simpleArrow } from './rules/simple-arrow'
import { sortUnionTypes } from './rules/sort-union-types'

export const kdt: ESLint.Plugin = {
    meta: {
        name: 'kdt',
    },
    rules: {
        'arrow-empty-body-newline': arrowEmptyBodyNewline,
        'import-single-line': importSingleLine,
        'object-curly-newline': objectCurlyNewline,
        'simple-arrow': simpleArrow,
        'sort-union-types': sortUnionTypes,
    },
}
