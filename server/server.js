const express = require('express');
const socketIO = require('socket.io');
const path = require('path');
const http = require('http');

const {generateMessage,generateLocationMessage} = require('./utils/message');
const Publicpath = path.join(__dirname,'../public');
const port = process.env.PORT || 8080
var app = express();

var server = http.createServer(app);
var io = socketIO(server);

io.on('connection',(socket) => {
    console.log('New User connected...');

    socket.emit('newMessage',generateMessage('Admin','welcome to Chat App'));

    socket.broadcast.emit('newMessage',generateMessage('Admin','New User Joined'));

                socket.on('createMessage',(message,callback) => {
                    console.log('create Message :',message);
                    io.emit('newMessage',generateMessage( message.from, message.text));
callback('this is from server..');
                });

socket.on('createLocationMessage',(coords) => {
io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude, coords.longtitude));
});

  socket.on('disconnect',() => {
    console.log('User was DisConnected .... ');
        });

});

app.use(express.static(Publicpath));

server.listen(port,() => {
    console.log(`server running at port ${port}`);
})
