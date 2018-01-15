const express = require('express')
var app = express()
const http = require('http') 
const path = require('path');
const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000
const socketIO = require('socket.io');
var server = http.createServer(app) 
var io = socketIO(server)

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New User connectd')

    
    socket.on('createMsg', (msg) => {
        console.log('message ', msg )
        io.emit('newMsg', {
            from: 'John',
            text: 'See you then',
            createdAt: 123123
        })
    })
    socket.on('disconnect', () => {
        console.log('disconnected from the client')
    })
})

server.listen(port, () => {
    console.log('Server running');
})