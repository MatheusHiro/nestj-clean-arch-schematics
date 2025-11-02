import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { <%= classify(name) %>Repository, <%= underscore(name).toUpperCase() %>_REPOSITORY_TOKEN } from '../../domain/interfaces/<%= dasherize(name) %>.repository.interface';
import { <%= classify(name) %> } from '../../domain/entities/<%= dasherize(name) %>.entity';

/**
 * Use Case: Get <%= classify(name) %> by ID
 * Responsibility: Retrieve a specific <%= camelize(name) %> and handle not found cases
 */
@Injectable()
export class Get<%= classify(name) %>ByIdUseCase {
  constructor(
    @Inject(<%= underscore(name).toUpperCase() %>_REPOSITORY_TOKEN)
    private readonly repository: <%= classify(name) %>Repository,
  ) {}

  async execute(id: string): Promise<<%= classify(name) %>> {
    const <%= camelize(name) %> = await this.repository.findById(id);
    
    if (!<%= camelize(name) %>) {
      throw new NotFoundException(`<%= classify(name) %> with ID ${id} not found`);
    }

    return <%= camelize(name) %>;
  }
}

