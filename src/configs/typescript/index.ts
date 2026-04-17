import type { EslintConfig } from '../../types'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript'
import importX from 'eslint-plugin-import-x'
import typescriptEslint from 'typescript-eslint'
import { flatRules, toArray } from '../../utils'
import { typescriptRules, typescriptTypeAwareRules } from './rules'

export interface TypescriptConfigOptions {
    extraFileExtensions?: string[]
    tsconfigPath?: string[] | string
    tsconfigRootDir?: string
}

export const typescript: EslintConfig<TypescriptConfigOptions> = ({ environments }, options = {}) => {
    const { extraFileExtensions = [], tsconfigPath = ['tsconfig.json'], tsconfigRootDir = process.cwd() } = options

    const files = [`**/*.?([cm])[jt]s?(x)`, ...extraFileExtensions.map((ext) => `**/*.${ext}`)]
    const tsconfigPaths = toArray(tsconfigPath).map((path) => join(tsconfigRootDir, path))
    const isTsConfigExists = tsconfigPaths.every((path) => existsSync(path))

    return [
        {
            extends: ['import-x/flat/typescript'],
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
                'import-x': importX,
            },
            rules: {
                ...flatRules(typescriptEslint.configs.strict.map((c) => c.rules)),
                ...flatRules(typescriptEslint.configs.stylistic.map((c) => c.rules)),
                ...importX.configs.typescript.rules,
                ...typescriptRules,
            },
            settings: {
                'import-x/resolver-next': [
                    createTypeScriptImportResolver({
                        alwaysTryTypes: true,
                        bun: environments.includes('bun'),
                        project: isTsConfigExists ? tsconfigPaths : undefined,
                    }),
                ],
            },
        },
        isTsConfigExists ? {
            files: [`**/*.?([cm])ts?(x)`],
            languageOptions: {
                parserOptions: { project: tsconfigPath, tsconfigRootDir },
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
                'import-x/no-duplicates': 'off',
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
