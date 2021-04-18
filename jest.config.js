module.exports = {
  testPathIgnorePatterns: ['/node_modules/'],
  preset: 'ts-jest',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.ts',
  ],
}
