#!/usr/bin/env node

const { execSync } = require("child_process");
const path = require("path");

// Get the directory where the package is installed
const packageDir = path.resolve(__dirname, "..");
const collectionPath = path.join(packageDir, "dist", "collection.json");

// Get command line arguments (skip node and script path)
const args = process.argv.slice(2);

// Show help if no arguments or --help flag
if (args.length === 0 || args.includes("--help") || args.includes("-h")) {
  console.log(`
╭─────────────────────────────────────────────────────────────────────╮
│                                                                     │
│  🏗️  Clean Architecture Module Generator for NestJS                │
│                                                                     │
╰─────────────────────────────────────────────────────────────────────╯

USAGE:
  nestjs-clean <command|name> [options]
  npx nestjs-clean-arch-schematics <command|name> [options]

COMMANDS:
  core            Generate core module with base classes for Clean Architecture
  <name>          Generate a Clean Architecture module (default command)

ARGUMENTS:
  <name>          The name of the module (required for module generation)

OPTIONS:
  --path=<path>                Path where the module will be generated
                               (default: src/modules)
  
  --flat                       Generate files in the path directory 
                               without creating a module folder

LAYER SKIP OPTIONS:
  --skip-controller, --sc      Skip generating the controller
  --skip-service, --ss         Skip generating the service
  --skip-repository, --sr      Skip generating the repository
  --skip-entity, --se          Skip generating the entity
  --skip-gateway, --sg         Skip generating the gateway
  --skip-dtos, --sd            Skip generating DTOs

OTHER OPTIONS:
  --minimal, -m                Generate minimal structure (only folders)
  --crud=false                 Disable CRUD operations (default: true)
  --help, -h                   Show this help message

EXAMPLES:
  # Generate core module with base classes
  nestjs-clean core

  # Generate a complete user module
  nestjs-clean user

  # Generate without gateway
  nestjs-clean product --skip-gateway
  nestjs-clean product --sg

  # Generate minimal structure
  nestjs-clean order --minimal

  # Skip multiple layers
  nestjs-clean auth --sc --sg --sd

  # Custom path
  nestjs-clean payment --path=src/features
  nestjs-clean core --path=src/shared/core

GENERATED STRUCTURE:
  src/modules/<name>/
    ├── presentation/
    │   ├── controllers/      REST/GraphQL endpoints
    │   └── dtos/            Request/Response validation
    ├── domain/
    │   ├── entities/        Business entities
    │   └── interfaces/      Repository contracts
    ├── application/
    │   └── services/        Business logic orchestration
    ├── infrastructure/
    │   ├── repositories/    Data access implementations
    │   └── gateways/        External service integrations
    └── <name>.module.ts     NestJS module configuration

For more information, visit: https://github.com/MatheusHiro/nestjs-clean-arch-schematics
`);
  process.exit(0);
}

// Determine which schematic to run
const firstArg = args[0];
const schematic = firstArg === "core" ? "core" : "clean-module";
const schematicArgs = firstArg === "core" ? args.slice(1) : args;

// Find the schematics CLI binary
// Try multiple methods to locate it (for npx, global, and local installations)
let schematicsBin;

try {
  // Method 1: Try to resolve from this package's dependencies
  const schematicsCliPath = require.resolve("@angular-devkit/schematics-cli", {
    paths: [packageDir],
  });
  const cliDir = path.dirname(schematicsCliPath);
  schematicsBin = path.join(cliDir, "bin", "schematics.js");
} catch (e) {
  // Method 2: Try the node_modules/.bin path
  const localBin = path.join(packageDir, "node_modules", ".bin", "schematics");
  if (require("fs").existsSync(localBin)) {
    schematicsBin = localBin;
  } else {
    // Method 3: Use npx as fallback
    schematicsBin = "npx";
  }
}

// Build the command
let schematicsCmd;
if (schematicsBin === "npx") {
  // Use npx to resolve schematics
  schematicsCmd = `npx -y @angular-devkit/schematics-cli ${collectionPath}:${schematic} --dry-run=false ${schematicArgs.join(" ")}`;
} else {
  schematicsCmd = `"${schematicsBin}" ${collectionPath}:${schematic} --dry-run=false ${schematicArgs.join(" ")}`;
}

try {
  // Execute the schematic
  execSync(schematicsCmd, { stdio: "inherit", cwd: process.cwd() });
} catch (error) {
  console.error("Error executing schematic:", error.message);
  process.exit(1);
}
