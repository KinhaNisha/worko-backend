module.exports = {
    setupFiles: ['module-alias/register'],
    moduleNameMapper: {
      '^@routes/(.*)$': '<rootDir>/routes/$1',
    },
    testEnvironment: 'node',
  };
  