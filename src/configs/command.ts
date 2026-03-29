import type { EslintConfig } from '../types'
import plugin from 'eslint-plugin-command/config'

export const command: EslintConfig = () => [
    plugin(),
]
