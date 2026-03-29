import type { EslintConfig } from '../types'
import betterTailwindcss from 'eslint-plugin-better-tailwindcss'

export const tailwind: EslintConfig = () => [
    betterTailwindcss.configs.recommended,
    {
        rules: {
            'better-tailwindcss/no-unknown-classes': 'off',
        },
    },
]
