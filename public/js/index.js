var socket = io()

socket.on('connect', function () {
    console.log('Connected to server');
    
})
socket.on('disconnect', function () {
    console.log('disconnected from the server')
})

socket.on('newMsg', function(msg) {
    console.log('new message', msg)
    var li = jQuery('<li></li>');
    li.text(`${msg.from}: ${msg.text}`)

    jQuery('#messages').append(li)
})
socket.on('newLocationMsg', function(msg) {
    var li = $('<li></li>')
    var a = $('<a target="_blank">My current location</a>')
    li.text(`${msg.from}: `);
    a.attr('href', `${msg.url}`);
    li.append(a)
    $('#messages').append(li)
})
socket.on('newUser', function(msg) {
    console.log(msg)
})

jQuery('#message-form').on('submit', function(e) {
    e.preventDefault()

    socket.emit('createMsg', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function() {

    })
})
var locationButton = jQuery('#send-location');

locationButton.on('click', function() {
    if(!navigator.geolocation) {
        return alert('geolocation not supported by your browser');
    }
    navigator.geolocation.getCurrentPosition(function(position) {
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    }, function() {
        alert('Unable to fetch location.')
    })
})
