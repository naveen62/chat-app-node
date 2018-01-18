const express = require('express')
var app = express()
const http = require('http') 
const path = require('path');
const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000
const socketIO = require('socket.io');
var server = http.createServer(app) 
var io = socketIO(server)

const {generateMsg, generateLocationMsg} = require('./utils/message');
const {isRealStr} = require('./utils/validation');
const {Users} = require('./utils/users');
var users = new Users()

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New User connectd')

    
    socket.on('join', (params, callback) => {
        if(!isRealStr(params.name) ||!isRealStr(params.room)) {
            return callback('Name and room name are required')
        }


        socket.join(params.room)
        users.removeUser(socket.id)
        users.addUser(socket.id, params.name, params.room)
        io.to(params.room).emit('updateUserList', users.getUserList(params.room))
        var getroom = users.getUser(socket.id)
        // socket.leave('the office Fans)
        // io.emit -> io.to('the office fans).emit()
        // socket.boradcast.emit -> socket.boradcast.to('the office fans').emit
        
        socket.emit('newMsg', generateMsg(getroom.room + ' room', 'Welcome to chat app'))
        socket.broadcast.to(params.room).emit('newMsg', generateMsg(getroom.room + ' room', `${params.name} has joind`))
        callback()
    })

    socket.on('createMsg', (msg, callback) => {
        var user = users.getUser(socket.id)

        if(user && isRealStr(msg.text)) {
            return io.to(user.room).emit('newMsg', generateMsg(user.name, msg.text))           
        }
        callback('Please enter message')
        // socket.broadcast.emit('newMsg', {
        //     from: msg.from,
        //     text: msg.text,
        //     createdAt: new Date().getDate()
        // })
    })
    socket.on('createLocationMessage', (coords) => {
        var user = users.getUser(socket.id)
        io.to(user.room).emit('newLocationMsg', generateLocationMsg(user.name, coords.latitude, coords.longitude))
    })
    socket.on('disconnect', () => {
        var user = users.removeUser(socket.id);

        if(user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room))
            io.to(user.room).emit('newMsg', generateMsg(user.room + ' room', `${user.name} has left the room`))
        }
    })
})

server.listen(port, () => {
    console.log('Server running');
})
// io.emit => sends event(msg) for all
// socket.emit => sends event(msg) ony for me
// socket.broadcast.emit => sends event(msg) for all excluding me