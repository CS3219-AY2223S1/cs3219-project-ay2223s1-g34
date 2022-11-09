import { Server } from "socket.io";

import authenticate from "./middleware/socket-auth.js";

let io;

const FRONTEND_URL = process.env.FRONTEND_URL;

export const initIo = (httpServer) => {
    var options = {
        cookie: true,
        cors: {
            origin: FRONTEND_URL,
            credentials: true,
        },
        transports: ["websocket","polling"],
        sameSite: 'none', 
        secure: true
    };
    io = new Server(httpServer, options);
    io.on("connection", (socket) =>
        console.log(`New client connected to ${socket.id}`)
    );
    return io;
};

export const getIo = () => {
    if (!io) {
        throw new Error(ErrorMessages.ERROR_IO_NOT_INITIALISED);
    }

    return io;
};
