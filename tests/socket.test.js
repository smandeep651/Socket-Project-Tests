const io = require('socket.io-client');

const socketURL = 'http://localhost:8080';

describe('Socket.IO Server Tests', () => {
    let socket;

    beforeAll((done) => {
        socket = io(socketURL, {
            reconnection: false,
            timeout: 7000, // Slightly increased timeout for connection
        });

        socket.once('connect', () => {
            console.log('Connected to the server');
            done();
        });

        socket.on('connect_error', (err) => {
            console.error('Connection Error:', err.message);
            done.fail(new Error('Could not connect to server'));
        });
    });

    afterAll(() => {
        if (socket.connected) {
            socket.disconnect();
        }
        console.log('Disconnected from the server');
    });

    test('should successfully connect to the server', () => {
        expect(socket.connected).toBe(true);
    });

    test('should update client count when a new client connects', (done) => {
        const newSocket = io(socketURL);

        newSocket.once('client-count', (count) => {
            expect(count).toBeGreaterThan(0);
            newSocket.disconnect();
            done();
        });
    });

    test('should send and receive messages', (done) => {
        const testMessage = { user: 'TestUser', text: 'Hello, world!' };

        socket.emit('message', testMessage);

        socket.once('new-message', (message) => {
            expect(message).toEqual(testMessage);
            done();
        });
    });

    test('should update client count when a client disconnects', (done) => {
        const newSocket = io(socketURL);

        newSocket.on('connect', () => {
            newSocket.disconnect();
        });

        socket.once('client-count', (count) => {
            expect(count).toBeGreaterThanOrEqual(0);
            done();
        });
    });

    test('should receive server time updates', (done) => {
        socket.once('server-time', (time) => {
            expect(typeof time).toBe('string'); // Ensure time is a string
            expect(time).toMatch(/\d{2}:\d{2}:\d{2}/); // Basic format check (HH:MM:SS)
            done();
        });
    });
});
