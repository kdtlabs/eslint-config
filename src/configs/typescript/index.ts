import type { EslintConfig } from '../../types'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript'
import importX from 'eslint-plugin-import-x'
import typescriptEslint from 'typescript-eslint'
import { toArray } from '../../utils'
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
            rules: typescriptRules,
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
        {
            files: [`**/*.?([cm])ts?(x)`],
            languageOptions: {
                parserOptions: {
                    ...(isTsConfigExists ? { project: tsconfigPath, tsconfigRootDir } : {}),
                },
            },
            rules: isTsConfigExists ? { ...typescriptTypeAwareRules, ...typescriptRules } : {},
        },
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
    ]
}

export { typescriptRules, typescriptTypeAwareRules }
