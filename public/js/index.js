var socket = io();

socket.on('connect',function () {
console.log('Connected to Server.... ');

});

socket.on('disconnect',function () {
console.log('DisConnected to Server.... ');
});

socket.on('newMessage',function(message){

var template = jQuery('#message-template').html();
var html = Mustache.render(template,{
    text:message.text,
    from:message.from,
    createdAt:message.createdAt
});
jQuery('#messages').append(html);

});

socket.on('newLocationMessage',function(message){


    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template,{
        from:message.from,
        url:message.url,
        createdAt:message.createdAt

    })
    jQuery('#messages').append(html);

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