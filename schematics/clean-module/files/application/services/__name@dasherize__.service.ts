import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { 
  <%= classify(name) %>Repository,
  <%= underscore(name).toUpperCase() %>_REPOSITORY_TOKEN 
} from '../../domain/interfaces/<%= dasherize(name) %>.repository.interface';
import { <%= classify(name) %> } from '../../domain/entities/<%= dasherize(name) %>.entity';
import { Create<%= classify(name) %>Dto } from '../../presentation/dtos/create-<%= dasherize(name) %>.dto';
import { Update<%= classify(name) %>Dto } from '../../presentation/dtos/update-<%= dasherize(name) %>.dto';

@Injectable()
export class <%= classify(name) %>Service {
  constructor(
    @Inject(<%= underscore(name).toUpperCase() %>_REPOSITORY_TOKEN)
    private readonly <%= camelize(name) %>Repository: <%= classify(name) %>Repository,
  ) {}

  async findAll(): Promise<<%= classify(name) %>[]> {
    return this.<%=camelize(name) %>Repository.findAll();
  }

  async findById(id: string): Promise<<%= classify(name) %>> {
    const <%= camelize(name) %> = await this.<%= camelize(name) %>Repository.findById(id);
    if (!<%= camelize(name) %>) {
      throw new NotFoundException(`<%= classify(name) %> with ID ${id} not found`);
    }
    return <%= camelize(name) %>;
  }

  async create(createDto: Create<%= classify(name) %>Dto): Promise<<%= classify(name) %>> {
    return this.<%= camelize(name) %>Repository.create(createDto);
  }

  async update(id: string, updateDto: Update<%= classify(name) %>Dto): Promise<<%= classify(name) %>> {
    await this.findById(id); // Ensure it exists
    return this.<%= camelize(name) %>Repository.update(id, updateDto);
  }

  async delete(id: string): Promise<void> {
    await this.findById(id); // Ensure it exists
    return this.<%= camelize(name) %>Repository.delete(id);
  }
}

