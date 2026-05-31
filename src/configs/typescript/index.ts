import type { EslintConfig } from '../../types'
import { existsSync } from 'node:fs'
import { join, relative } from 'node:path'
import typescriptEslint from 'typescript-eslint'
import { flatRules, toArray } from '../../utils'
import { typescriptRules, typescriptTypeAwareRules } from './rules'

export interface TypescriptConfigOptions {
    extraFileExtensions?: string[]
    tsconfigPath?: string[] | string
    tsconfigRootDir?: string
}

export const typescript: EslintConfig<TypescriptConfigOptions> = (_, options = {}) => {
    const { extraFileExtensions = [], tsconfigPath = ['tsconfig.json'], tsconfigRootDir = process.cwd() } = options

    const files = [`**/*.?([cm])[jt]s?(x)`, ...extraFileExtensions.map((ext) => `**/*.${ext}`)]
    const tsconfigPaths = toArray(tsconfigPath)
    const resolvedTsconfigPaths = tsconfigPaths.map((path) => join(tsconfigRootDir, path))
    const isTsConfigExists = resolvedTsconfigPaths.every((path) => existsSync(path))
    const defaultProject = isTsConfigExists && tsconfigPaths.length === 1 ? relative(tsconfigRootDir, resolvedTsconfigPaths[0]!) || tsconfigPaths[0] : undefined

    return [
        {
            files,
            languageOptions: {
                parser: typescriptEslint.parser,
                parserOptions: {
                    extraFileExtensions: extraFileExtensions.map((ext) => `.${ext}`),
                    warnOnUnsupportedTypeScriptVersion: false,
                },
            },
            plugins: {
                '@typescript-eslint': typescriptEslint.plugin,
            },
            rules: {
                ...flatRules(typescriptEslint.configs.strict.map((c) => c.rules)),
                ...flatRules(typescriptEslint.configs.stylistic.map((c) => c.rules)),
                ...typescriptRules,
            },
        },
        isTsConfigExists ? {
            files: [`**/*.?([cm])ts?(x)`],
            languageOptions: {
                parserOptions: {
                    projectService: defaultProject ? { defaultProject } : true,
                    tsconfigRootDir,
                },
            },
            rules: {
                ...flatRules(typescriptEslint.configs.strictTypeChecked.map((c) => c.rules)),
                ...flatRules(typescriptEslint.configs.stylisticTypeChecked.map((c) => c.rules)),
                ...typescriptRules,
                ...typescriptTypeAwareRules,
            },
        } : {},
        {
            files: ['**/*.d.ts'],
            rules: {
                '@eslint-community/eslint-comments/no-unlimited-disable': 'off',
                'import-lite/no-duplicates': 'off',
                'no-restricted-syntax': 'off',
                'unused-imports/no-unused-vars': 'off',
            },
        },
        {
            files: ['**/*.js', '**/*.cjs'],
            rules: {
                '@typescript-eslint/no-require-imports': 'off',
                '@typescript-eslint/no-var-requires': 'off',
            },
        },
        {
            files: ['**/*.{test,spec}.js?(x)'],
            rules: {
                '@typescript-eslint/await-thenable': 'off',
            },
        },
    ]
}

export { typescriptRules, typescriptTypeAwareRules }
