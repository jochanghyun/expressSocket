import * as express from 'express';
import { createServer, Server } from 'http';
import * as socketio from 'socket.io';

export class ChatServer {
  public static readonly PORT: number = 3000;
  private app: express.Application;
  private port: string | number;
  private server: Server;
  private io: socketio.Server;

  constructor() {
    this.createApp();
    this.config();
    this.createServer();
    this.sockets();
    this.listen();
  }

  private createApp(): void {
    this.app = express();
  }

  private config(): void {
    this.port = process.env.PORT || ChatServer.PORT;
  }

  private listen(): void {
    this.app.listen(this.port, () => {
      console.log(`Running server on port ${this.port}`);
    });
    this.io.on('connection', (socket) => {
      console.log('123');
      socket.broadcast.emit('add-users', {
        users: [socket.id]
      });

      socket.on('disconnect', () => {

      });
    });
  }

  private createServer(): void {
    this.server = createServer(this.app);
  }

  private sockets(): void {
    this.io = new socketio.Server(this.server);
  }

  public getApp(): express.Application {
    return this.app;
  }
}