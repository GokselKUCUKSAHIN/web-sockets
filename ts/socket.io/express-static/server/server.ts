import * as express from "express";
import {Server, ServerOptions} from "socket.io";

const PORT = 8080;

const serverOptions: Partial<ServerOptions> = {
    cors: {origin: "*"}
};

const app = express();

app.get('/greet', ((req, res) => {
    res.status(200).send("hi");
}));

app.use(express.static("../../app"));

const server = app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));

const io = new Server(server, serverOptions);

io.on("connect", socket => {
    console.log("a new connection established! socket id:", socket.id);
    console.log("all connections", io.sockets.adapter.rooms)
    socket.on("message", (userName, message) => {
        console.log("a message received:", message);
        io.emit("message", `<b>${userName}</b> <em>said</em> '${message}'`); // every clients
        socket.emit("ack", `your message: ${message} received!`); // only the current client
    });
});

