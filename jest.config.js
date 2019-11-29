module.exports = {
  testMatch: ['**/?(*.)+(spec|test).ts?(x)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'mjs'],
  transform: {
    '\\.tsx?$': 'ts-jest',
    '\\.m?js$': 'ts-jest'
  },
  moduleDirectories: ['node_modules']
};
