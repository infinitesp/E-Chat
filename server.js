// Import necessary modules
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Initialize app and create HTTP server
const app = express();
const server = http.createServer(app);

// Initialize Socket.IO
const io = socketIo(server);

// Serve static files (like your HTML, CSS, and JS)
app.use(express.static('public'));

// Listen for a connection from a client
io.on('connection', (socket) => {
    console.log('A user connected');

    // Listen for the 'message' event from the client
    socket.on('sendMessage', (message) => {
        // Broadcast the message to all connected clients
        io.emit('receiveMessage', message);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Start the server on port 3000
server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
