import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { <%= classify(name) %>Repository, <%= underscore(name).toUpperCase() %>_REPOSITORY_TOKEN } from '../../domain/interfaces/<%= dasherize(name) %>.repository.interface';
import { <%= classify(name) %> } from '../../domain/entities/<%= dasherize(name) %>.entity';
import { Update<%= classify(name) %>Dto } from '../../presentation/dtos/update-<%= dasherize(name) %>.dto';
import { <%= classify(name) %>Mapper } from '../mappers/<%= dasherize(name) %>.mapper';

/**
 * Use Case: Update an existing <%= classify(name) %>
 * Responsibility: Handle <%= camelize(name) %> updates with validation
 */
@Injectable()
export class Update<%= classify(name) %>UseCase {
  constructor(
    @Inject(<%= underscore(name).toUpperCase() %>_REPOSITORY_TOKEN)
    private readonly repository: <%= classify(name) %>Repository,
  ) {}

  async execute(id: string, dto: Update<%= classify(name) %>Dto): Promise<<%= classify(name) %>> {
    // Check if <%= camelize(name) %> exists
    const existing<%= classify(name) %> = await this.repository.findById(id);
    if (!existing<%= classify(name) %>) {
      throw new NotFoundException(`<%= classify(name) %> with ID ${id} not found`);
    }

    // Map DTO to domain entity
    const updateData = <%= classify(name) %>Mapper.updateDtoToDomain(dto);

    // TODO: Add business logic validation here
    // Example: await this.validateBusinessRules(updateData);

    // Update through repository
    const updated<%= classify(name) %> = await this.repository.update(id, updateData);
    
    if (!updated<%= classify(name) %>) {
      throw new NotFoundException(`<%= classify(name) %> with ID ${id} not found after update`);
    }

    return updated<%= classify(name) %>;
  }
}

