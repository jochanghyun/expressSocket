import 'source-map-support/register';
import App from './App';
import * as express from 'express';
import {Server} from 'socket.io';
import * as http from 'http';
import path from 'path';

const port : number = Number(process.env.PORT ||3000);
const app : express.Application = new App().app;
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname,'public')));

io.on('connection',socket =>{
  console.log('New WS Connection..');
  socket.emit('message','Welcome to ChatCord!');
})

app.listen(port, () => console.log(`Express server listening at ${port}`))
  .on('error', err => console.error(err));
