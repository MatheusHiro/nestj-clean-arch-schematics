import { Injectable, Inject } from '@nestjs/common';
import { <%= classify(name) %>Repository, <%= underscore(name).toUpperCase() %>_REPOSITORY_TOKEN } from '../../domain/interfaces/<%= dasherize(name) %>.repository.interface';
import { <%= classify(name) %> } from '../../domain/entities/<%= dasherize(name) %>.entity';

/**
 * Use Case: Get all <%= classify(name) %>s
 * Responsibility: Retrieve all <%= camelize(name) %>s from the repository
 */
@Injectable()
export class GetAll<%= classify(name) %>sUseCase {
  constructor(
    @Inject(<%= underscore(name).toUpperCase() %>_REPOSITORY_TOKEN)
    private readonly repository: <%= classify(name) %>Repository,
  ) {}

  async execute(): Promise<<%= classify(name) %>[]> {
    return this.repository.findAll();
  }
}

