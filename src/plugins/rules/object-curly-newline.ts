import type { Rule } from 'eslint'
import stylistic from '@stylistic/eslint-plugin'

type OptionValue = 'always' | 'never'

interface OptionObject {
    consistent?: boolean
    minProperties?: number
    multiline?: boolean
}

type OptionEntry = OptionObject | OptionValue
type Options = OptionEntry | OptionLiterals

interface OptionLiterals {
    ExportDeclaration?: OptionEntry
    ImportDeclaration?: OptionEntry
    ObjectExpression?: OptionEntry
    ObjectPattern?: OptionEntry
}

const baseRule = stylistic.rules['object-curly-newline']

const defaultOptions: Options = {
    ExportDeclaration: 'never',
    ImportDeclaration: 'never',
    ObjectExpression: { multiline: true },
    ObjectPattern: { consistent: true, multiline: true },
}

function getMinProperties(options: Options | undefined): false | number {
    if (!options || typeof options === 'string') {
        return false
    }

    if ('multiline' in options && options.multiline) {
        return options.minProperties ?? Number.POSITIVE_INFINITY
    }

    if (!('ObjectExpression' in options) || typeof options.ObjectExpression === 'string') {
        return false
    }

    if (!options.ObjectExpression?.multiline) {
        return false
    }

    return options.ObjectExpression.minProperties ?? Number.POSITIVE_INFINITY
}

function createBaseVisitor(context: Rule.RuleContext, options?: Options): Rule.RuleListener {
    const overriddenContext = Object.create(context, {
        options: { configurable: false, value: [options], writable: false },
    })

    return baseRule.create(overriddenContext)
}

export const objectCurlyNewline: Rule.RuleModule = {
    create(context) {
        const options: Options = (context.options[0] as Options | undefined) ?? defaultOptions
        const rules = createBaseVisitor(context, options)
        const minProperties = getMinProperties(options)

        return {
            ...rules,
            ObjectExpression(node) {
                if (minProperties === false || node.properties.length >= minProperties) {
                    return rules.ObjectExpression?.(node as never)
                }

                const sourceCode = context.sourceCode
                const openBrace = sourceCode.getFirstToken(node, (token) => token.value === '{')
                const closeBrace = sourceCode.getLastToken(node, (token) => token.value === '}')

                if (!openBrace || !closeBrace) {
                    return
                }

                let first: ReturnType<typeof sourceCode.getTokenAfter> = sourceCode.getTokenAfter(openBrace, { includeComments: true })
                let last: ReturnType<typeof sourceCode.getTokenBefore> = sourceCode.getTokenBefore(closeBrace, { includeComments: true })

                if (!first || !last) {
                    return
                }

                // If properties are not multiline (all on the same line), check for inconsistent line breaks
                if (!(node.properties.length > 0 && first.loc && last.loc && first.loc.start.line !== last.loc.end.line)) {
                    first = sourceCode.getTokenAfter(openBrace)
                    last = sourceCode.getTokenBefore(closeBrace)

                    if (!first || !last) {
                        return
                    }

                    const hasLineBreakAfterOpen = openBrace.loc.end.line !== first.loc.start.line
                    const hasLineBreakBeforeClose = last.loc.end.line !== closeBrace.loc.start.line

                    if (hasLineBreakAfterOpen || hasLineBreakBeforeClose) {
                        return createBaseVisitor(context, 'always').ObjectExpression?.(node as never)
                    }
                }

                return rules.ObjectExpression?.(node as never)
            },
        }
    },
    meta: {
        ...baseRule.meta,
        docs: {
            ...baseRule.meta?.docs,
            description: 'Enforce consistent line breaks after opening and before closing braces',
        },
    },
}
