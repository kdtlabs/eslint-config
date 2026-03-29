import type { Config } from 'eslint/config'
import { toArray } from './array'

export const flatRules = (rules: Array<Config['rules']> | Config['rules']): Config['rules'] => {
    const result: Config['rules'] = {}

    for (const r of toArray(rules)) {
        Object.assign(result, r)
    }

    return result
}

export const resolveOptions = <T>(options: T | boolean | null | undefined, defaultOptions: NonNullable<T> | false) => {
    if (options === true) {
        return defaultOptions
    }

    if (options === false) {
        return false
    }

    return options ?? defaultOptions
}
