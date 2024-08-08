import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventsGateway } from './gateway/events.gateway';
import { WebSocketServer } from '@nestjs/websockets';
import { Server } from 'http';

@Controller()
export class AppController {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly appService: AppService,
    private readonly eventsGateway: EventsGateway,
  ) {}

  @Get()
  getHello(): number {
    // this.eventsGateway.handleConnection('c');
    console.log(this.server);
    const members = this.eventsGateway.getConnettions();
    //console.log(this.eventsGateway.handleConnection('aaa'));
    return this.appService.getHello(members);
  }
}
