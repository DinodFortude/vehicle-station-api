import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WsResponse,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({ cors: 'http://localhost:4200' })
export class VehiclesGateway implements OnGatewayInit, OnGatewayConnection {
  private logger: Logger = new Logger('AppGateway');
  public socket: Server;

  afterInit(server: any) {
    this.logger.log('Initialized');
    console.log(server);
    this.socket = server;
  }

  handleConnection(client: any, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('messagePass')
  handleMessage(client: any, payload: any): WsResponse<string> {
    console.log(payload);
    return { event: 'message', data: 'Hello world!' };
  }

  @SubscribeMessage('messageTwo')
  secondMessage(client: any, payload: any): WsResponse<string> {
    console.log(payload);
    return { event: 'message', data: 'Hello Menika!' };
  }
}
