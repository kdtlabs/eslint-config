import { describe } from 'bun:test'
import { RuleTester } from 'eslint'
import tseslint from 'typescript-eslint'
import { simpleArrow } from '../../../src/plugins/rules/simple-arrow'

const ruleTester = new RuleTester()

const tsTester = new RuleTester({
    languageOptions: {
        parser: tseslint.parser as any,
    },
})

describe('simple-arrow', () => {
    ruleTester.run('simple-arrow', simpleArrow, {
        invalid: [
            // Basic: single return with literal
            {
                code: 'function a() { return 1 }',
                errors: [{ messageId: 'preferArrow' }],
                output: 'const a = () => 1',
            },

            // With parameters
            {
                code: 'function add(a, b) { return a + b }',
                errors: [{ messageId: 'preferArrow' }],
                output: 'const add = (a, b) => a + b',
            },

            // String return
            {
                code: `function a() { return 'hello' }`,
                errors: [{ messageId: 'preferArrow' }],
                output: `const a = () => 'hello'`,
            },

            // Object return — wrap in parens
            {
                code: `function a() { return { a: 'b' } }`,
                errors: [{ messageId: 'preferArrow' }],
                output: `const a = () => ({ a: 'b' })`,
            },

            // Multiline object return — preserve format with dedent
            {
                code: [
                    'function a() {',
                    '    return {',
                    '        a: 1,',
                    '        b: 2,',
                    '    }',
                    '}',
                ].join('\n'),
                errors: [{ messageId: 'preferArrow' }],
                output: [
                    'const a = () => ({',
                    '    a: 1,',
                    '    b: 2,',
                    '})',
                ].join('\n'),
            },

            // Async function
            {
                code: `async function fetchData() { return fetch('/api') }`,
                errors: [{ messageId: 'preferArrow' }],
                output: `const fetchData = async () => fetch('/api')`,
            },

            // Export named
            {
                code: 'export function a() { return 1 }',
                errors: [{ messageId: 'preferArrow' }],
                output: 'export const a = () => 1',
            },

            // Export default with option enabled
            {
                code: `export default function a() { return { a: 'b' } }`,
                errors: [{ messageId: 'preferArrow' }],
                options: [{ exportDefault: true }],
                output: `export default () => ({ a: 'b' })`,
            },

            // Single param without destructuring — no parens needed
            {
                code: 'function double(x) { return x * 2 }',
                errors: [{ messageId: 'preferArrow' }],
                output: 'const double = x => x * 2',
            },

            // Single param with default value — needs parens
            {
                code: 'function greet(name = "world") { return "Hello " + name }',
                errors: [{ messageId: 'preferArrow' }],
                output: 'const greet = (name = "world") => "Hello " + name',
            },

            // Single rest param — needs parens
            {
                code: 'function first(...args) { return args[0] }',
                errors: [{ messageId: 'preferArrow' }],
                output: 'const first = (...args) => args[0]',
            },

            // Single destructured param — needs parens
            {
                code: 'function getName({ name }) { return name }',
                errors: [{ messageId: 'preferArrow' }],
                output: 'const getName = ({ name }) => name',
            },
        ],
        valid: [
            // Multiple statements
            'function a() { const x = 1; return x }',

            // No return
            'function a() { console.log(1) }',

            // Empty body
            'function a() {}',

            // Generator
            'function* gen() { return 1 }',

            // Uses this
            'function handler() { return this.name }',

            // Uses arguments
            'function sum() { return arguments[0] }',

            // Nested this in object return
            'function a() { return { name: this.name } }',

            // Export default with option off (default)
            'export default function a() { return 1 }',

            // Async with async option false
            {
                code: 'async function f() { return 1 }',
                options: [{ async: false }],
            },

            // Empty return (return;)
            'function a() { return }',

            // Arrow function using this in return value (this is inherited from outer scope)
            'function handler() {\n    return () => this.name\n}',
        ],
    })
})

describe('simple-arrow (typescript)', () => {
    tsTester.run('simple-arrow', simpleArrow, {
        invalid: [
            // Return type annotation
            {
                code: `function a(): string {\n    return 'hello'\n}`,
                errors: [{ messageId: 'preferArrow' }],
                output: `const a = (): string => 'hello'`,
            },

            // Generics
            {
                code: `function identity<T>(x: T) {\n    return x\n}`,
                errors: [{ messageId: 'preferArrow' }],
                output: `const identity = <T>(x: T) => x`,
            },

            // Generics with return type
            {
                code: `function identity<T>(x: T): T {\n    return x\n}`,
                errors: [{ messageId: 'preferArrow' }],
                output: `const identity = <T>(x: T): T => x`,
            },
        ],
        valid: [
            // Function overloads — skip
            `function a(x: number): number\nfunction a(x: string): string\nfunction a(x: any) {\n    return x\n}`,
        ],
    })
})
