import path, { dirname } from 'path';
import http from 'http';
import express from 'express';
import 'socket.io';
import { Server } from 'socket.io';


class App {
  public application: express.Application;

  constructor() {
    this.application = express();
  }
}

const app = new App().application;
const PORT = 3000 || process.env.PORT;
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', socket => {
  socket.emit('message', 'Welcome to ChatCord!');
  socket.broadcast.emit('message', 'A use has joined the chat');
  socket.on('disconnect', () => {
    io.emit('message', 'A use has left the chat');
  });
  socket.on('chatMessage', (msg: string) => {
    console.log(msg);
  });

});

app.use(express.static(path.join(__dirname)));

app.get("/", (req: express.Request, res: express.Response) => {
  res.send('start');;
});


server.listen(PORT, () => console.log(`Server running on prt ${PORT}`));