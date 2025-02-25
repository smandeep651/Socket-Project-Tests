import express from 'express';
import path from 'path';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();

// Define the __dirname variable
const __dirname = path.resolve()

// Create HTTP server and pass the Express app
const httpServer = createServer(app);

// Set up the Socket.IO server with CORS enabled
const io = new Server(httpServer, {
    cors: {
        origin: "*",  // Change this to your client URL in production
        methods: ["GET", "POST"]
    }
});

// Serve the client HTML file when accessed via the root
app.get('/', (req, res) => {
    const filePath = path.join(__dirname, 'chat.html');
    
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error("Error sending file:", err.message);
            res.status(500).send("Error loading chat interface");
        }
    });
});

// Variable to keep track of connected clients
let connectedClients = 0;

// Handle client connection
io.on('connection', (socket) => {
    try {
        connectedClients++;
        io.emit('client-count', connectedClients);  // Notify all clients about the new connection
        console.log(`Client connected. Total clients: ${connectedClients}`);

        // Emit a welcome message when a client connects
        socket.emit('welcome', 'Welcome to Chat Server!!!!');

        // Handle incoming messages
        socket.on('message', (chatInfo) => {
            try {
                console.log('New message:', chatInfo);
                io.emit('new-message', chatInfo);  // Broadcast the new message to all clients
            } catch (err) {
                console.error("Error handling message:", err.message);
            }
        });

        // Handle client disconnection
        socket.on('disconnect', () => {
            try {
                connectedClients--;
                io.emit('client-count', connectedClients);  // Notify all clients about the updated count
                console.log(`Client disconnected. Total clients: ${connectedClients}`);
            } catch (err) {
                console.error("Error handling disconnect:", err.message);
            }
        });

    } catch (err) {
        console.error("Error in connection handler:", err.message);
    }
});

// Broadcast server time every second
setInterval(() => {
    try {
        io.emit('server-time', new Date().toTimeString());  // Emit the current server time to clients every second
    } catch (err) {
        console.error("Error broadcasting server time:", err.message);
    }
}, 1000);

// Start the HTTP server
const PORT = process.env.PORT || 8080;
httpServer.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

// Graceful error handling for unexpected crashes
process.on('uncaughtException', (err) => {
    console.error("Uncaught Exception:", err.message);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error("Unhandled Promise Rejection:", reason);
});
