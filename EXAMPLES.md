# Usage Examples

This document provides detailed examples of using the NestJS Clean Architecture Schematics in various scenarios.

## Table of Contents

- [Basic Examples](#basic-examples)
- [Advanced Examples](#advanced-examples)
- [Real-World Scenarios](#real-world-scenarios)
- [Integration Examples](#integration-examples)

## Basic Examples

### 1. Simple User Module

Generate a complete user management module:

```bash
nestjs-clean user
```

**Result:**
```
src/modules/user/
├── presentation/
│   ├── controllers/user.controller.ts
│   └── dtos/
│       ├── create-user.dto.ts
│       └── update-user.dto.ts
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

**Next Steps:**
1. Import `UserModule` in `app.module.ts`
2. Add user-specific fields to the entity
3. Update DTOs with validation rules
4. Implement database integration in repository

### 2. Product Module Without External Gateway

For modules that don't need external service integration:

```bash
nestjs-clean product --skip-gateway
# or
nestjs-clean product --sg
```

**Use Case:** Simple CRUD operations without external API calls or message queues.

### 3. Minimal Module Structure

Create only the folder structure:

```bash
nestjs-clean order --minimal
```

**Result:** Creates folder structure without any files, useful for custom implementations.

## Advanced Examples

### 4. Microservice Module

Create a module designed for microservice architecture:

```bash
nestjs-clean notification --skip-controller --skip-dtos
```

**Use Case:** Background services, event handlers, or non-HTTP microservices.

### 5. API-Only Module

For modules that only expose REST endpoints:

```bash
nestjs-clean analytics --skip-repository --skip-gateway
```

**Use Case:** Proxy services, BFF patterns, or when using external ORMs.

### 6. Domain-Rich Module

Focus on business logic with minimal infrastructure:

```bash
nestjs-clean payment --skip-gateway
```

**Use Case:** Complex business logic modules with rich domain models.

## Real-World Scenarios

### 7. E-Commerce Product Catalog

```bash
# Create product module with all layers
nestjs-clean product

# Create category module
nestjs-clean category --skip-gateway

# Create inventory module
nestjs-clean inventory
```

**After generation, customize:**

**Product Entity:**
```typescript
export class Product {
  id: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  stock: number;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}
```

**Product DTO:**
```typescript
export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsUUID()
  categoryId: string;

  @IsNumber()
  @Min(0)
  stock: number;

  @IsArray()
  @IsUrl({}, { each: true })
  images: string[];
}
```

### 8. Authentication System

```bash
# Auth module with all features
nestjs-clean auth

# User profile module
nestjs-clean profile --skip-gateway
```

**Customize Auth Service:**
```typescript
@Injectable()
export class AuthService {
  constructor(
    @Inject(AUTH_REPOSITORY_TOKEN)
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
    private readonly authGateway: AuthGateway,
  ) {}

  async login(credentials: LoginDto): Promise<TokenResponse> {
    // Implementation
  }

  async register(data: RegisterDto): Promise<User> {
    // Implementation
  }

  async verifyEmail(token: string): Promise<void> {
    // Use gateway for email service
    await this.authGateway.sendVerificationEmail(token);
  }
}
```

### 9. Blog Platform

```bash
# Article module
nestjs-clean article

# Comment module
nestjs-clean comment

# Tag module without repository (using article's)
nestjs-clean tag --skip-repository --skip-gateway
```

### 10. Multi-Tenant Application

```bash
# Generate modules with custom path per tenant feature
nestjs-clean tenant --path=src/features/tenancy
nestjs-clean workspace --path=src/features/tenancy
```

## Integration Examples

### 11. With TypeORM

After generating a module, integrate TypeORM:

```bash
nestjs-clean user
```

**Update Repository:**
```typescript
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repo: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.repo.find();
  }

  async findById(id: string): Promise<User | null> {
    return this.repo.findOne({ where: { id } });
  }
  
  // ... other methods
}
```

**Update Module:**
```typescript
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './infrastructure/repositories/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: USER_REPOSITORY_TOKEN,
      useClass: UserRepositoryImpl,
    },
  ],
  exports: [UserService],
})
export class UserModule {}
```

### 12. With Prisma

```bash
nestjs-clean post
```

**Update Repository:**
```typescript
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PostRepositoryImpl implements PostRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Post[]> {
    return this.prisma.post.findMany();
  }

  async findById(id: string): Promise<Post | null> {
    return this.prisma.post.findUnique({ where: { id } });
  }
  
  // ... other methods
}
```

### 13. With GraphQL

```bash
nestjs-clean author
```

**Update Controller to Resolver:**
```typescript
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

@Resolver(() => Author)
export class AuthorResolver {
  constructor(private readonly authorService: AuthorService) {}

  @Query(() => [Author])
  async authors() {
    return this.authorService.findAll();
  }

  @Query(() => Author)
  async author(@Args('id') id: string) {
    return this.authorService.findById(id);
  }

  @Mutation(() => Author)
  async createAuthor(@Args('input') input: CreateAuthorInput) {
    return this.authorService.create(input);
  }
}
```

### 14. With External API Integration

```bash
nestjs-clean weather
```

**Implement Gateway:**
```typescript
import { Injectable, HttpService } from '@nestjs/common';

@Injectable()
export class WeatherGateway {
  constructor(private readonly httpService: HttpService) {}

  async getCurrentWeather(city: string): Promise<WeatherData> {
    const response = await this.httpService
      .get(`https://api.weather.com/v1/current?city=${city}`)
      .toPromise();
    
    return response.data;
  }

  async getForecast(city: string, days: number): Promise<ForecastData[]> {
    const response = await this.httpService
      .get(`https://api.weather.com/v1/forecast?city=${city}&days=${days}`)
      .toPromise();
    
    return response.data;
  }
}
```

### 15. With Message Queue (Bull)

```bash
nestjs-clean email
```

**Implement Gateway with Queue:**
```typescript
import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class EmailGateway {
  constructor(
    @InjectQueue('email')
    private readonly emailQueue: Queue,
  ) {}

  async sendEmail(to: string, subject: string, body: string): Promise<void> {
    await this.emailQueue.add('send', {
      to,
      subject,
      body,
      timestamp: new Date(),
    });
  }

  async sendBulkEmail(recipients: string[], subject: string, body: string): Promise<void> {
    const jobs = recipients.map(to => ({
      name: 'send',
      data: { to, subject, body },
    }));
    
    await this.emailQueue.addBulk(jobs);
  }
}
```

## Package.json Script Examples

Add these scripts to your `package.json` for easier usage:

```json
{
  "scripts": {
    "generate:module": "nestjs-clean",
    "g:module": "nestjs-clean",
    "g:api-module": "nestjs-clean --skip-gateway",
    "g:service-module": "nestjs-clean --skip-controller --skip-dtos",
    "g:minimal": "nestjs-clean --minimal"
  }
}
```

**Usage:**
```bash
npm run g:module user
npm run g:api-module product
npm run g:service-module notification
npm run g:minimal order
```

## Tips and Best Practices

### Naming Conventions

- Use singular names: `user`, `product`, `order`
- Use kebab-case for multi-word names: `order-item`, `user-profile`
- Module names will be automatically converted to appropriate cases

### When to Skip Layers

- **Skip Controller**: Background jobs, event handlers, scheduled tasks
- **Skip Service**: Simple proxy or pass-through modules
- **Skip Repository**: Using external ORMs or services
- **Skip Entity**: DTOs as domain models (not recommended)
- **Skip Gateway**: No external integrations needed
- **Skip DTOs**: Using entities directly (not recommended)

### After Generation Checklist

- [ ] Import module in `app.module.ts`
- [ ] Add domain-specific fields to entity
- [ ] Update DTOs with proper validation
- [ ] Implement database integration
- [ ] Add business logic to service
- [ ] Configure external services in gateway
- [ ] Write unit tests for each layer
- [ ] Write integration tests
- [ ] Add API documentation (Swagger)
- [ ] Update README with module-specific info

## Troubleshooting

### Issue: Module not found after generation

**Solution:** Make sure to import the module in your `app.module.ts`:

```typescript
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [UserModule],
})
export class AppModule {}
```

### Issue: Repository interface type errors

**Solution:** The repository interface uses a generic pattern. Make sure your implementation matches:

```typescript
export class UserRepositoryImpl implements UserRepository {
  // All methods must match the interface
}
```

### Issue: DTO validation not working

**Solution:** Install and configure class-validator and class-transformer:

```bash
npm install class-validator class-transformer
```

Enable global validation pipe in `main.ts`:

```typescript
app.useGlobalPipes(new ValidationPipe());
```

---

For more examples and detailed documentation, visit the [GitHub repository](https://github.com/MatheusHiro/nestjs-clean-arch-schematics).

