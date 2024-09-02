module.exports = {
  preset: 'ts-jest', // Add this line
  testEnvironment: 'jsdom',
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(axios|react-router-dom)/)"
  ],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
  moduleNameMapper: {
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
    '^.+\\.(css|sass|scss)$': 'identity-obj-proxy',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.svg$': '<rootDir>/__mocks__/svgMock.js',
    '^entities/(.*)$': '<rootDir>/src/entities/$1',
    '^shared/(.*)$': '<rootDir>/src/shared/$1',
    '^features/(.*)$': '<rootDir>/src/features/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
}
