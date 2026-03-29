import kdt from './src/index'

export default kdt({}, [
    { ignores: ['docs/superpowers'] },
    {
        files: ['src/factory.ts'],
        rules: {
            'sonarjs/cyclomatic-complexity': 'off',
        },
    },
])
