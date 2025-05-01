module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
    '^.+\\.mjs$': 'babel-jest',
  },
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx}',
    '<rootDir>/src/**/*.{spec,test}.{js,jsx}',
    '<rootDir>/src/services/generated_tests/output/*.test.jsx',
  ],
  moduleFileExtensions: ['js', 'jsx', 'mjs'],
  transformIgnorePatterns: [
    '/node_modules/(?!(three|@react-three|three/examples/jsm)/)',
  ],
  moduleDirectories: ['node_modules', 'src'],
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
};
