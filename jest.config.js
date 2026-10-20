/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFiles: ["dotenv/config"],
  moduleNameMapper: {
    "^@root(.*)$": "<rootDir>/src$1",
    "^utils(.*)$": "<rootDir>/src/utils$1",
    "^api(.*)$": "<rootDir>/src/api$1",
    "^mock(.*)$": "<rootDir>/src/mock$1",
    "^core(.*)$": "<rootDir>/src/core$1",
    "^services(.*)$": "<rootDir>/src/services$1",
    "^assets/(.*)$": "<rootDir>/src/__mocks__/fileMock.js",
    "\\.(png|jpg|jpeg|gif|svg)$": "<rootDir>/src/__mocks__/fileMock.js",
  },
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
};
