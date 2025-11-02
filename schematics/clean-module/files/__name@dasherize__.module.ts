import { Module } from '@nestjs/common';
<% if (!skipController) { %>import { <%= classify(name) %>Controller } from './presentation/controllers/<%= dasherize(name) %>.controller';<% } %>
<% if (!skipService) { %>import { <%= classify(name) %>Service } from './application/services/<%= dasherize(name) %>.service';<% } %>
<% if (!skipRepository) { %>import { <%= classify(name) %>RepositoryImpl } from './infrastructure/repositories/<%= dasherize(name) %>.repository';<% } %>
<% if (!skipGateway) { %>import { <%= classify(name) %>Gateway } from './infrastructure/gateways/<%= dasherize(name) %>.gateway';<% } %>
<% if (!skipRepository) { %>import { <%= underscore(name).toUpperCase() %>_REPOSITORY_TOKEN } from './domain/interfaces/<%= dasherize(name) %>.repository.interface';<% } %>

// Use Cases
<% if (!skipService) { %>import { Create<%= classify(name) %>UseCase } from './application/use-cases/create-<%= dasherize(name) %>.use-case';
import { GetAll<%= classify(name) %>sUseCase } from './application/use-cases/get-all-<%= dasherize(name) %>s.use-case';
import { Get<%= classify(name) %>ByIdUseCase } from './application/use-cases/get-<%= dasherize(name) %>-by-id.use-case';
import { Update<%= classify(name) %>UseCase } from './application/use-cases/update-<%= dasherize(name) %>.use-case';
import { Delete<%= classify(name) %>UseCase } from './application/use-cases/delete-<%= dasherize(name) %>.use-case';<% } %>

/**
 * <%= classify(name) %> Module
 * 
 * Clean Architecture Structure:
 * - Presentation Layer: Controllers, DTOs
 * - Application Layer: Services, Use Cases, Mappers
 * - Domain Layer: Entities, Repository Interfaces
 * - Infrastructure Layer: Repository Implementations, Gateways, ORM Entities
 */
@Module({
  imports: [
    // TODO: Add database module (TypeOrmModule, PrismaModule, etc.)
    // Example: TypeOrmModule.forFeature([<%= classify(name) %>OrmEntity])
  ],
  controllers: [<% if (!skipController) { %><%= classify(name) %>Controller<% } %>],
  providers: [
    // Application Service (orchestrates use cases)
    <% if (!skipService) { %><%= classify(name) %>Service,<% } %>
    
    // Use Cases (business logic)
    <% if (!skipService) { %>Create<%= classify(name) %>UseCase,
    GetAll<%= classify(name) %>sUseCase,
    Get<%= classify(name) %>ByIdUseCase,
    Update<%= classify(name) %>UseCase,
    Delete<%= classify(name) %>UseCase,<% } %>
    
    // Repository (data access)
    <% if (!skipRepository) { %>{
      provide: <%= underscore(name).toUpperCase() %>_REPOSITORY_TOKEN,
      useClass: <%= classify(name) %>RepositoryImpl,
    },<% } %>
    
    // Gateway (external services)
    <% if (!skipGateway) { %><%= classify(name) %>Gateway,<% } %>
  ],
  exports: [
    <% if (!skipService) { %><%= classify(name) %>Service,<% } %>
    <% if (!skipRepository) { %><%= underscore(name).toUpperCase() %>_REPOSITORY_TOKEN,<% } %>
  ],
})
export class <%= classify(name) %>Module {}
