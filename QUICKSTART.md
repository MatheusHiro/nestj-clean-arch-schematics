# Quick Start Guide

Get started with NestJS Clean Architecture Schematics in 5 minutes!

## Step 1: Installation

Choose your preferred installation method:

### Option A: Global Installation (Recommended)

```bash
npm install -g @nestjs-clean-arch/schematics
```

### Option B: Local Installation

```bash
npm install --save-dev @nestjs-clean-arch/schematics
```

### Option C: Use with npx (No Installation)

```bash
npx @nestjs-clean-arch/schematics <module-name>
```

## Step 2: Generate Your First Module

```bash
nestjs-clean user
```

This creates:

```
src/modules/user/
├── presentation/
│   ├── controllers/user.controller.ts
│   └── dtos/
├── domain/
│   ├── entities/user.entity.ts
│   └── interfaces/user.repository.interface.ts
├── application/
│   └── services/user.service.ts
├── infrastructure/
│   ├── repositories/user.repository.ts
│   └── gateways/user.gateway.ts
└── user.module.ts
```

## Step 3: Import the Module

Add to your `app.module.ts`:

```typescript
import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [UserModule],
})
export class AppModule {}
```

## Step 4: Customize the Entity

Edit `src/modules/user/domain/entities/user.entity.ts`:

```typescript
export class User {
  id: string;
  email: string; // Add this
  username: string; // Add this
  password: string; // Add this
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
```

## Step 5: Update the DTO

Edit `src/modules/user/presentation/dtos/create-user.dto.ts`:

```typescript
import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  username: string;

  @IsString()
  @MinLength(8)
  password: string;
}
```

## Step 6: Run Your Application

```bash
npm run start:dev
```

## Step 7: Test Your API

The generated module includes these endpoints:

- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `POST /users` - Create a new user
- `PUT /users/:id` - Update a user
- `DELETE /users/:id` - Delete a user

Test with curl:

```bash
# Create a user
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","username":"testuser","password":"password123"}'

# Get all users
curl http://localhost:3000/users

# Get user by ID
curl http://localhost:3000/users/1
```

## Common Options

### Generate without Gateway

```bash
nestjs-clean product --skip-gateway
```

### Generate with Custom Path

```bash
nestjs-clean payment --path=src/features
```

### Generate Minimal Structure

```bash
nestjs-clean order --minimal
```

### Skip Multiple Layers

```bash
nestjs-clean notification --skip-controller --skip-dtos
```

## Next Steps

1. **Add Database Integration**
   - Install TypeORM, Prisma, or your preferred ORM
   - Update repository implementation
   - Connect to your database

2. **Add Validation**
   - Install `class-validator` and `class-transformer`
   - Enable global validation pipe
   - Add more validation rules to DTOs

3. **Add Authentication**
   - Generate auth module
   - Implement JWT strategy
   - Add guards to protect routes

4. **Add Tests**
   - Write unit tests for services
   - Write integration tests for controllers
   - Mock repositories for testing

5. **Add Documentation**
   - Install Swagger
   - Add API documentation decorators
   - Generate API docs

## Helpful Commands

```bash
# Show help
nestjs-clean --help

# Generate with all options
nestjs-clean user \
  --path=src/modules \
  --skip-gateway \
  --skip-dtos

# Use aliases for shorter commands
nestjs-clean product --sg --sc
```

## Package.json Shortcuts

Add these to your `package.json`:

```json
{
  "scripts": {
    "g:module": "nestjs-clean",
    "g:api": "nestjs-clean --skip-gateway",
    "g:service": "nestjs-clean --skip-controller --skip-dtos"
  }
}
```

Then use:

```bash
npm run g:module user
npm run g:api product
npm run g:service email
```

## Resources

- 📖 [Full Documentation](./README.md)
- 📚 [Examples](./EXAMPLES.md)
- 🤝 [Contributing Guide](./CONTRIBUTING.md)
- 🐛 [Report Issues](https://github.com/MatheusHiro/nestjs-clean-arch-schematics/issues)

## Need Help?

- Check the [Examples](./EXAMPLES.md) for detailed use cases
- Read the [README](./README.md) for full documentation
- Open an [Issue](https://github.com/MatheusHiro/nestjs-clean-arch-schematics/issues) on GitHub
- Join the discussion in [GitHub Discussions](https://github.com/MatheusHiro/nestjs-clean-arch-schematics/discussions)

---

**Happy Coding!** 🚀
