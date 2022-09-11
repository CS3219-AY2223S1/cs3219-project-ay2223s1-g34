
import express from 'express'
import cors from 'cors';
import { createServer } from 'http'
import {Server} from 'socket.io'

const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors()) // config cors so that front-end can use
app.options('*', cors())

const http = createServer(app)
const log = console.log
http.listen(8002)

const io = new Server(http, { cors: { origin: '*' } });


//connect
io.on('connection', (socket) => {
    log('Connected')
    socket.on('message', (evt)=> {
        log(evt)
        socket.broadcast.emit('message',evt)
    })
})

//disconnect
io.on('disconnect', (evt) => {
    log('User left')
})

io.on('terminate', (evt) => {
    log('User left')
    socket.disconnect(0);
})