var socket = io()

function scrollToButtom() {
    // Selectors
    var messages = $('#messages');
    var newMessage = messages.children('li:last-child')
    // Heights
    var clientHeight = messages.prop('clientHeight')
    var scrollTop = messages.prop('scrollTop')
    var scrollHeight = messages.prop('scrollHeight')
    var newMessageHeight = newMessage.innerHeight()
    var lastMessageHeight = newMessage.prev().innerHeight()

    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}
socket.on('connect', function () {
    var params = $.deparam(window.location.search);
    
    socket.emit('join', params, function(err) {
        console.log(err)
        if(err) {
            alert(err);
            window.location.href = '/'
        } else {
            console.log('No error')
        }
    })
})
socket.on('disconnect', function () {
    console.log('disconnected from the server')
})
socket.on('updateUserList', function(users) {
    var ol = $('<ol></ol>');

    users.forEach(function(user) {
        ol.append($('<li></li>').text(user))
    })
    $('#users').html(ol)
})
socket.on('newMsg', function(msg) {
    var messageTextbox = $('[name=message]')
    var formattedTime = moment(msg.createdAt).utcOffset('+05:30').format('h:mmA') 
    var template = $('#message-template').html()
    var html = Mustache.render(template, {
        text: msg.text,
        from: msg.from,
        createdAt: formattedTime
    });

    $('#messages').append(html)
    messageTextbox.val('')
    scrollToButtom()
   
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
    scrollToButtom()
})
socket.on('newUser', function(msg) {
    console.log(msg)
})

jQuery('#message-form').on('submit', function(e) {
    e.preventDefault()

    var messageTextbox = $('[name=message]')

    socket.emit('createMsg', {
        text: messageTextbox.val()
    }, function(err) {
        if(err) {
            alert(err)
        }
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
