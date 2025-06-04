# eslint-deprecation-counter [![npm version](https://img.shields.io/npm/v/eslint-deprecation-counter.svg?style=flat-square)](https://www.npmjs.com/package/eslint-deprecation-counter)

A CLI tool to detect and count deprecated API usage in your TypeScript and JavaScript projects using ESLint.

## Features

- Detects deprecated code in `.ts`, `.tsx`, `.js`, and `.jsx` files.
- Customizable file patterns and ignore patterns.
- Outputs a JSON summary of deprecation counts.
- Supports TypeScript type-level deprecation detection.

## Installation

Run directly using `npx`:

```bash
npx eslint-deprecation-counter
```

## Usage

Run the command in your project's root directory:

```bash
npx eslint-deprecation-counter
```

### Environment Variables

- `LINT_FILES`: Override the default file pattern (`./**/*.{ts,tsx}`) to specify files to lint.

  Example:

  ```bash
  LINT_FILES='./src/**/*.{js,ts,tsx}' npx eslint-deprecation-counter
  ```

- `IGNORE_PATTERNS`: Customize ignore patterns (comma-separated). Defaults to `"**/node_modules/**,.git/**"`.

  Example:

  ```bash
  IGNORE_PATTERNS="**/dist/**,**/build/**" npx eslint-deprecation-counter
  ```

- `CI`: When set, optimizes ESLint's caching strategy for CI environments.

## TypeScript Support

To detect deprecations in TypeScript declaration files (`.d.ts`) and type-level deprecations, ensure you have a `tsconfig.json` file in your project's root.

## Example Output

```json
{
  "'oldFunction' is deprecated.": 3,
  "'legacyAPI' is deprecated.": 1
}
```
