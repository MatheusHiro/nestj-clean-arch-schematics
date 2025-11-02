import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { <%= classify(name) %>Repository, <%= underscore(name).toUpperCase() %>_REPOSITORY_TOKEN } from '../../domain/interfaces/<%= dasherize(name) %>.repository.interface';

/**
 * Use Case: Delete a <%= classify(name) %>
 * Responsibility: Handle <%= camelize(name) %> deletion with validation
 */
@Injectable()
export class Delete<%= classify(name) %>UseCase {
  constructor(
    @Inject(<%= underscore(name).toUpperCase() %>_REPOSITORY_TOKEN)
    private readonly repository: <%= classify(name) %>Repository,
  ) {}

  async execute(id: string): Promise<void> {
    // Check if <%= camelize(name) %> exists
    const <%= camelize(name) %> = await this.repository.findById(id);
    if (!<%= camelize(name) %>) {
      throw new NotFoundException(`<%= classify(name) %> with ID ${id} not found`);
    }

    // TODO: Add business logic before deletion
    // Example: Check if <%= camelize(name) %> can be deleted (no dependencies, etc.)

    await this.repository.delete(id);
  }
}

