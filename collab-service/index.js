import express from "express";
import cors from "cors";
import { createServer } from "https";
import { Server } from "socket.io";
import "dotenv/config";

const router = express.Router();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: true, credentials: true })); // config cors so that front-end can use
app.options("*", cors());

const in_mem_storage_editor = new Map();
const in_mem_storage_chat = new Map();

let FRONTEND_URL = process.env.FRONTEND_URL;
const http = createServer(app);
const log = console.log;
http.listen(8002);
const io = new Server(http, {
    cors: {
        origin: FRONTEND_URL,
        credentials: true,
    },
});

//connect
io.on("connection", (socket) => {
    log("Connected");
    var id = socket.handshake.query.id;
    socket.join(id);

    if (in_mem_storage_editor.has(id)) {
        socket.emit("editor", in_mem_storage_editor.get(id))
    }
    if (in_mem_storage_chat.has(id)) {
        socket.emit("chat", in_mem_storage_chat.get(id))
    }
    socket.on("editor", ({ content, to }) => {
        in_mem_storage_editor.set(to,content)
        socket.to(to).emit("editor", content);
    });
    socket.on("chat", ({ message, to }) => {
        if (in_mem_storage_chat.get(to)) {
            in_mem_storage_chat.set(to, in_mem_storage_chat.get(id) + "\n"+ message)
        } else {
            in_mem_storage_chat.set(to, message)
        }
        socket.to(to).emit("chat", message);
    });
    socket.on("exit", ({to}) => {
        socket.to(to).emit("exit");
    });
    socket.on("disconnect", (reason) => {
        var rooms = io.sockets.adapter.rooms
        //remove from storage once two users left the room.
        if (!(rooms.get(id))) {
            in_mem_storage_chat.delete(id);
            in_mem_storage_editor.delete(id);
        }
   });
});
