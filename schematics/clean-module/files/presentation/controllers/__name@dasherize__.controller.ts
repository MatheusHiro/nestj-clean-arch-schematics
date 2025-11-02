import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { <%= classify(name) %>Service } from '../../application/services/<%= dasherize(name) %>.service';
import { Create<%= classify(name) %>Dto } from '../dtos/create-<%= dasherize(name) %>.dto';
import { Update<%= classify(name) %>Dto } from '../dtos/update-<%= dasherize(name) %>.dto';

@Controller('<%= dasherize(name) %>s')
export class <%= classify(name) %>Controller {
  constructor(private readonly <%= camelize(name) %>Service: <%= classify(name) %>Service) {}

  @Get()
  async findAll() {
    return this.<%= camelize(name) %>Service.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.<%= camelize(name) %>Service.findById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createDto: Create<%= classify(name) %>Dto) {
    return this.<%= camelize(name) %>Service.create(createDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: Update<%= classify(name) %>Dto,
  ) {
    return this.<%= camelize(name) %>Service.update(id, updateDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    return this.<%= camelize(name) %>Service.delete(id);
  }
}

