"use strict"; //npm run dev

// require
const express = require('express');
const socketIo = require('socket.io')

const app = express();

// settings
app.set('port', process.env.PORT || 8080);
const server = app.listen(app.get('port'));
const io = socketIo(server, {
    cors: {
        origin: '*',
        methods: ['GET']
    }
});


// socket.io
io.on('connection', (socket) => {
    socket.on('messageFromUser', data => {
        socket.broadcast.emit('messageFromServer', data);
    });
});




