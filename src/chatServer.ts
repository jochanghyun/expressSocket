import { timeStamp } from 'console';
import * as express from 'express';
import { createServer, Server } from 'http';
import * as socketio from 'socket.io';

export class ChatServer {
  public static readonly PORT: number = 3000;
  private app: express.Application;
  private port: string | number;
  private server: Server;
  private io: socketio.Server;
  private socketsArray = [];

  constructor() {
    this.createApp();
    this.config();
    this.createServer();
    this.sockets();
    this.setEngine();
    this.listen();
  }

  private createApp(): void {
    this.app = express();
  }

  private config(): void {
    this.port = process.env.PORT || ChatServer.PORT;
    this.app.set('views', __dirname + '/views');
  }

  private listen(): void {
    this.server.listen(this.port, () => {
      console.log(`Running server on port ${this.port}`);
    });
    this.io.on('connection', (socket) => {
      console.log('connected');
      socket.broadcast.emit('add-users', {
        users: [socket.id]
      });

      socket.on('disconnect', () => {
        this.socketsArray.splice(this.socketsArray.indexOf(socket.id), 1);
        this.io.emit('remove-user', socket.id);
      });
    });
  }

  private createServer(): void {
    this.server = createServer(this.app);
  }

  private sockets(): void {
    this.io = new socketio.Server(this.server);
  }

  private setEngine(): void {
    this.app.set('view engine', 'ejs');
    this.app.engine('html', require('ejs').renderFile);

  }

  public getApp(): express.Application {
    return this.app;
  }


}