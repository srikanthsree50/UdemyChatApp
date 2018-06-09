const express = require('express');
const socketIO = require('socket.io');
const path = require('path');
const http = require('http');

const Publicpath = path.join(__dirname,'../public');
const port = process.env.PORT || 8080
var app = express();

var server = http.createServer(app);
var io = socketIO(server);

io.on('connection',(socket) => {
    console.log('New User connected...');


    socket.emit('newMessage',{
        from:'srikanth',
        text:'hi hw r u',
        createdAt:123
                });

                socket.on('createMessage',(message) => {
                    console.log('create Message :',message);
                });

  socket.on('disconnect',() => {
    console.log('User was DisConnected .... ');
        });

});

app.use(express.static(Publicpath));

server.listen(port,() => {
    console.log(`server running at port ${port}`);
})
