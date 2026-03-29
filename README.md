# @kdtlabs/eslint-config

Shared [ESLint](https://eslint.org/) flat config for KDT Labs projects.

## Features

- ESLint v10+ flat config format
- TypeScript-first with strict type checking
- Vue.js support with auto-detection
- Stylistic rules via [@stylistic/eslint-plugin](https://eslint.style/) (single quotes, no semicolons, 4-space indent, 1TBS brace style)
- Linting for JSON/JSONC, YAML, TOML, and Markdown files
- Code quality plugins: [SonarJS](https://github.com/SonarSource/SonarJS), [unicorn](https://github.com/sindresorhus/eslint-plugin-unicorn), [regexp](https://github.com/ota-meshi/eslint-plugin-regexp), [perfectionist](https://perfectionist.dev/), [security](https://github.com/eslint-community/eslint-plugin-security)
- Tailwind CSS support with auto-detection
- Editor-aware rules (relaxed severity in IDEs)
- Custom `kdt` plugin with opinionated formatting rules
- Environment-aware globals (browser, Node.js, Bun, Deno)

## Install

```sh
bun add -D @kdtlabs/eslint-config eslint
```

## Usage

Create an `eslint.config.ts` (or `eslint.config.js`) in your project root:

```ts
import kdt from '@kdtlabs/eslint-config'

export default kdt()
```

### With options

```ts
import kdt from '@kdtlabs/eslint-config'

export default kdt({
    // Target environments (default: ['browser', 'bun', 'node'])
    environments: ['browser', 'node'],

    // Style preferences
    style: {
        indent: 4,        // number or 'tab' (default: 4)
        printWidth: 120,   // max line length, false to disable
    },

    // Toggle feature configs (all default to true unless noted)
    typescript: true,
    vue: true,             // auto-detected from installed packages
    tailwind: true,        // auto-detected from installed packages
    jsonc: true,
    yml: true,
    toml: true,
    markdown: true,
    jsdoc: true,
    unicorn: true,
    perfectionist: true,
    sonarjs: true,
    regexp: true,
    node: false,           // default: false (enabled automatically for node-like environments)
    command: true,
})
```

### With custom overrides

```ts
import kdt from '@kdtlabs/eslint-config'

export default kdt({}, {
    files: ['src/**/*.ts'],
    rules: {
        'no-console': 'warn',
    },
})
```

### Disabling a config

Pass `false` to disable any config:

```ts
import kdt from '@kdtlabs/eslint-config'

export default kdt({
    vue: false,
    markdown: false,
})
```

## Custom Rules (`kdt` plugin)

This package includes a custom ESLint plugin with the following rules:

| Rule                           | Description                                           |
| ------------------------------ | ----------------------------------------------------- |
| `kdt/arrow-empty-body-newline` | Enforce empty arrow function bodies on a single line  |
| `kdt/import-single-line`       | Enforce import statements on a single line            |
| `kdt/object-curly-newline`     | Enforce consistent newlines inside object braces      |
| `kdt/sort-union-types`         | Sort types in union and intersection type annotations |

## License

[MIT](LICENSE.md)
