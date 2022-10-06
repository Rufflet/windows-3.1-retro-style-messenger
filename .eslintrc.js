module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  plugins: ["import", "@typescript-eslint", "prettier"],
  extends: [
    "airbnb-typescript-prettier",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  overrides: [],
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "import/prefer-default-export": 0,
    "no-restricted-exports": 0,
    "no-underscore-dangle": 0,
    "class-methods-use-this": 1,
  },
};
