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

    var messageTextbox = $('[name=message]')

    socket.emit('createMsg', {
        from: 'User',
        text: messageTextbox.val()
    }, function() {
        messageTextbox.val('')
    })
})
var locationButton = jQuery('#send-location');

locationButton.on('click', function() {
    if(!navigator.geolocation) {
        return alert('geolocation not supported by your browser');
    }
    locationButton.attr('disabled', 'disabled')
    locationButton.text('Sending...')

    navigator.geolocation.getCurrentPosition(function(position) {
        locationButton.removeAttr('disabled')
        locationButton.text('Send Location')
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    }, function() {
        locationButton.removeAttr('disabled')
        locationButton.text('Send Location')        
        alert('Unable to fetch location.')
    })
})
