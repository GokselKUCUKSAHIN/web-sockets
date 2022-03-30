const socket = io('ws://192.168.1.102:8080');

const nameField = document.querySelector("#name-field");

const messageField = document.querySelector("#message-field");

socket.on('message', text => {
  const el = document.createElement('li');
  el.innerHTML = text;
  document.querySelector('ul').append(el)
});

socket.on('ack', console.info);

document.querySelector('#sender').onclick = () => {
  const text = messageField.value;
  const name = nameField.value;
  socket.emit('message', name, text)
}