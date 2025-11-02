// ORM Entity (Persistence Model)
// This is the database representation using your ORM (TypeORM, Prisma, Mongoose, etc.)
// TODO: Add your ORM decorators (@Entity, @Column, etc.)

export class <%= classify(name) %>OrmEntity {
  id: string;
  // TODO: Add your specific fields here
  createdAt: Date;
  updatedAt: Date;

  constructor(partial?: Partial<<%= classify(name) %>OrmEntity>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }
}

