const socket = new WebSocket('ws://localhost:8080');

socket.onmessage = ({data}) => {
  console.info("Message from server", data);
};

document.querySelector('#sender').onclick = () => {
  socket.send(`time: ${Date.now()}`);
}