module.exports = {
  preset: "jest-preset-angular",
  roots: ['src'],
  globals: {
    '__TS_CONFIG__': {
      'target': 'es6',
      'module': 'commonjs',
      'moduleResolution': 'node'
    },
    'ts-jest': {
      'tsConfigFile': 'tsconfig.spec.json'
    },
    '__TRANSFORM_HTML__': true
  },
  setupTestFrameworkScriptFile: '<rootDir>/src/test/setup-jest.ts',
  transform: {
    '^.+\\.(ts|html)$': '<rootDir>/node_modules/jest-preset-angular/preprocessor.js',
  },
  transformIgnorePatterns: [
    'node_modules/(?!@ngrx)'
  ],
  collectCoverageFrom: [
    './src/{app,testing}/**/*.ts',
    '!./src/app/**/index.ts',
    '!./src/app/**/*.{module,actions,model,db,routes}.ts',
    '!./src/testing/*-{jest,stub,entry,mocks}.ts'
  ],
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'json'
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    'src/app/*.{js}'
  ],
  testResultsProcessor: 'jest-sonar-reporter'
};
