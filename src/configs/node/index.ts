import type { Config } from 'eslint/config'
import type { EslintConfig } from '../../types'
import nodePlugin from 'eslint-plugin-n'
import { nodeCjsOnlyOverrides, nodeExtraRules, nodeVersionDependentOverrides, securityNodeOnlyOverrides, securityOverrideRules } from './rules'

// @ts-expect-error: no types
import securityPlugin from 'eslint-plugin-security'

export interface NodeConfigOptions {
    security?: boolean
}

export const node: EslintConfig<NodeConfigOptions> = ({ environments }, { security = true } = {}) => {
    const isBun = environments.includes('bun')
    const isDeno = environments.includes('deno')
    const isNonNodeRuntime = (isBun || isDeno) && !environments.includes('node')

    const configs: Config[] = [
        {
            ...nodePlugin.configs['flat/recommended'],
            rules: {
                ...nodePlugin.configs['flat/recommended'].rules,
                ...nodeExtraRules,
            },
        },
    ]

    if (security) {
        configs.push({
            ...securityPlugin.configs.recommended,
            rules: {
                ...securityPlugin.configs.recommended.rules,
                ...securityOverrideRules,
            },
        })
    }

    if (isBun) {
        configs.push({ rules: nodeVersionDependentOverrides })
    }

    if (isDeno) {
        configs.push({
            rules: {
                ...nodeVersionDependentOverrides,
                ...nodeCjsOnlyOverrides,
                ...(security ? securityNodeOnlyOverrides : {}),
            },
        })
    }

    if (isNonNodeRuntime) {
        configs.push({
            rules: {
                'n/hashbang': 'off',
                'n/no-process-exit': 'off',
                'n/no-unpublished-bin': 'off',
            },
        })
    }

    configs.push(
        {
            files: ['**/*.{test,spec}.?([cm])[jt]s?(x)', '**/test/**', '**/tests/**', '**/__tests__/**'],
            rules: {
                ...(security ? { 'security/detect-child-process': 'off', 'security/detect-non-literal-require': 'off' } : {}),
            },
        },
        {
            files: ['**/scripts/**', '**/bin/**'],
            rules: {
                'n/hashbang': 'off',
                'n/no-process-exit': 'off',
            },
        },
    )

    return configs
}
