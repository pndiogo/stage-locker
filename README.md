# My Monorepo

This is a monorepo setup using pnpm, containing multiple packages.

## Packages

The monorepo includes the following packages:

- **package-a**: 
  - Located in `packages/package-a`
  - Entry point: `src/index.ts`
  - Contains its own dependencies and scripts.

- **package-b**: 
  - Located in `packages/package-b`
  - Entry point: `src/index.ts`
  - Contains its own dependencies and scripts.

## Getting Started

To get started with this monorepo, follow these steps:

1. **Install pnpm**: If you haven't already, install pnpm globally.
   ```bash
   npm install -g pnpm
   ```

2. **Install dependencies**: Run the following command in the root of the monorepo to install all dependencies for all packages.
   ```bash
   pnpm install
   ```

3. **Run a package**: Navigate to the desired package directory and run its scripts. For example, to run package-a:
   ```bash
   cd packages/package-a
   pnpm run <script-name>
   ```

## Structure

The structure of the monorepo is as follows:

```
my-monorepo
├── packages
│   ├── package-a
│   └── package-b
├── pnpm-workspace.yaml
├── package.json
└── tsconfig.json
```

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any improvements or suggestions.