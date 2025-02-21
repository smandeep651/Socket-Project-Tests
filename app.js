import express from 'express';
import path from 'path';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();

// Define the __dirname variable
const __dirname = path.resolve();

// Create HTTP server and pass the Express app
const httpServer = createServer(app);

// Set up the Socket.IO server
const io = new Server(httpServer);

// Serve the client HTML file when accessed via the root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'chat.html'));
});

// Variable to keep track of connected clients
let connectedClients = 0;

// Handle client connection
io.on('connection', (socket) => {
    connectedClients++;
    io.emit('client-count', connectedClients);  // Notify all clients about the new connection
    console.log(`Client connected. Total clients: ${connectedClients}`);

    // Emit a welcome message when a client connects
    socket.emit('welcome', 'Welcome to Chat Server!!!!');

    // Handle incoming messages
    socket.on('message', (chatInfo) => {
        console.log('New message:', chatInfo);
        io.emit('new-message', chatInfo);  // Broadcast the new message to all clients
    });

    // Handle client disconnection
    socket.on('disconnect', () => {
        connectedClients--;
        io.emit('client-count', connectedClients);  // Notify all clients about the updated count
        console.log(`Client disconnected. Total clients: ${connectedClients}`);
    });
});

// Broadcast server time every second
setInterval(() => {
    io.emit('server-time', new Date().toTimeString());  // Emit the current server time to clients every second
}, 1000);

// Start the HTTP server
httpServer.listen(3000, () => {
    console.log('Listening on port 3000');
});
