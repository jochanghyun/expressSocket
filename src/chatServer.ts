import { Console, timeStamp } from 'console';
import * as express from 'express';
import { createServer, Server } from 'http';
import * as socketio from 'socket.io';
import { MessageType, UserInfoType } from './types';
import { CassandraConnection } from './cassandraConnection';


export class ChatServer {
  public static readonly PORT: number = 3000;
  private app: express.Application;
  private port: string | number;
  private server: Server;
  private io: socketio.Server;
  private socketsArray: Array<UserInfoType> = [];
  private chatDB: CassandraConnection;

  constructor() {
    this.createApp();
    this.config();
    this.setDataBase();
    this.createServer();
    this.sockets();
    this.setEngine();
    this.setSocketsArray();
    this.listen();
  }

  private listen(): void {

    this.server.listen(this.port, () => {
      console.log(`Running server on port ${this.port}`);

    });
    this.io.on('connection', (socket: socketio.Socket) => {

      socket.on('enterRoom', async (data) => {
        data.socketId = socket.id;
        socket.join(data.roomName);
        this.socketsArray.push(data);
        socket.to(data.roomName).emit("newUser", data);
      });

      socket.on('disconnect', async (reason) => {
        socket.rooms.forEach((item) => {
          socket.to(item).emit("userExit", socket.id);
        });
        this.socketsArray = this.socketsArray.filter((item) => item.socketId !== socket.id);

      });
    });

  }

  private createApp(): void {
    this.app = express();
  }

  private config(): void {
    this.port = process.env.PORT || ChatServer.PORT;
    this.app.set('views', __dirname + '/views');
  }
  private setDataBase(): void {
    this.chatDB = new CassandraConnection({
      host: 'localhost',
      keyspace: 'chatdata',
      port: '9043'
    });
  }


  private createServer(): void {
    this.server = createServer(this.app);
    this.server.maxConnections = 10000;
  }

  private sockets(): void {
    this.io = new socketio.Server(this.server);
  }

  private setEngine(): void {
    this.app.set('view engine', 'ejs');
    this.app.set('views', './src/views/templates');
  }

  private setSocketsArray(): void {
    this.socketsArray
  }

  public getApp(): express.Application {
    return this.app;
  }


}