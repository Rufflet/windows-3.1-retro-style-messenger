/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFiles: ["dotenv/config"],
  moduleNameMapper: {
    "^@root(.*)$": "<rootDir>/src$1",
    "^utils(.*)$": "<rootDir>/src/utils$1",
  },
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
};
