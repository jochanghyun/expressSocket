import { io, Socket } from "socket.io-client";
import * as moment from 'moment';
import { chatParamType } from "../../types";
import { datastax } from "cassandra-driver";



class chatPage {
  private socket: Socket;
  private roomName: string;
  private userName: string;
  private submitBtn = document.getElementById('chat-submit');
  private msgContainer = document.querySelector('.chat-messages');
  constructor() {
    this.socket = io('http://localhost:3001');
    this.roomName = location.href.slice(location.href.indexOf('room')).replace('room=', '');
    this.userName = decodeURI(location.href.slice(location.href.indexOf('username='), location.href.indexOf('&'))
      .replace('username=', ''));

  }


  init() {
    this.domEvent();
    this.socketEvent();
  }
  socketEvent() {
    this.socket.emit('enterRoom', { roomName: this.roomName, userName: this.userName });
    this.socket.on('newUser', (data) => {
      //새로운유저 userlist에 추가
      const liNode = document.createElement('li');
      liNode.innerHTML = decodeURI(data.userName);
      liNode.className = data.socketId;
      document.querySelector('#users').appendChild(liNode);

      //새로운유저 입장채팅
      const template = require('../templates/chat/message.ejs');
      const newMessage = template(
        {
          id: decodeURI(data.userName),
          chatTime: moment().format('YYYY-MM-DD HH : MM'),
          comment: `${decodeURI(data.userName)} 입장하셨습니다`,
        });
      this.msgContainer.innerHTML += newMessage;
    });

    this.socket.on('userExit', (data) => {
      const el = document.querySelector(`.${data}`);
      console.log(el);
    });

    this.socket.on('newChat', (data: chatParamType) => {
      const template = require('../templates/chat/message.ejs');
      const newMessage = template(data);
      this.msgContainer.innerHTML += newMessage;

    })

  }
  domEvent() {
    this.submitBtn.onclick = (e) => {
      e.preventDefault();
      const msgInput = (<HTMLInputElement>document.getElementById('msg'));
      this.socket.emit('chatSubmit', {
        roomName: this.roomName,
        id: this.userName,
        comment: msgInput.value,
        chatTime: moment().format('YYYY-MM-DD-HH-MM-ss.SSS')
      });
      msgInput.value = '';
    }
  }

}

new chatPage().init();

