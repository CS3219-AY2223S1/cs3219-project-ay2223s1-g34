import { Server } from "socket.io";

let io;

export const initIo = (httpServer) => {
    var options = {};
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
