# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a VS Code extension project called "my-timestamp". It's a basic extension scaffolded from the VS Code extension template with a simple "Hello World" command.

## Build and Development Commands

```bash
# Compile TypeScript to JavaScript
npm run compile

# Watch mode for development (auto-recompiles on changes)
npm run watch

# Run linter
npm run lint

# Run all tests
npm test

# Prepare for publishing (runs compile)
npm run vscode:prepublish
```

## Testing

- Tests are located in `src/test/` directory
- Test configuration is in `.vscode-test.mjs`
- Tests use Mocha framework with `@vscode/test-electron`
- Compiled test files are in `out/test/**/*.test.js`
- Run `npm run pretest` to compile and lint before testing

## Development Workflow

### Debugging the Extension
Use VS Code's built-in debugging:
1. Press F5 or use "Run Extension" launch configuration
2. This will compile the extension (via `preLaunchTask`) and open a new Extension Development Host window
3. The compiled output is in the `out/` directory

### Building
- Source TypeScript files in `src/` compile to `out/`
- TypeScript compiler options in `tsconfig.json`:
  - Target: ES2022
  - Module: Node16
  - Strict mode enabled

## Extension Architecture

### Entry Point
- Main file: `src/extension.ts`
- Exports two key functions:
  - `activate()`: Called when extension is activated, registers commands and event handlers
  - `deactivate()`: Called when extension is deactivated for cleanup

### Command Registration
Commands are registered in two places:
1. **Declared** in `package.json` under `contributes.commands`
2. **Implemented** in `src/extension.ts` via `vscode.commands.registerCommand()`

The command ID in both places must match (e.g., `my-timestamp.helloWorld`).

### Adding New Commands
1. Add command declaration to `package.json` under `contributes.commands`
2. Implement command handler in `activate()` function
3. Register the disposable with `context.subscriptions.push()`

## Code Style

ESLint configuration (`eslint.config.mjs`) enforces:
- Naming convention: camelCase or PascalCase for imports
- Always use curly braces
- Use strict equality (`===`, `!==`)
- No throw literals
- Semicolons required

## VS Code Configuration

The `.vscode/` directory contains:
- `launch.json`: Debug configuration for running the extension
- `tasks.json`: Build task configuration (default: watch mode)
- `settings.json`: Workspace-specific settings
- `extensions.json`: Recommended extensions for development
