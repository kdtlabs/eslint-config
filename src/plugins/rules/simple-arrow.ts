import type { Rule } from 'eslint'
import type { Node } from 'estree'

interface Options {
    async?: boolean
    exportDefault?: boolean
    force?: boolean
    indent?: number
    maxLength?: false | number
}

const LEADING_WHITESPACE = /^(?<indent>\s*)/u

const isNodeLike = (value: unknown): value is Node => typeof value === 'object' && value !== null && typeof (value as Record<string, unknown>).type === 'string'

const isThisOrArguments = (node: Node): boolean => node.type === 'ThisExpression' || (node.type === 'Identifier' && node.name === 'arguments')

function getChildNodes(node: Node): Node[] {
    const children: Node[] = []

    for (const key of Object.keys(node)) {
        if (key === 'parent') {
            continue
        }

        const value = (node as unknown as Record<string, unknown>)[key]

        if (value && typeof value === 'object') {
            if (Array.isArray(value)) {
                for (const item of value) {
                    if (isNodeLike(item)) {
                        children.push(item)
                    }
                }
            } else if (isNodeLike(value)) {
                children.push(value)
            }
        }
    }

    return children
}

function containsThisOrArguments(node: Node): boolean {
    if (isThisOrArguments(node)) {
        return true
    }

    // Don't descend into nested function scopes — they have their own `this`/`arguments`
    if (node.type === 'FunctionExpression' || node.type === 'FunctionDeclaration') {
        return false
    }

    return getChildNodes(node).some((child) => containsThisOrArguments(child))
}

function hasOverload(node: Rule.Node & { id?: { name?: string } | null }, parentNode: Rule.Node): boolean {
    const parentBody = parentNode.type === 'ExportNamedDeclaration' ? ((parentNode as any).parent as Rule.Node & { body?: any[] }).body : (parentNode as any).body

    if (!Array.isArray(parentBody) || !node.id?.name) {
        return false
    }

    const container = parentNode.type === 'ExportNamedDeclaration' ? parentNode : node
    const idx = parentBody.indexOf(container as any)

    if (idx <= 0) {
        return false
    }

    const prev = parentBody[idx - 1]
    const prevDecl = prev?.type === 'ExportNamedDeclaration' ? prev.declaration : prev

    return prevDecl?.type === 'TSDeclareFunction' && prevDecl.id?.name === node.id.name
}

function buildParamsText(node: Rule.Node & { params: any[] }, sourceCode: ReturnType<Rule.RuleContext['sourceCode']['getText']> extends string ? Rule.RuleContext['sourceCode'] : never, typeParamsText: string, returnTypeText: string): string {
    if (node.params.length === 0) {
        return '()'
    }

    const firstParam = node.params[0]!
    const lastParam = node.params.at(-1)!
    const firstToken = sourceCode.getFirstToken(firstParam as Rule.Node)
    const lastToken = sourceCode.getLastToken(lastParam as Rule.Node)

    if (!firstToken || !lastToken) {
        return `(${node.params.map((p: any) => sourceCode.getText(p as Rule.Node)).join(', ')})`
    }

    const rawParams = sourceCode.text.slice(firstToken.range[0], lastToken.range[1])

    const needsParens = node.params.length !== 1 ||
        firstParam.type === 'AssignmentPattern' ||
        firstParam.type === 'RestElement' ||
        firstParam.type === 'ObjectPattern' ||
        firstParam.type === 'ArrayPattern' ||
        !!(firstParam).typeAnnotation ||
        !!typeParamsText ||
        !!returnTypeText

    return needsParens ? `(${rawParams})` : rawParams
}

function buildReturnText(returnArg: Rule.Node, returnStmt: Rule.Node, targetNode: Rule.Node, sourceCode: Rule.RuleContext['sourceCode']): string {
    if (returnArg.type !== 'ObjectExpression') {
        return sourceCode.getText(returnArg)
    }

    const rawReturnText = sourceCode.getText(returnArg)

    if (!rawReturnText.includes('\n')) {
        return `(${rawReturnText})`
    }

    const targetLine = sourceCode.lines[targetNode.loc!.start.line - 1] ?? ''
    const targetIndent = LEADING_WHITESPACE.exec(targetLine)?.groups?.indent ?? ''

    const returnLine = sourceCode.lines[returnStmt.loc!.start.line - 1] ?? ''
    const returnIndent = LEADING_WHITESPACE.exec(returnLine)?.groups?.indent ?? ''

    const dedentAmount = returnIndent.length - targetIndent.length
    const dedentPrefix = ' '.repeat(Math.max(dedentAmount, 0))

    const dedentedLines = rawReturnText.split('\n').map((line, i) => {
        if (i === 0) {
            return line
        }

        return dedentAmount > 0 && line.startsWith(dedentPrefix) ? line.slice(dedentAmount) : line
    })

    return `(${dedentedLines.join('\n')})`
}

function getReturnStatement(node: Rule.Node & { async: boolean, body: { body: any[] }, generator: boolean }, allowAsync: boolean): any | null {
    if (node.generator || (node.async && !allowAsync)) {
        return null
    }

    const { body } = node

    if (body.body.length !== 1 || body.body[0]?.type !== 'ReturnStatement') {
        return null
    }

    const returnStmt = body.body[0]

    if (!returnStmt.argument) {
        return null
    }

    if (containsThisOrArguments(node.body as unknown as Node)) {
        return null
    }

    return returnStmt
}

function wrapReturnText(prefix: string, returnText: string, indent: number, isObject: boolean): string {
    const indentStr = ' '.repeat(indent)

    if (isObject) {
        // returnText is already wrapped like `({...})`, strip outer `(` and `)` to get `{...}`
        const objectBody = returnText.slice(1, -1)

        if (objectBody.includes('\n')) {
            // Already multiline — preserve with indent
            const lines = objectBody.split('\n')
            const indented = lines.map((line, i) => (i === 0 ? line : `${indentStr}${line}`))

            return `${prefix} => (${indented.join('\n')})`
        }

        // Single-line object — push content to next line: `=> ({\n    ...\n})`
        const objectContent = objectBody.slice(1, -1).trim()

        return `${prefix} => ({\n${indentStr}${objectContent}\n})`
    }

    return `${prefix} => (\n${indentStr}${returnText}\n)`
}

function buildReplacement(node: Rule.Node & { async: boolean, id?: { name?: string } | null }, parent: Rule.Node, sourceCode: Rule.RuleContext['sourceCode'], returnStmt: Rule.Node & { argument: Rule.Node }, maxLength: false | number, force: boolean, indent: number): string | null {
    const isExportDefault = parent.type === 'ExportDefaultDeclaration'
    const isExportNamed = parent.type === 'ExportNamedDeclaration'

    const asyncPrefix = node.async ? 'async ' : ''

    const typeParamsNode = (node as any).typeParameters
    const typeParamsText: string = typeParamsNode ? sourceCode.getText(typeParamsNode as Rule.Node) : ''

    const returnTypeNode = (node as any).returnType
    const returnTypeText: string = returnTypeNode ? sourceCode.getText(returnTypeNode as Rule.Node) : ''

    const paramsText = buildParamsText(node as any, sourceCode, typeParamsText, returnTypeText)
    const reportNode = isExportDefault || isExportNamed ? parent : node
    const returnText = buildReturnText(returnStmt.argument, returnStmt as Rule.Node, reportNode, sourceCode)

    const arrowSignature = `${asyncPrefix}${typeParamsText}${paramsText}${returnTypeText}`
    const arrow = `${arrowSignature} => ${returnText}`

    const declarationPrefix = isExportDefault ? 'export default' : `${isExportNamed ? 'export ' : ''}const ${node.id?.name} =`

    const singleLine = `${declarationPrefix} ${arrow}`

    if (maxLength === false || singleLine.length < maxLength) {
        return singleLine
    }

    // Line exceeds maxLength
    if (!force) {
        return null
    }

    return wrapReturnText(`${declarationPrefix} ${arrowSignature}`, returnText, indent, returnStmt.argument.type === 'ObjectExpression')
}

export const simpleArrow: Rule.RuleModule = {
    create(context) {
        const { async: allowAsync = true, exportDefault: allowExportDefault = false, force = true, indent = 4, maxLength = 120 } = (context.options[0] ?? {}) as Options

        return {
            FunctionDeclaration(node) {
                const returnStmt = getReturnStatement(node as any, allowAsync)

                if (!returnStmt) {
                    return
                }

                if (hasOverload(node as any, node.parent)) {
                    return
                }

                const parent = node.parent
                const isExportDefault = parent.type === 'ExportDefaultDeclaration'
                const isExportNamed = parent.type === 'ExportNamedDeclaration'

                if (isExportDefault && !allowExportDefault) {
                    return
                }

                const reportNode = isExportDefault || isExportNamed ? parent : node
                const replacement = buildReplacement(node as any, parent, context.sourceCode, returnStmt, maxLength, force, indent)

                if (replacement === null) {
                    return
                }

                context.report({
                    fix: (fixer) => fixer.replaceText(reportNode, replacement),
                    messageId: 'preferArrow',
                    node: reportNode,
                })
            },
        }
    },
    meta: {
        docs: {
            description: 'Prefer arrow functions for simple function declarations with a single return statement',
        },
        fixable: 'code',
        messages: {
            preferArrow: 'Prefer arrow function for simple function declaration',
        },
        schema: [
            {
                additionalProperties: false,
                properties: {
                    async: {
                        default: true,
                        type: 'boolean',
                    },
                    exportDefault: {
                        default: false,
                        type: 'boolean',
                    },
                    force: {
                        default: true,
                        type: 'boolean',
                    },
                    indent: {
                        default: 4,
                        minimum: 1,
                        type: 'integer',
                    },
                    maxLength: {
                        default: 120,
                        oneOf: [
                            { minimum: 1, type: 'integer' },
                            { const: false, type: 'boolean' },
                        ],
                    },
                },
                type: 'object',
            },
        ],
        type: 'suggestion',
    },
}
