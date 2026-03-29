import type { Rule } from 'eslint'

type TypeOrder = 'custom-first' | 'primitive-first'

interface Options {
    order?: TypeOrder
}

const PRIMITIVE_TYPES = new Set([
    'TSAnyKeyword',
    'TSBigIntKeyword',
    'TSBooleanKeyword',
    'TSLiteralType',
    'TSNeverKeyword',
    'TSNullKeyword',
    'TSNumberKeyword',
    'TSObjectKeyword',
    'TSStringKeyword',
    'TSSymbolKeyword',
    'TSTemplateLiteralType',
    'TSUndefinedKeyword',
    'TSUnknownKeyword',
    'TSVoidKeyword',
])

const isPrimitive = (node: { type: string }) => PRIMITIVE_TYPES.has(node.type)

const sortTypes = (types: Array<{ text: string, type: string }>, order: TypeOrder) => types.toSorted((a, b) => {
    const aIsPrimitive = isPrimitive(a)
    const bIsPrimitive = isPrimitive(b)

    if (aIsPrimitive === bIsPrimitive) {
        return 0
    }

    if (order === 'custom-first') {
        return aIsPrimitive ? 1 : -1
    }

    return aIsPrimitive ? -1 : 1
})

export const sortUnionTypes: Rule.RuleModule = {
    create(context) {
        const { order = 'custom-first' } = (context.options[0] ?? {}) as Options

        function check(node: Rule.Node) {
            const typeNodes = (node as unknown as { types: Rule.Node[] }).types
            const sourceCode = context.sourceCode

            const types = typeNodes.map((typeNode) => ({
                node: typeNode,
                text: sourceCode.getText(typeNode),
                type: typeNode.type,
            }))

            const sorted = sortTypes(types, order)
            const isSorted = types.every((t, i) => t.text === sorted[i]?.text)

            if (isSorted) {
                return
            }

            context.report({
                data: { order: order === 'custom-first' ? 'before' : 'after' },
                fix(fixer) {
                    const fixes: Rule.Fix[] = []

                    for (const [i, original] of types.entries()) {
                        const target = sorted[i]

                        if (original && target && original.text !== target.text) {
                            fixes.push(fixer.replaceText(original.node, target.text))
                        }
                    }

                    return fixes
                },
                messageId: 'unexpected',
                node,
            })
        }

        return { TSIntersectionType: check, TSUnionType: check } as Rule.RuleListener
    },
    meta: {
        docs: {
            description: 'Enforce custom types to appear before or after primitive types in union/intersection types',
        },
        fixable: 'code',
        messages: {
            unexpected: 'Expected custom types to appear {{order}} primitive types',
        },
        schema: [
            {
                additionalProperties: false,
                properties: {
                    order: {
                        enum: ['custom-first', 'primitive-first'],
                        type: 'string',
                    },
                },
                type: 'object',
            },
        ],
        type: 'suggestion',
    },
}
