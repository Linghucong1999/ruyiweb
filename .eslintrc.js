module.exports = {
    root: true,
    env: {
        node: true,
    },
    'extends': [
        'plugin:vue/essential',
        'eslint:recommended'
    ],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-unused-vars': 'off',
        'vue/multi-word-component-names': 0,
    },
    parserOptions: {
        parser: 'babel-eslint'
    }
}