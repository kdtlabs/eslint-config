import type { EslintConfigContext } from './types'
import { type Config, defineConfig } from 'eslint/config'
import { isPackageExists } from 'local-pkg'
import { javascript, jsdoc, jsonc, type JsoncConfigOptions, markdownConfig, type MarkdownConfigOptions, node, type NodeConfigOptions, perfectionist, regexp, sonarjs, type StyleOptions, stylistic, tailwind as tailwindCss, toml as tomlConfig, type TomlConfigOptions, typescript, type TypescriptConfigOptions, unicorn, vue as vueCfg, type VueConfigOptions, yml as ymlConfig, type YmlConfigOptions } from './configs'
import { command as commandConfig } from './configs/command'
import { isInEditor, resolveOptions } from './utils'

export interface EslintConfigOptions extends Partial<EslintConfigContext> {
    command?: boolean
    jsdoc?: boolean
    jsonc?: JsoncConfigOptions | boolean
    markdown?: MarkdownConfigOptions | boolean
    node?: NodeConfigOptions | boolean
    perfectionist?: boolean
    regexp?: boolean
    sonarjs?: boolean
    style?: StyleOptions
    tailwind?: boolean
    toml?: TomlConfigOptions | boolean
    typescript?: TypescriptConfigOptions | boolean
    unicorn?: boolean
    vue?: VueConfigOptions | boolean
    yml?: YmlConfigOptions | boolean
}

export const kdt = ({ command = true, environments = ['browser', 'bun', 'node'], style = {}, tailwind, vue, ...options }: EslintConfigOptions = {}, customConfigs: Config | Config[] = []) => {
    const context: EslintConfigContext = {
        environments,
        isInEditor: options.isInEditor ?? isInEditor(),
    }

    const typescriptOptions = resolveOptions(options.typescript, {})
    const vueOptions = resolveOptions(vue ?? isPackageExists('vue'), {})
    const configs: Array<Config | Config[]> = [javascript(context)]

    if (typescriptOptions !== false) {
        configs.push(typescript(context, { ...typescriptOptions, extraFileExtensions: [...typescriptOptions.extraFileExtensions ?? [], ...(vueOptions === false ? [] : ['vue'])] }))
    }

    if (options.jsdoc ?? true) {
        configs.push(jsdoc(context))
    }

    const jsoncOptions = resolveOptions(options.jsonc, {})

    if (jsoncOptions !== false) {
        configs.push(jsonc(context, jsoncOptions))
    }

    const styleIndent = typeof style.indent === 'number' ? style.indent : undefined
    const tomlOptions = resolveOptions(options.toml, {})

    if (tomlOptions !== false) {
        configs.push(tomlConfig(context, { indent: styleIndent, ...tomlOptions }))
    }

    const ymlOptions = resolveOptions(options.yml, {})

    if (ymlOptions !== false) {
        configs.push(ymlConfig(context, { indent: styleIndent, ...ymlOptions }))
    }

    const nodeOptions = resolveOptions(options.node, false)
    const hasNodeLikeEnv = environments.some((e) => e === 'node' || e === 'bun' || e === 'deno')

    if (nodeOptions !== false || hasNodeLikeEnv) {
        configs.push(node(context, nodeOptions === false ? {} : nodeOptions))
    }

    configs.push(stylistic(context, style))

    if (options.perfectionist ?? true) {
        configs.push(perfectionist(context))
    }

    if (options.unicorn ?? true) {
        configs.push(unicorn(context))
    }

    if (options.regexp ?? true) {
        configs.push(regexp(context))
    }

    if (options.sonarjs ?? true) {
        configs.push(sonarjs(context))
    }

    if (tailwind ?? isPackageExists('tailwindcss')) {
        configs.push(tailwindCss(context))
    }

    if (vueOptions !== false) {
        configs.push(vueCfg(context, vueOptions))
    }

    const markdownOptions = resolveOptions(options.markdown, {})

    if (markdownOptions !== false) {
        configs.push(markdownConfig(context, markdownOptions))
    }

    if (command) {
        configs.push(commandConfig(context))
    }

    return defineConfig(configs, customConfigs)
}
