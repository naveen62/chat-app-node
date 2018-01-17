var socket = io()

socket.on('connect', function () {
    console.log('Connected to server');
    
})
socket.on('disconnect', function () {
    console.log('disconnected from the server')
})

socket.on('newMsg', function(msg) {
    var formattedTime = moment(msg.createdAt).utcOffset('+05:30').format('h:mmA') 
    var template = $('#message-template').html()
    var html = Mustache.render(template, {
        text: msg.text,
        from: msg.from,
        createdAt: formattedTime
    });

    $('#messages').append(html)
   
})
socket.on('newLocationMsg', function(msg) {
    var time = moment(msg.createdAt).utcOffset('+05:30').format('h:mmA')
    var template = $('#location-message-template').html()
    var html = Mustache.render(template, {
        from: msg.from,
        createdAt: time,
        url: msg.url
    })
    $('#messages').append(html)
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
