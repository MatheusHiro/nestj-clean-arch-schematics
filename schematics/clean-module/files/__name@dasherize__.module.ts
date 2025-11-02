import { Module } from '@nestjs/common';
<% if (!skipController) { %>import { <%= classify(name) %>Controller } from './presentation/controllers/<%= dasherize(name) %>.controller';<% } %>
<% if (!skipService) { %>import { <%= classify(name) %>Service } from './application/services/<%= dasherize(name) %>.service';<% } %>
<% if (!skipRepository) { %>import { <%= classify(name) %>RepositoryImpl } from './infrastructure/repositories/<%= dasherize(name) %>.repository';<% } %>
<% if (!skipGateway) { %>import { <%= classify(name) %>Gateway } from './infrastructure/gateways/<%= dasherize(name) %>.gateway';<% } %>
<% if (!skipRepository) { %>import { <%= underscore(name).toUpperCase() %>_REPOSITORY_TOKEN } from './domain/interfaces/<%= dasherize(name) %>.repository.interface';<% } %>

@Module({
  imports: [],
  controllers: [<% if (!skipController) { %><%= classify(name) %>Controller<% } %>],
  providers: [
    <% if (!skipService) { %><%= classify(name) %>Service,<% } %>
    <% if (!skipGateway) { %><%= classify(name) %>Gateway,<% } %>
    <% if (!skipRepository) { %>{
      provide: <%= underscore(name).toUpperCase() %>_REPOSITORY_TOKEN,
      useClass: <%= classify(name) %>RepositoryImpl,
    },<% } %>
  ],
  exports: [<% if (!skipService) { %><%= classify(name) %>Service<% } %>],
})
export class <%= classify(name) %>Module {}

