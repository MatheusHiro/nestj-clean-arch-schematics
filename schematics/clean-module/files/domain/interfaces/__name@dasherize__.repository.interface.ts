import { <%= classify(name) %> } from '../entities/<%= dasherize(name) %>.entity';

export const <%= underscore(name).toUpperCase() %>_REPOSITORY_TOKEN = Symbol('<%= classify(name) %>Repository');

export interface <%= classify(name) %>Repository {
  findAll(): Promise<<%= classify(name) %>[]>;
  findById(id: string): Promise<<%= classify(name) %> | null>;
  create(data: Partial<<%= classify(name) %>>): Promise<<%= classify(name) %>>;
  update(id: string, data: Partial<<%= classify(name) %>>): Promise<<%= classify(name) %>>;
  delete(id: string): Promise<void>;
}

