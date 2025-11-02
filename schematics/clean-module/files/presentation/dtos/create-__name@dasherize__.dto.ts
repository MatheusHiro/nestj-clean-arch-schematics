import { IsString, IsNotEmpty } from 'class-validator';

export class Create<%= classify(name) %>Dto {
  @IsString()
  @IsNotEmpty()
  name: string;

  // TODO: Add your specific fields here
}

