import {WebSocketServer} from "ws";

const server = new WebSocketServer({port: 8080});

server.on("connection", socket => {
    console.log("connection established.");
    socket.on("message", message => {
        console.info("received message:", message.toString());
        socket.send(`Roger!: '${message}'`);
    });
});