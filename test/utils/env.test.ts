import { afterEach, describe, expect, it } from 'bun:test'
import { getEnvironmentGlobals, isInEditor, isInGitHooksOrLintStaged } from '../../src/utils/env'

const ENV_KEYS = ['GIT_PARAMS', 'VSCODE_GIT_COMMAND', 'npm_lifecycle_script', 'CI', 'VSCODE_PID', 'VSCODE_CWD', 'JETBRAINS_IDE', 'VIM', 'NVIM', 'EMACS', 'INSIDE_EMACS', 'ZED_ENVIRONMENT', 'ZED_TERM'] as const

function clearEnv() {
    for (const key of ENV_KEYS) {
        delete process.env[key]
    }
}

describe('isInGitHooksOrLintStaged', () => {
    afterEach(clearEnv)

    it('returns false when no git hooks env vars are set', () => {
        expect(isInGitHooksOrLintStaged()).toBe(false)
    })

    it('returns true when GIT_PARAMS is set', () => {
        process.env.GIT_PARAMS = 'HEAD'
        expect(isInGitHooksOrLintStaged()).toBe(true)
    })

    it('returns true when VSCODE_GIT_COMMAND is set', () => {
        process.env.VSCODE_GIT_COMMAND = 'git'
        expect(isInGitHooksOrLintStaged()).toBe(true)
    })

    it('returns true when npm_lifecycle_script starts with lint-staged', () => {
        process.env.npm_lifecycle_script = 'lint-staged --concurrent false'
        expect(isInGitHooksOrLintStaged()).toBe(true)
    })

    it('returns false when npm_lifecycle_script does not start with lint-staged', () => {
        process.env.npm_lifecycle_script = 'eslint .'
        expect(isInGitHooksOrLintStaged()).toBe(false)
    })
})

describe('isInEditor', () => {
    afterEach(clearEnv)

    it('returns false when no env vars are set', () => {
        expect(isInEditor()).toBe(false)
    })

    it('returns false when CI is set', () => {
        process.env.CI = 'true'
        process.env.VSCODE_PID = '12345'
        expect(isInEditor()).toBe(false)
    })

    it('returns false when in git hooks', () => {
        process.env.GIT_PARAMS = 'HEAD'
        process.env.VSCODE_PID = '12345'
        expect(isInEditor()).toBe(false)
    })

    it('returns true when VSCODE_PID is set', () => {
        process.env.VSCODE_PID = '12345'
        expect(isInEditor()).toBe(true)
    })

    it('returns true when VSCODE_CWD is set', () => {
        process.env.VSCODE_CWD = '/home/user'
        expect(isInEditor()).toBe(true)
    })

    it('returns true when JETBRAINS_IDE is set', () => {
        process.env.JETBRAINS_IDE = 'WebStorm'
        expect(isInEditor()).toBe(true)
    })

    it('returns true when VIM is set', () => {
        process.env.VIM = '/usr/share/vim'
        expect(isInEditor()).toBe(true)
    })

    it('returns true when NVIM is set', () => {
        process.env.NVIM = 'true'
        expect(isInEditor()).toBe(true)
    })

    it('returns true when EMACS is set', () => {
        process.env.EMACS = 't'
        expect(isInEditor()).toBe(true)
    })

    it('returns true when INSIDE_EMACS is set', () => {
        process.env.INSIDE_EMACS = '29.1,comint'
        expect(isInEditor()).toBe(true)
    })

    it('returns true when ZED_ENVIRONMENT is set without ZED_TERM', () => {
        process.env.ZED_ENVIRONMENT = 'editor'
        expect(isInEditor()).toBe(true)
    })

    it('returns false when ZED_ENVIRONMENT and ZED_TERM are both set', () => {
        process.env.ZED_ENVIRONMENT = 'editor'
        process.env.ZED_TERM = 'true'
        expect(isInEditor()).toBe(false)
    })
})

describe('getEnvironmentGlobals', () => {
    it('returns builtin globals when no environments given', () => {
        const result = getEnvironmentGlobals([])
        expect(result).toHaveProperty('Array')
        expect(result).not.toHaveProperty('window')
        expect(result).not.toHaveProperty('process')
    })

    it('includes browser globals', () => {
        const result = getEnvironmentGlobals(['browser'])
        expect(result).toHaveProperty('window')
        expect(result).toHaveProperty('document')
    })

    it('includes node globals', () => {
        const result = getEnvironmentGlobals(['node'])
        expect(result).toHaveProperty('process')
        expect(result).toHaveProperty('Buffer')
    })

    it('merges multiple environments', () => {
        const result = getEnvironmentGlobals(['browser', 'node'])
        expect(result).toHaveProperty('window')
        expect(result).toHaveProperty('process')
    })
})
