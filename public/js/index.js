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

jQuery('#message-form').on('submit',function(e){
    e.preventDefault();

    socket.emit('createMessage',{
        from:'User',
        text:jQuery('[name=message]').val()
    },function () {

    });
});