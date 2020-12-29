import e from "express";
import { ISO_8601 } from "moment";
import { io } from "socket.io-client";

const socket = io('http://localhost:3001');
socket.on('add-users', (data: Array<any>) => {
  data.forEach((item, index) => {
    const el = document.createElement('div');
    el.setAttribute('id', item);
    el.innerHTML = item;
    el.addEventListener('click', () => {
      console.log(item);
    })
  })
})