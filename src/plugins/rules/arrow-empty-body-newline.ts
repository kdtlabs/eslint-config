import type { Rule } from 'eslint'

export const arrowEmptyBodyNewline: Rule.RuleModule = {
    create(context) {
        return {
            ArrowFunctionExpression(node) {
                const { body } = node

                if (body.type !== 'BlockStatement' || body.body.length > 0) {
                    return
                }

                const sourceCode = context.sourceCode

                if (sourceCode.getCommentsInside(body).length > 0) {
                    return
                }

                const openBrace = sourceCode.getFirstToken(body)
                const closeBrace = sourceCode.getLastToken(body)

                const { range } = body

                if (openBrace && closeBrace && range && openBrace.loc.end.line !== closeBrace.loc.start.line) {
                    context.report({
                        fix: (fixer) => fixer.replaceTextRange(range, '{}'),
                        loc: body.loc ?? undefined,
                        messageId: 'unexpectedNewline',
                        node,
                    })
                }
            },
        }
    },
    meta: {
        docs: {
            description: 'Disallow newlines in empty arrow function bodies',
        },
        fixable: 'whitespace',
        messages: {
            unexpectedNewline: 'Unexpected newline between empty arrow function body',
        },
        schema: [],
        type: 'layout',
    },
}
