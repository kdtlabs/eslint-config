import type { Environment } from './types'
import globals from 'globals'

export const ENVIRONMENT_GLOBALS: Record<Environment, Record<string, boolean>> = {
    browser: { ...globals.browser, ...globals.worker, ...globals.serviceworker },
    bun: { ...globals.nodeBuiltin, ...globals.node, ...globals.bunBuiltin },
    deno: { ...globals.denoBuiltin },
    node: { ...globals.nodeBuiltin, ...globals.node },
}

export const GLOB_EXCLUDE = [
    // Lock files
    '**/bun.lock',
    '**/bun.lockb',
    '**/deno.lock',
    '**/package-lock.json',
    '**/pnpm-lock.yaml',
    '**/yarn.lock',

    // Build outputs
    '**/dist',
    '**/out',
    '**/output',
    '**/coverage',
    '**/storybook-static',

    // Generated files
    '**/*.min.*',
    '**/auto-import?(s).d.ts',
    '**/components.d.ts',
    '**/typed-router.d.ts',
    '**/vite.config.*.timestamp-*',
    '**/CHANGELOG*.md',
    '**/LICENSE*',
    '**/__snapshots__',

    // Temp / cache
    '**/temp',
    '**/.temp',
    '**/tmp',
    '**/.tmp',
    '**/.cache',
    '**/.history',

    // Dependencies
    '**/node_modules',
    '**/.yarn',

    // IDE / editor
    '**/.idea',
    '**/.vscode',

    // Framework caches
    '**/.angular',
    '**/.astro',
    '**/.changeset',
    '**/.docusaurus',
    '**/.expo',
    '**/.next',
    '**/.nitro',
    '**/.nuxt',
    '**/.output',
    '**/.remix',
    '**/.svelte-kit',
    '**/.turbo',
    '**/.vercel',
    '**/.vite-inspect',
    '**/.vitepress/cache',
    '**/.wrangler',

    // AI Coding Assistants
    '**/.claude',
    '**/.kilocode',
]
