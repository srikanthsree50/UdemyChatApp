const express = require('express');
const socketIO = require('socket.io');

const path = require('path');
const http = require('http');

const {Users} = require('./utils/users');
const {isRealString} = require('./utils/validation');
const {generateMessage,generateLocationMessage} = require('./utils/message');
const Publicpath = path.join(__dirname,'../public');
const port = process.env.PORT || 8080
var app = express();

var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

io.on('connection',(socket) => {
    console.log('New User connected...');

    socket.on('join',(params,callback) => {
if(!isRealString(params.name) || !isRealString(params.room)){
  return  callback('Name and room name are required...');
}
socket.join(params.room);
users.removeUser(socket.id);
users.addUser(socket.id,params.name,params.room);

io.to(params.room).emit('updateUserList',users.getUsersList(params.room));

socket.emit('newMessage',generateMessage('Admin','welcome to Chat App'));

socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',`${params.name} has joined`));

    callback();

    })
                socket.on('createMessage',(message,callback) => {
                var user = users.getUser(socket.id);

                if(user && isRealString(message.text)){
                    io.to(user.room).emit('newMessage',generateMessage( user.name, message.text));
                }
                  
callback();
                });

socket.on('createLocationMessage',(coords) => {
    var user = users.getUser(socket.id);
    if(user){
        io.to(user.room).emit('newLocationMessage',generateLocationMessage(user.name,coords.latitude, coords.longtitude));
    }

});

  socket.on('disconnect',() => {
    var user = users.removeUser(socket.id);

    if(user){
        io.to(user.room).emit('updateUserList',users.getUsersList(user.room));
        io.to(user.room).emit('newMessage',generateMessage('Admin',`${user.name} has left. `));
    }
        });

});

app.use(express.static(Publicpath));

server.listen(port,() => {
    console.log(`server running at port ${port}`);
})
