import type { Config } from 'eslint/config'

export type Environment = 'browser' | 'bun' | 'deno' | 'node'

export interface EslintConfigContext {
    environments: Environment[]
    isInEditor: boolean
}

export type EslintConfig<TOptions extends NonNullable<unknown> = NonNullable<unknown>> = (context: EslintConfigContext, options?: TOptions) => Config | Config[]
