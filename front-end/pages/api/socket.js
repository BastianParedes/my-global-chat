

import { Server } from 'Socket.IO';

function SocketHandler(request, response) {
    if (response.socket.server.io) {
        console.log('Socket is already running')
    } else {
        console.log('Socket is initializing')
        const io = new Server(response.socket.server);
        io.on('connection', (socket) => {
            socket.on('messageFromUser', data => {
                socket.broadcast.emit('messageFromServer', data);
            });
        });

        response.socket.server.io = io;
    }
    response.end()
}

export default SocketHandler;


















// "use strict"; //npm run dev

// // require
// const express = require('express');
// const socketIo = require('socket.io')
// const path = require('path');

// const app = express();

// // settings
// app.set('port', process.env.PORT || 8080);
// const server = app.listen(app.get('port'));
// const io = socketIo(server, {
//     cors: {
//         origin: 'https://bastianparedes.com',
//         methods: ['GET']
//     }
// });


// // socket.io
// io.on('connection', (socket) => {
//     socket.on('messageFromUser', data => {
//         socket.broadcast.emit('messageFromServer', data);
//     });
// });
