import {createServer} from "http";

const http = createServer();

import {Server, ServerOptions} from "socket.io";

const serverOptions: Partial<ServerOptions> = {
    cors: {origin: "*"}
};

const io = new Server(http, serverOptions);

io.on("connect", socket => {
    console.log("a new connection established! socket id:", socket.id);
    console.log("all connections", io.sockets.adapter.rooms)
    socket.on("message", (userName, message) => {
        console.log("a message received:", message);
        io.emit("message", `<b>${userName}</b> <em>said</em> '${message}'`); // every clients
        socket.emit("ack", `your message: ${message} received!`); // only the current client
    });
});

http.listen(8080, () => console.log('listening on http://localhost:8080'));