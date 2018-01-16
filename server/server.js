const express = require('express')
var app = express()
const http = require('http') 
const path = require('path');
const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000
const socketIO = require('socket.io');
var server = http.createServer(app) 
var io = socketIO(server)

const {generateMsg} = require('./utils/message');

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New User connectd')

    socket.emit('newMsg', generateMsg('Admin', 'Welcome to chat app'))
    socket.broadcast.emit('newMsg', generateMsg('Admin', 'New user joined'))
    
    socket.on('createMsg', (msg, callback) => {
        console.log('message ', msg )
        io.emit('newMsg', generateMsg(msg.from, msg.text))
        callback('This is String')
        // socket.broadcast.emit('newMsg', {
        //     from: msg.from,
        //     text: msg.text,
        //     createdAt: new Date().getDate()
        // })
    })
    socket.on('disconnect', () => {
        console.log('disconnected from the client')
    })
})

server.listen(port, () => {
    console.log('Server running');
})
// io.emit => sends event(msg) for all
// socket.emit => sends event(msg) ony for me
// socket.broadcast.emit => sends event(msg) for all excluding me