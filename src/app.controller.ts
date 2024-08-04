import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventsGateway } from './gateway/events.gateway';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly eventsGateway: EventsGateway,
  ) {}

  @Get()
  getHello(): string {
    this.eventsGateway.handleConnection;
    return this.appService.getHello();
  }
}
