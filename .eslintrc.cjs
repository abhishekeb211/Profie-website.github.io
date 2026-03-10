module.exports = {
  env: { browser: true, es2022: true },
  parserOptions: { ecmaVersion: 2022, sourceType: "script" },
  extends: ["eslint:recommended"],
  globals: { self: "readonly" },
  rules: {
    "no-console": ["warn", { allow: ["warn", "error"] }],
    "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }]
  }
};
