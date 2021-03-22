import { Console, timeStamp } from 'console';
import * as express from 'express';
import { createServer, Server } from 'http';
import * as socketio from 'socket.io';
import { MessageType, UserInfoType, chatParamType } from "./types";
// import { CassandraConnection } from './cassandraConnection';
import {Db,MongoClient,MongoClientOptions} from 'mongodb';


export class ChatServer {
  public static readonly PORT: number = 3000;
  private app: express.Application;
  private port: string | number;
  private server: Server;
  private io: socketio.Server;
  private socketsArray: Array<UserInfoType> = [];
  private chatDB : Db;
  
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

      socket.on('chatSubmit', async (data: chatParamType) => {
        console.time('chatInsert');
        this.io.in(data.roomName).emit('newChat', data);
        // const result = await this.chatDB.insertChat({
        //   table: 'chats',
        //   range: { start: 1, end: 2 },
        //   chatParams: data
        // });
        const chatTable = this.chatDB.collection('chat');
        chatTable.insertOne(data);
        
        console.timeEnd('chatInsert');
      })

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
    const client = new MongoClient(
      "mongodb+srv://JoChangHyun:96969595z!@cluster0.s12nh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
      {useNewUrlParser:true, useUnifiedTopology:true}
    );
    client.connect((err,dataBase)=>{
      this.chatDB = dataBase.db('chat');
    // perform actions on the collection object
      if(err) client.close();
    });
    
    // this.chatDB = new CassandraConnection({
    //   host: 'localhost',
    //   keyspace: 'chatdata',
    //   port: '9042'
    // });
  
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