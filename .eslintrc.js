const { isProd } = require('./build-utils/is-prod.cjs');

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  env: {
    node: true,
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    "@typescript-eslint/array-type": "error",
    '@typescript-eslint/no-explicit-any': isProd() ? 'error' : 'warn',
    'id-length': ['error', { min: 3, exceptions: ['i', 'j', '_', 'err', 'id', 'pg'], properties: 'never' }],
    '@typescript-eslint/no-explicit-any': isProd() ? 'error' : 'warn',
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        pathGroupsExcludedImportTypes: ['builtin'],
      },
    ],
    '@typescript-eslint/member-ordering': [
      'error',
      {
        default: [
          'signature',
          // Fields
          'public-decorated-field',
          'public-instance-field',
          'protected-decorated-field',
          'protected-instance-field',
          'private-decorated-field',
          'private-instance-field',
          'public-abstract-field',
          'protected-abstract-field',
          // Constructors
          'public-constructor',
          'protected-constructor',
          'private-constructor',
          // Methods
          'public-decorated-method',
          'public-instance-method',
          'protected-decorated-method',
          'protected-instance-method',
          'private-decorated-method',
          'private-instance-method',
          'public-abstract-method',
          'protected-abstract-method',
          'public-static-field',
          'protected-static-field',
          'private-static-field',
          'public-static-method',
          'protected-static-method',
          'private-static-method',
        ],
      },
    ],
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: ['const', 'let', 'var'],
        next: '*',
      },
      {
        blankLine: 'any',
        prev: ['const', 'let', 'var'],
        next: ['const', 'let', 'var'],
      },
      {
        blankLine: 'always',
        prev: 'directive',
        next: '*',
      },
      {
        blankLine: 'any',
        prev: 'directive',
        next: 'directive',
      },
      {
        blankLine: 'always',
        prev: 'block',
        next: '*',
      },
      {
        blankLine: 'any',
        prev: 'block',
        next: 'block',
      },
      {
        blankLine: 'always',
        prev: '*',
        next: 'return',
      },
      {
        blankLine: 'always',
        prev: '*',
        next: ['multiline-expression', 'if', 'for', 'while', 'try', 'switch', 'do'],
      },
    ],
    'no-console': [
      isProd() ? 'error' : 'warn',
      {
        allow: ['warn', 'error'],
      },
    ],
    'no-unused-vars': [
      isProd() ? 'error' : 'warn',
      {
        argsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/no-unused-vars': [
      isProd() ? 'error' : 'warn',
      {
        argsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/ban-types': 'error',
    'no-async-promise-executor': 'error',
    'no-undef': 'error',
    'no-useless-escape': 'error',
    'no-prototype-builtins': 'error',
    'getter-return': 'error',
    'max-len': [
      'error',
      {
        code: 140,
        ignorePattern: '^import .*',
        ignoreUrls: true,
        ignoreRegExpLiterals: true,
      },
    ],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'property',
        modifiers: ['public'],
        leadingUnderscore: 'forbid',
        format: ['camelCase', 'UPPER_CASE', 'snake_case'],
      },
      {
        selector: 'variable',
        leadingUnderscore: 'forbid',
        format: ['camelCase', 'UPPER_CASE'],
      },
      {
        selector: 'parameter',
        format: ['camelCase'],
      },
      {
        selector: 'objectLiteralProperty',
        types: ['array', 'function'],
        format: ['camelCase', 'UPPER_CASE'],
      },
      {
        selector: 'objectLiteralProperty',
        types: ['boolean', 'string', 'number'],
        format: ['camelCase', 'UPPER_CASE', 'PascalCase', 'snake_case'],
      },
      {
        selector: ['property', 'parameterProperty'],
        modifiers: ['private'],
        leadingUnderscore: 'require',
        format: ['camelCase'],
      },
      {
        selector: 'method',
        modifiers: ['private'],
        leadingUnderscore: 'forbid',
        format: ['camelCase'],
      },
      {
        selector: ['enum', 'enumMember'],
        format: ['PascalCase', 'UPPER_CASE'],
      },
      {
        selector: ['typeLike', 'interface'],
        format: ['PascalCase'],
        leadingUnderscore: 'allow',
      },
      {
        selector: 'parameter',
        modifiers: ['unused'],
        leadingUnderscore: 'allow',
        format: null,
      },
      {
        selector: ['classProperty', 'typeProperty'],
        modifiers: ['readonly'],
        format: ['UPPER_CASE', 'PascalCase', 'camelCase'],
        leadingUnderscore: 'forbid',
      },
      {
        selector: 'class',
        modifiers: ['abstract'],
        prefix: ['Abstract'],
        format: null,
      },
    ],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
        trailingComma: 'all',
      },
    ],
  },
  overrides: [
    {
      files: ['*.spec.ts', '*.e2e-spec.ts'],
      env: {
        jest: true,
      },
    },
  ],
};
