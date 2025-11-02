# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-11-02

### Added
- Initial release of NestJS Clean Architecture Schematics
- Clean module generator with full layer support
- Support for presentation, domain, application, and infrastructure layers
- CLI tool `nestjs-clean` for easy module generation
- Skip options for all layers (controller, service, repository, entity, gateway, DTOs)
- Minimal mode for folder-only generation
- Comprehensive documentation and examples
- TypeScript support with full type safety
- Template files for all layers:
  - Controller with CRUD endpoints
  - Service with business logic
  - Repository with interface and implementation
  - Entity with domain model
  - DTOs for create and update operations
  - Gateway for external integrations
  - Module configuration
- Help command with detailed usage information
- Support for custom paths
- Flat mode for generating without module folder
- Short aliases for common options (--sc, --ss, etc.)

### Features
- 🏛️ Clean Architecture pattern implementation
- 🚀 Quick module scaffolding
- 🎯 Flexible layer selection
- 📦 CRUD operations out of the box
- 🔧 Customizable templates
- 💉 Proper dependency injection setup
- 🧪 Testable architecture
- 📝 Well-documented generated code
- 🎨 TypeScript-first approach

### Documentation
- Comprehensive README.md
- Detailed EXAMPLES.md with real-world scenarios
- CONTRIBUTING.md for contributors
- MIT License

[1.0.0]: https://github.com/MatheusHiro/nestjs-clean-arch-schematics/releases/tag/v1.0.0

