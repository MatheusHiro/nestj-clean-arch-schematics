# Contributing to NestJS Clean Architecture Schematics

First off, thank you for considering contributing to this project! 🎉

## Code of Conduct

This project and everyone participating in it is governed by a Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When creating a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples**
- **Describe the behavior you observed and what you expected**
- **Include your environment details** (OS, Node version, npm/pnpm version)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- **Use a clear and descriptive title**
- **Provide a detailed description of the suggested enhancement**
- **Explain why this enhancement would be useful**
- **Include examples of how it would work**

### Pull Requests

1. Fork the repository
2. Create a new branch from `main`
3. Make your changes
4. Write or update tests as needed
5. Update documentation
6. Commit your changes with clear messages
7. Push to your fork
8. Submit a pull request

## Development Setup

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0 or pnpm >= 8.0.0
- Git

### Setting Up Your Development Environment

1. **Fork and Clone**
   ```bash
   git clone https://github.com/YOUR_USERNAME/nestjs-clean-arch-schematics.git
   cd nestjs-clean-arch-schematics
   ```

2. **Install Dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Build the Project**
   ```bash
   npm run build
   ```

4. **Link Locally for Testing**
   ```bash
   npm link
   ```

5. **Test Your Changes**
   ```bash
   # In a test project directory
   nestjs-clean test-module
   ```

## Project Structure

```
nestjs-clean-arch-schematics/
├── bin/                        # CLI executable
│   └── nestjs-clean.js
├── schematics/                 # Schematic source files
│   ├── collection.json         # Schematic collection definition
│   ├── index.ts               # Exports
│   └── clean-module/          # Clean module schematic
│       ├── index.ts           # Schematic logic
│       ├── schema.json        # Options schema
│       └── files/             # Template files
├── dist/                      # Compiled output (generated)
├── package.json
├── tsconfig.json
└── README.md
```

## Coding Guidelines

### TypeScript Style

- Use TypeScript strict mode
- Follow existing code style
- Use meaningful variable names
- Add comments for complex logic
- Prefer const over let
- Use async/await over promises

### Template Files

- Use EJS-style templates: `<%= variable %>`
- Follow NestJS conventions
- Include helpful TODO comments
- Add proper TypeScript typing

### Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
type(scope): subject

body

footer
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(schematic): add support for GraphQL resolvers

fix(template): correct repository interface import

docs(readme): update installation instructions

refactor(cli): improve error handling
```

## Testing

### Manual Testing

1. Build the project:
   ```bash
   npm run build
   ```

2. Link locally:
   ```bash
   npm link
   ```

3. Create a test NestJS project:
   ```bash
   nest new test-project
   cd test-project
   ```

4. Test the schematic:
   ```bash
   nestjs-clean user
   nestjs-clean product --skip-gateway
   nestjs-clean order --minimal
   ```

5. Verify generated files:
   - Check file structure
   - Verify imports
   - Test compilation
   - Run the application

### Testing Checklist

- [ ] All templates generate correctly
- [ ] Skip options work as expected
- [ ] File naming is correct
- [ ] Imports are valid
- [ ] TypeScript compiles without errors
- [ ] Help text is accurate
- [ ] CLI arguments are parsed correctly

## Adding New Features

### Adding a New Template File

1. Create the template in `schematics/clean-module/files/`
2. Use proper EJS syntax for variables
3. Update the schematic logic if needed
4. Test with all skip combinations

### Adding a New Option

1. Update `schema.json` with the new option
2. Add TypeScript interface in `index.ts`
3. Implement the logic in the schematic function
4. Update help text
5. Update README documentation
6. Add examples

### Modifying Existing Templates

1. Make changes to template files
2. Test with generated modules
3. Ensure backward compatibility
4. Update documentation if behavior changes

## Documentation

- Update README.md for user-facing changes
- Update EXAMPLES.md for new use cases
- Add JSDoc comments to functions
- Keep CONTRIBUTING.md current

## Release Process

(For maintainers)

1. Update version in `package.json`
2. Update CHANGELOG.md
3. Commit changes
4. Create a git tag
5. Push to GitHub
6. Publish to npm

```bash
npm version [major|minor|patch]
npm run build
npm publish
git push origin main --tags
```

## Questions?

Feel free to open an issue for:
- Questions about contributing
- Clarifications on the codebase
- Discussion about potential features

## Recognition

Contributors will be recognized in:
- README.md contributors section
- GitHub contributors page
- Release notes

Thank you for contributing! 🚀

