export class <%= classify(name) %> {
  id: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<<%= classify(name) %>>) {
    Object.assign(this, partial);
  }
}

