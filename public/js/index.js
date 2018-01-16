var socket = io()

socket.on('connect', function () {
    console.log('Connected to server');
    
})
socket.on('disconnect', function () {
    console.log('disconnected from the server')
})

socket.on('newMsg', function(msg) {
    console.log('new message', msg)
    var li = $('<li></li>');
    li.text(`${msg.from}: ${msg.text}`)

    $('#messages').append(li)
})
socket.on('newUser', function(msg) {
    console.log(msg)
})

$('#message-form').on('submit', function(e) {
    e.preventDefault()

    socket.emit('createMsg', {
        from: 'User',
        text: $('[name=message]').val()
    }, function() {

    })
})