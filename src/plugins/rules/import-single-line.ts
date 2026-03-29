import type { Rule } from 'eslint'

export const importSingleLine: Rule.RuleModule = {
    create(context) {
        return {
            ImportDeclaration(node) {
                if (node.loc?.start.line === node.loc?.end.line) {
                    return
                }

                context.report({
                    fix(fixer) {
                        const source = context.sourceCode.getText(node)
                        const fixed = source.split('\n').map((l) => l.trim()).filter(Boolean).join(' ')

                        return fixer.replaceText(node, fixed)
                    },
                    messageId: 'unexpectedLineBreak',
                    node,
                })
            },
        }
    },
    meta: {
        docs: {
            description: 'Enforce import statements to be on a single line',
        },
        fixable: 'code',
        messages: {
            unexpectedLineBreak: 'Import statement should be on a single line',
        },
        schema: [],
        type: 'layout',
    },
}
