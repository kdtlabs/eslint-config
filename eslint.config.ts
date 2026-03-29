import kdt from './src/index'

export default kdt({}, {
    files: ['src/factory.ts'],
    rules: {
        'sonarjs/cyclomatic-complexity': 'off',
    },
})
