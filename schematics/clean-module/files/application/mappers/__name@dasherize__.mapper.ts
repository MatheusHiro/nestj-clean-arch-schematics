import { <%= classify(name) %> } from '../../domain/entities/<%= dasherize(name) %>.entity';
import { <%= classify(name) %>OrmEntity } from '../../infrastructure/persistence/<%= dasherize(name) %>.orm-entity';
import { Create<%= classify(name) %>Dto } from '../../presentation/dtos/create-<%= dasherize(name) %>.dto';
import { Update<%= classify(name) %>Dto } from '../../presentation/dtos/update-<%= dasherize(name) %>.dto';

/**
 * Mapper class responsible for converting between different entity representations
 * Following Clean Architecture principles: each layer has its own representation
 */
export class <%= classify(name) %>Mapper {
  /**
   * Convert ORM Entity (persistence) to Domain Entity (business logic)
   */
  static toDomain(ormEntity: <%= classify(name) %>OrmEntity): <%= classify(name) %> {
    return new <%= classify(name) %>({
      id: ormEntity.id,
      createdAt: ormEntity.createdAt,
      updatedAt: ormEntity.updatedAt,
      // TODO: Map additional fields
    });
  }

  /**
   * Convert Domain Entity to ORM Entity (for persistence)
   */
  static toOrm(domainEntity: <%= classify(name) %>): <%= classify(name) %>OrmEntity {
    return new <%= classify(name) %>OrmEntity({
      id: domainEntity.id,
      createdAt: domainEntity.createdAt,
      updatedAt: domainEntity.updatedAt,
      // TODO: Map additional fields
    });
  }

  /**
   * Convert array of ORM entities to Domain entities
   */
  static toDomainList(ormEntities: <%= classify(name) %>OrmEntity[]): <%= classify(name) %>[] {
    return ormEntities.map(entity => this.toDomain(entity));
  }

  /**
   * Convert Create DTO to Domain Entity (for new entities)
   */
  static createDtoToDomain(dto: Create<%= classify(name) %>Dto): Partial<<%= classify(name) %>> {
    return {
      // TODO: Map DTO fields to domain entity
      // Example: name: dto.name,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  /**
   * Convert Update DTO to partial Domain Entity
   */
  static updateDtoToDomain(dto: Update<%= classify(name) %>Dto): Partial<<%= classify(name) %>> {
    return {
      // TODO: Map DTO fields to domain entity
      updatedAt: new Date(),
    };
  }
}

