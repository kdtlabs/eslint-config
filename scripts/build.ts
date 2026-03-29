import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const rootPath = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const entrypoint = resolve(rootPath, 'src/index.ts')

console.log('📦 Bundling...')

const result = await Bun.build({
    drop: ['console', 'debugger'],
    entrypoints: [entrypoint],
    env: 'disable',
    format: 'esm',
    minify: true,
    outdir: 'dist',
    packages: 'external',
    root: 'src',
    sourcemap: 'linked',
    target: 'node',
})

if (result.logs.length > 0) {
    console.warn(`⚠️  Build completed with ${result.logs.length} warning(s):`)

    for (const log of result.logs) {
        console.warn(log)
    }
} else {
    const formatter = new Intl.NumberFormat()
    const output = result.outputs[0]

    if (output) {
        console.log(`   📄 index.js (${formatter.format(output.size)} bytes)`)
    }

    console.log('✅ Build complete!')
}
