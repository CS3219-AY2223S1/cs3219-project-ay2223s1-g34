
import express from 'express'
import cors from 'cors';
import { createServer } from 'http'
import {Server} from 'socket.io'
import "dotenv/config";
import { SocketAddress } from 'net';

const router = express.Router()
const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors({ origin: true, credentials: true })) // config cors so that front-end can use
app.options('*', cors())

let FRONTEND_URL = process.env.FRONTEND_URL;
const http = createServer(app)
const log = console.log
http.listen(8002)
const io = new Server(http, { 
    cors: {
        origin: FRONTEND_URL,
        credentials: true,
    }, 
});

//connect
io.on('connection', (socket) => {
    log('Connected')
    var id = socket.handshake.query.id;
    socket.join(id)
    socket.on('editor', ({content, to})=> {
        socket.to(to).emit('editor', content)
    })
    socket.on('chat', ({message, to}) => {
        socket.to(to).emit('chat', message)
    })
})

//disconnect
io.on('disconnect', (evt) => {
    log('User left')
})
