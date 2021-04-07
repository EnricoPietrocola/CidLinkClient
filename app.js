//this basic client sends a message to the main server, which could then broadcast to ALL other users (if set to)

const io = require("socket.io-client");
const ioClient = io.connect("http://127.0.0.1:5000");
const roomName = 'roomTest';

ioClient.emit('join', roomName)
//ioClient.emit('echo', 'hello world');

setTimeout(() => ioClient.emit('datachannel', roomName, "hello world"), 1000);

ioClient.on('echo', (msg)=> {
    console.log(msg)
})