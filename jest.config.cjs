module.exports = {
  transform: {
    '^.+\\.(js|jsx|mjs)$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mock stylesheets
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js', // Mock image files
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  testMatch: ['**/generated_tests/output/**/*.test.jsx'],
  moduleDirectories: ['node_modules', 'src'],
  extensionsToTreatAsEsm: ['.jsx'],
  transformIgnorePatterns: [
    '/node_modules/(?!(@testing-library|react-router-dom|three)/)',
  ],
  globals: {
    'babel-jest': {
      useESModules: true,
    },
  },
};
