import type { Environment } from '../types'
import globals from 'globals'
import { ENVIRONMENT_GLOBALS } from '../constants'

export const isInGitHooksOrLintStaged = () => {
    return !!(process.env.GIT_PARAMS ?? process.env.VSCODE_GIT_COMMAND ?? process.env.npm_lifecycle_script?.startsWith('lint-staged'))
}

export const isInEditor = () => {
    if (process.env.CI || isInGitHooksOrLintStaged()) {
        return false
    }

    return !!(process.env.VSCODE_PID ?? process.env.VSCODE_CWD ?? process.env.JETBRAINS_IDE ?? process.env.VIM ?? process.env.NVIM ?? process.env.EMACS ?? process.env.INSIDE_EMACS ?? (process.env.ZED_ENVIRONMENT && !process.env.ZED_TERM))
}

export const getEnvironmentGlobals = (environments: Environment[]) => {
    const result: Record<string, boolean> = { ...globals.builtin }

    for (const env of environments) {
        Object.assign(result, ENVIRONMENT_GLOBALS[env])
    }

    return result
}
