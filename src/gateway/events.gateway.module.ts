import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { MainModule } from '../main/main.module'; // Import the module containing MainService

@Module({
  imports: [MainModule],
  providers: [EventsGateway],
  exports: [EventsGateway],
})
export class GatewayModule {}
