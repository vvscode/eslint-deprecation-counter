#!/usr/bin/env node
import { ESLint } from "eslint";
import { resolve } from "node:path";
import config from "./eslint.config.mjs";
import crypto from "node:crypto";

const LINT_FILES = process.env.LINT_FILES ?? "./**/*.{js,ts,tsx}";
const IGNORE_PATTERNS = (
  process.env.IGNORE_PATTERNS ?? "**/node_modules/**,.git/**"
).split(",");

const hashString = (data) =>
  crypto.createHash("sha256").update(data, "utf8").digest("hex");

const __dirname = import.meta.dirname;

const eslint = new ESLint({
  allowInlineConfig: false,
  baseConfig: config,
  overrideConfigFile: resolve(__dirname, "eslint.config.mjs"),
  cache: true,
  cacheStrategy: process.env.CI ? "content" : "metadata",
  cacheLocation: resolve(__dirname, `${hashString(process.cwd())}.eslintcache`),
  ignore: true,
  ignorePatterns: IGNORE_PATTERNS,
  stats: true,
  errorOnUnmatchedPattern: false,
});

eslint
  .lintFiles([LINT_FILES])
  .then(async (results) => {
    let hash = {};
    results.forEach((el) => {
      el.messages.forEach((msg) => {
        if (msg.ruleId !== "@typescript-eslint/no-deprecated") {
          return;
        }
        hash[msg.message] = (hash[msg.message] ?? 0) + 1;
      });
    });

    console.log(JSON.stringify(hash, null, 2));
    const errorCount = results.reduce((sum, file) => sum + file.errorCount, 0);
    process.exit(errorCount ? 1 : 0);
  })
  .catch(console.error);
