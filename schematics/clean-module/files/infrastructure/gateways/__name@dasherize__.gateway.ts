import { Injectable } from '@nestjs/common';

/**
 * Gateway for external integrations related to <%= classify(name) %>
 * Examples: External APIs, Message Queues, Email Services, etc.
 */
@Injectable()
export class <%= classify(name) %>Gateway {
  // TODO: Inject external service clients (HttpService, email service, etc.)
  // Example: constructor(private readonly httpService: HttpService) {}

  /**
   * Example: Fetch data from an external API
   */
  async fetchExternalData(id: string): Promise<any> {
    // TODO: Implement external API call
    console.log(`Fetching external data for <%= camelize(name) %> ${id}`);
    return {};
  }

  /**
   * Example: Send notification to external service
   */
  async sendNotification(data: any): Promise<void> {
    // TODO: Implement notification logic
    console.log(`Sending notification for <%= camelize(name) %>:`, data);
  }
}

