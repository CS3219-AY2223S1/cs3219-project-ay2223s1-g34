
import express from 'express'
import cors from 'cors';
import { createServer } from 'http'
import {Server} from 'socket.io'
import "dotenv/config";

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
    log(`Joined room ${id}`)
    socket.on('editor', ({content, to})=> {
        log(`${content} from ${to}`)
        socket.to(to).emit('editor', content)
    })
})

//disconnect
io.on('disconnect', (evt) => {
    log('User left')
})
