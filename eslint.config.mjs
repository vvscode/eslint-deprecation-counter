import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import deprecate from "eslint-plugin-deprecate";
import fs from "node:fs";

export default [
  { ignores: ["**/node_modules/**", ".git/**"] },
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: fs.existsSync("./tsconfig.json")
          ? "./tsconfig.json"
          : undefined,
        projectService: {
          allowDefaultProject: ["*.js", "*.jsx", "*.ts", "*.tsx"],
        },
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      deprecate,
    },
    rules: {
      "@typescript-eslint/no-deprecated": "warn",
    },
  },
];
