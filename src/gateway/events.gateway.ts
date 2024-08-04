import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:5173', // 허용할 도메인 설정
    methods: ['GET', 'POST'],
  },
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private clientsCount: number = 0;

  handleConnection(client: any, ...args: any[]): number {
    this.clientsCount++;
    this.server.emit('clientsCount', this.clientsCount);
    console.log(this.server);
    console.log(`Client connected: ${client.id}`);
    return this.clientsCount;
  }

  handleDisconnect(client: any): number {
    this.clientsCount--;
    this.server.emit('clientsCount', this.clientsCount);
    //this.server.adapter
    console.log(`Client disconnected: ${client.id}`);
    return this.clientsCount;
  }
}
