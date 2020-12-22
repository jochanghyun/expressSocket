
const socket = io();
const chatForm = document.getElementById('chat-form');

const outputMessage = (message) => {
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = `<p class="meta">Mary <span>${new Date()}</span></p>
  <p class="text">
    ${message}
  </p>`;
  document.querySelector('.chat-messages').appendChild(div);
}

socket.on('message', message => {
  console.log(message);
  outputMessage(message);
})


//Message submit

chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const msg = e.target.elements.msg.value;
  console.log(msg);
  socket.emit('chatMessage', msg);
})

