import { Injectable, Inject } from '@nestjs/common';
import { <%= classify(name) %>Repository, <%= underscore(name).toUpperCase() %>_REPOSITORY_TOKEN } from '../../domain/interfaces/<%= dasherize(name) %>.repository.interface';
import { <%= classify(name) %> } from '../../domain/entities/<%= dasherize(name) %>.entity';
import { Create<%= classify(name) %>Dto } from '../../presentation/dtos/create-<%= dasherize(name) %>.dto';
import { <%= classify(name) %>Mapper } from '../mappers/<%= dasherize(name) %>.mapper';

/**
 * Use Case: Create a new <%= classify(name) %>
 * Responsibility: Orchestrate the creation of a <%= camelize(name) %>, including validation and persistence
 */
@Injectable()
export class Create<%= classify(name) %>UseCase {
  constructor(
    @Inject(<%= underscore(name).toUpperCase() %>_REPOSITORY_TOKEN)
    private readonly repository: <%= classify(name) %>Repository,
  ) {}

  async execute(dto: Create<%= classify(name) %>Dto): Promise<<%= classify(name) %>> {
    // Map DTO to domain entity
    const <%= camelize(name) %>Data = <%= classify(name) %>Mapper.createDtoToDomain(dto);

    // TODO: Add business logic validation here
    // Example: await this.validateBusinessRules(<%= camelize(name) %>Data);

    // Persist through repository
    const created<%= classify(name) %> = await this.repository.create(<%= camelize(name) %>Data);

    return created<%= classify(name) %>;
  }
}

