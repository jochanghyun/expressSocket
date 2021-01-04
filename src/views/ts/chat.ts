import { io } from "socket.io-client";
import * as moment from 'moment';

const socket = io('http://localhost:3001');
const roomName = location.href.slice(location.href.indexOf('room'))
  .replace('room=', '');
const userName = location.href.slice(location.href.indexOf('username='), location.href.indexOf('&'))
  .replace('username=', '');


socket.emit('enterRoom', { roomName: roomName, userName: userName });


socket.on('newUser', (data) => {
  //새로운유저 userlist에 추가
  const liNode = document.createElement('li');
  liNode.innerHTML = decodeURI(data.userName);
  liNode.className = data.socketId;
  document.querySelector('#users').appendChild(liNode);

  //새로운유저 입장채팅
  const template = require('../templates/chat/message.ejs');
  const newMessage = template(
    {
      userName: decodeURI(data.userName),
      time: moment().format('YYYY-MM-DD HH : MM'),
      contents: `${decodeURI(data.userName)} 입장하셨습니다`,
    });
  document.querySelector('.chat-messages').innerHTML += newMessage;
});

socket.on('userExit', (data) => {
  const el = document.querySelector(`.${data}`);
  console.log(el);
});
