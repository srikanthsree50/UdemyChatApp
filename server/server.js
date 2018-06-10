const express = require('express');
const socketIO = require('socket.io');
const path = require('path');
const http = require('http');

const {generateMessage} = require('./utils/message');
const Publicpath = path.join(__dirname,'../public');
const port = process.env.PORT || 8080
var app = express();

var server = http.createServer(app);
var io = socketIO(server);

io.on('connection',(socket) => {
    console.log('New User connected...');

    socket.emit('newMessage',generateMessage('Admin','welcome to Chat App'));

    socket.broadcast.emit('newMessage',generateMessage('Admin','New User Joined'));

                socket.on('createMessage',(message) => {
                    console.log('create Message :',message);
                    io.emit('newMessage',generateMessage( message.from, message.text));

                    // socket.broadcast.emit('newMessage',{
                    //     from:message.from,
                    //     text:message.text,
                    //     createdAt:new Date().gettime()
                    // })
                });

  socket.on('disconnect',() => {
    console.log('User was DisConnected .... ');
        });

});

app.use(express.static(Publicpath));

server.listen(port,() => {
    console.log(`server running at port ${port}`);
})
