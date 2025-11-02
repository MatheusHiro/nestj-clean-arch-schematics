import { Injectable } from '@nestjs/common';
import { <%= classify(name) %>Repository } from '../../domain/interfaces/<%= dasherize(name) %>.repository.interface';
import { <%= classify(name) %> } from '../../domain/entities/<%= dasherize(name) %>.entity';

@Injectable()
export class <%= classify(name) %>RepositoryImpl implements <%= classify(name) %>Repository {
  // TODO: Inject your database adapter (TypeORM, Prisma, Mongoose, etc.)
  // Example: constructor(@InjectRepository(UserModel) private repo: Repository<UserModel>) {}

  private <%= camelize(name) %>s: <%= classify(name) %>[] = []; // In-memory storage for demo

  async findAll(): Promise<<%= classify(name) %>[]> {
    return this.<%= camelize(name) %>s;
  }

  async findById(id: string): Promise<<%= classify(name) %> | null> {
    const <%= camelize(name) %> = this.<%= camelize(name) %>s.find(u => u.id === id);
    return <%= camelize(name) %> || null;
  }

  async create(data: Partial<<%= classify(name) %>>): Promise<<%= classify(name) %>> {
    const <%= camelize(name) %> = new <%= classify(name) %>({
      ...data,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    this.<%= camelize(name) %>s.push(<%= camelize(name) %>);
    return <%= camelize(name) %>;
  }

  async update(id: string, data: Partial<<%= classify(name) %>>): Promise<<%= classify(name) %>> {
    const index = this.<%= camelize(name) %>s.findIndex(u => u.id === id);
    if (index === -1) {
      throw new Error('<%= classify(name) %> not found');
    }
    const updated = {
      ...this.<%= camelize(name) %>s[index],
      ...data,
      updatedAt: new Date(),
    };
    this.<%= camelize(name) %>s[index] = updated;
    return updated;
  }

  async delete(id: string): Promise<void> {
    const index = this.<%= camelize(name) %>s.findIndex(u => u.id === id);
    if (index === -1) {
      throw new Error('<%= classify(name) %> not found');
    }
    this.<%= camelize(name) %>s.splice(index, 1);
  }
}

