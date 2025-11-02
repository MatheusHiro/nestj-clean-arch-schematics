import { <%= classify(name) %> } from '../entities/<%= dasherize(name) %>.entity';

export const <%= underscore(name).toUpperCase() %>_REPOSITORY_TOKEN = Symbol('<%= classify(name) %>Repository');

/**
 * Repository Interface (Port)
 * Defines the contract for data access operations
 * Following Clean Architecture: Domain layer defines the interface, Infrastructure implements it
 */
export interface <%= classify(name) %>Repository {
  /**
   * Find all <%= camelize(name) %>s
   * @returns Array of <%= camelize(name) %>s (empty array if none found)
   */
  findAll(): Promise<<%= classify(name) %>[]>;

  /**
   * Find <%= camelize(name) %> by ID
   * @param id - The <%= camelize(name) %> identifier
   * @returns <%= classify(name) %> or null if not found
   */
  findById(id: string): Promise<<%= classify(name) %> | null>;

  /**
   * Create a new <%= camelize(name) %>
   * @param data - Partial <%= camelize(name) %> data
   * @returns Created <%= camelize(name) %>
   */
  create(data: Partial<<%= classify(name) %>>): Promise<<%= classify(name) %>>;

  /**
   * Update an existing <%= camelize(name) %>
   * @param id - The <%= camelize(name) %> identifier
   * @param data - Partial <%= camelize(name) %> data to update
   * @returns Updated <%= camelize(name) %> or null if not found
   */
  update(id: string, data: Partial<<%= classify(name) %>>): Promise<<%= classify(name) %> | null>;

  /**
   * Delete a <%= camelize(name) %>
   * @param id - The <%= camelize(name) %> identifier
   * @returns void (silent operation, no exception if not found)
   */
  delete(id: string): Promise<void>;
}
