const io = require('socket.io-client');
const socketURL = 'http://localhost:3000';  // The server URL you're testing

describe('Socket.IO connection tests', () => {
    let socket;

    // Establish socket connection before any tests
    beforeAll((done) => {
        socket = io(socketURL);  // Connect to the server
        socket.on('connect', () => { 
            console.log('Connected to the server');  // You can log for debugging purposes
            done();  // Call done to signal that the connection was successful
        });
    });

    // Disconnect socket after all tests are done
    afterAll(() => {
        socket.disconnect();  // Ensure to disconnect after tests complete
        console.log('Disconnected from the server');
    });

    // Test to check if socket is successfully connected
    test('should successfully connect to the server', () => {
        // Assert that the socket is connected
        expect(socket.connected).toBe(true);
    });

    // Test to check if we receive the welcome message from the server
    test('should receive the welcome message', (done) => {
        jest.setTimeout(30000);  // Increase timeout for this test

        socket.on('welcome', (message) => {
            // Check if the message received is as expected
            expect(message).toBe('Welcome to Chat Server!!!!');
            done();  // Ensure done is called to signal test completion
        });
    });
});
