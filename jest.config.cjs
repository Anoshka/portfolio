module.exports = {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
  transform: {
    '^.+\\.(js|jsx|mjs)$': 'babel-jest',
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  testMatch: ['**/generated_tests/output/**/*.test.jsx'],
  moduleDirectories: ['node_modules', 'src'],
  extensionsToTreatAsEsm: ['.jsx'],
  transformIgnorePatterns: [
    '/node_modules/(?!(@testing-library|react-router-dom)/)',
  ],
};
