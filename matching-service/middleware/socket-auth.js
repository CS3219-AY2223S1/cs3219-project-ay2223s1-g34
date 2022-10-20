import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export default function authenticate(socket, next) {
    const token = socket.handshake?.headers.cookie
        ?.split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];
    if (token) {
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                return next(new Error("Authentication error"));
            }
            socket.decoded = decoded;
            next();
        });
    } else {
        next(new Error("Authentication error"));
    }
}
