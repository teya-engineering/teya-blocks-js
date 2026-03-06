# Contributing to @teyaproduct/teya-blocks-js

Thank you for your interest in contributing! This guide will help you get started.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- npm

## Getting Started

1. Fork and clone the repository:

   ```bash
   git clone https://github.com/saltpay/teya-blocks-js.git
   cd teya-blocks-js
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Build the project:

   ```bash
   npm run build
   ```

## Development

### Available Scripts

| Command                    | Description                          |
| -------------------------- | ------------------------------------ |
| `npm run build`            | Build the project using tsup         |
| `npm run dev`              | Build in watch mode                  |
| `npm run lint`             | Run ESLint on source files           |
| `npm run lint:fix`         | Run ESLint with auto-fix             |
| `npm run type-check`       | Run TypeScript type checking         |
| `npm run clean`            | Remove the `dist/` directory         |

### Project Structure

```
src/
├── index.ts              # Public API exports
├── initTeyaBlocks.ts     # SDK initialization logic
└── types/                # TypeScript type definitions
    ├── index.ts
    ├── elements.ts
    ├── events.ts
    ├── responses.ts
    └── teya-blocks.ts
```

## Making Changes

1. Create a new branch from `main`:

   ```bash
   git checkout -b your-branch-name
   ```

2. Make your changes.

3. Ensure your code passes linting and type checks:

   ```bash
   npm run lint
   npm run type-check
   ```

4. Add a changeset describing your change:

   ```bash
   npx changeset
   ```

   Follow the prompts to select the change type (patch, minor, major) and provide a summary.

5. Commit your changes and push to your fork.

6. Open a pull request against `main`.

## Changesets

This project uses [Changesets](https://github.com/changesets/changesets) for versioning and changelogs. Every PR that affects the published package should include a changeset.

- **patch** — Bug fixes and minor updates
- **minor** — New features (backwards compatible)
- **major** — Breaking changes

## Code Style

- TypeScript with strict mode enabled
- ESLint for linting
- Keep the public API minimal and well-typed

## Pull Request Guidelines

- Keep PRs focused on a single change
- Include a changeset if the change affects the published package
- Ensure `npm run lint` and `npm run type-check` pass
- Provide a clear description of what the PR does and why

## License

By contributing, you agree that your contributions will be licensed under the [Apache License 2.0](LICENSE).
