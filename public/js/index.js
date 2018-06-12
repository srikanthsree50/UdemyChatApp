var socket = io();

socket.on('connect',function () {
console.log('Connected to Server.... ');

});

socket.on('disconnect',function () {
console.log('DisConnected to Server.... ');
});

socket.on('newMessage',function(message){
console.log('New Message from client to server',message);
var li = jQuery('<li></li>');
li.text(`${message.from}: ${message.text}`);

jQuery('#messages').append(li)
});

socket.on('newLocationMessage',function(message){
    var li = jQuery('<li></li>');
var a = jQuery('<a target = "_blank">My Current Location</a>');

li.text(`${message.from}:`);
a.attr('href',message.url);
li.append(a);
jQuery('#messages').append(li);
})

jQuery('#message-form').on('submit',function(e){
    e.preventDefault();

var messageTextBox = jQuery('[name=message]');

    socket.emit('createMessage',{
        from:'User',
      text:  messageTextBox.val()
    },function () {
     messageTextBox.val('')
    });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
    if(!navigator.geolocation){
        return alert('geolocation not supported on ur browser');
    }

locationButton.attr('disabled','disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function (position){
        locationButton.removeAttr('disabled').text('Send location');
socket.emit('createLocationMessage',{
latitude:position.coords.latitude,
longtitude:position.coords.longitude
})
    },function (){
        locationButton.removeAttr('disabled').text('Sending location');
        alert('unable to fetch location');
    })
})