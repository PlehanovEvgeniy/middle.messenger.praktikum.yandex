module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true
  },
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint'
  ],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: "latest"
  },
  rules: {
    'implicit-arrow-linebreak': 'off',
    'no-shadow': 'off',
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'max-len': [
      2,
      1000
    ],
    indent: [
      'error',
      2
    ],
    'no-console': 'off',
    'consistent-return': 'off',
    'class-methods-use-this': 'off',
    'array-callback-return': 'off',
    'no-param-reassign': 'off',
    'import/no-dynamic-require': 'off',
    'no-underscore-dangle': 'off',
    'no-undef': 0,
    'import/no-extraneous-dependencies': 0,
    'func-names': [
      'error',
      'never',
      {
        generators: 'as-needed'
      }
    ],
    'global-require': 0,
    'import/extensions': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: [
          '.js',
          '.jsx',
          '.ts',
          '.tsx'
        ],
        moduleDirectory: [
          'node_modules',
          '/src'
        ]
      }
    }
  }
};
