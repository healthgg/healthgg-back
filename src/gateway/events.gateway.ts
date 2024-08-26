import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  namespace: 'maindata',
  cors: {
    origin: '*', // 허용할 도메인 설정
    methods: ['GET', 'POST'],
  },
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private rooms = new Map<string, string[]>(); // 방과 채팅 내역 저장
  private clientsCount: string[] = [];

  handleConnection(client: any, ...args: any[]): number {
    this.clientsCount.push(client.id);
    this.server.emit('clientsCount', this.clientsCount);

    console.log(`Client connected: ${client.id}`);
    console.log(this.clientsCount);
    console.log(this.clientsCount.length);
    return this.clientsCount.length;
  }

  handleDisconnect(client: any): number | [] {
    const index = this.clientsCount.findIndex((item) => item === client.id);
    console.log(index);
    if (index) delete this.clientsCount === client.id;
    this.server.emit('clientsCount', this.clientsCount);
    //console.log(client);
    console.log(`Client disconnected: ${client.id}`);
    console.log(this.clientsCount.length);
    console.log(this.clientsCount?.length);
    return this.clientsCount?.length ? this.clientsCount.length : [];
  }

  @SubscribeMessage('login_client')
  async loginClient(client: Socket, clientId: string): Promise<void> {
    if (clientId != '' && clientId != undefined) {
      // 소켓 아이디를 가져옵니다.
      const socketId = client.id;
      // 연결되어있는 클라이언트 아이디를 저장합니다.
      //await this.redisService.addClient(socketId, clientId, 'online');

      // 저장한 클라이언트 아이디를 가져옵니다.
      // const clientInfo = await this.redisService.getClient(socketId);
      // 클라이언트에게 보낼 정보를 초기화 시킵니다.
      const result = { id: clientId };
      // 연결되어있는 클라이언트에게 브로트캐스트로 전달합니다.
      this.server.emit('client_info', result);
    }
  }

  @SubscribeMessage('events')
  handleEvent(client: Socket, @MessageBody() data: string) {
    console.log(data);
    console.log(client);
    this.server.emit('events', data); // 클라이언트에게 직접 응답 전송
  }

  @SubscribeMessage('createRoom')
  createRoom(@MessageBody() roomName: string): void {
    if (!this.rooms.has(roomName)) {
      this.rooms.set(roomName, []);
    }
    this.server.emit('roomCreated', roomName); // 방 생성 알림
  }

  @SubscribeMessage('joinRoom')
  joinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() roomName: string,
  ): void {
    client.join(roomName);
    const messages = this.rooms.get(roomName) || [];
    client.emit('chatHistory', messages); // 채팅 내역 전송
  }

  @SubscribeMessage('sendMessage')
  sendMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() { roomName, message }: { roomName: string; message: string },
  ) {
    console.log(message);
    const messages = this.rooms.get(roomName) || [];
    messages.push(message);
    this.rooms.set(roomName, messages);

    // 방에 있는 모든 클라이언트에게 메시지 전송
    this.server.to(roomName).emit('newMessage', message);
  }
}
