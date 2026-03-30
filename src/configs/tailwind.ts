import type { EslintConfig } from '../types'
import betterTailwindcss from 'eslint-plugin-better-tailwindcss'

export const tailwind: EslintConfig = () => [
    betterTailwindcss.configs['recommended-error'],
    {
        rules: {
            'better-tailwindcss/no-unknown-classes': 'off',
        },
    },
]
