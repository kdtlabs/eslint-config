import type { Config } from 'eslint/config'
import type { EslintConfig } from '../../types'
import markdown from '@eslint/markdown'
import markdownLinks from 'eslint-plugin-markdown-links'
import markdownPreferences from 'eslint-plugin-markdown-preferences'
import { incompatibleRules, linksDeadUrlRules, linksOverrideRules, markdownOverrideRules, preferencesOverrideRules } from './rules'

export interface MarkdownConfigOptions {
    checkDeadUrls?: boolean
}

const markdownRecommended = markdown.configs.recommended[0] as Config
const preferencesStandard = markdownPreferences.configs.standard as Config
const linksRecommended = markdownLinks.configs.recommended as Config

export const markdownConfig: EslintConfig<MarkdownConfigOptions> = (_, { checkDeadUrls = false } = {}) => {
    const files = ['**/*.md']
    const language = 'markdown/gfm' as const
    const languageOptions = { frontmatter: 'yaml' as const }

    return [
        {
            files,
            rules: incompatibleRules,
        },
        {
            ...markdownRecommended,
            files,
            language,
            languageOptions,
            rules: {
                ...markdownRecommended.rules,
                ...markdownOverrideRules,
            },
        },
        {
            ...preferencesStandard,
            files,
            rules: {
                ...preferencesStandard.rules,
                ...preferencesOverrideRules,
            },
        },
        {
            ...linksRecommended,
            files,
            rules: {
                ...linksRecommended.rules,
                ...linksOverrideRules,
                ...(checkDeadUrls ? linksDeadUrlRules : {}),
            },
        },
    ]
}

export { linksOverrideRules, markdownOverrideRules, preferencesOverrideRules }
