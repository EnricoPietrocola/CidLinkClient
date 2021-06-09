const path = require('path');
const io = require("socket.io-client");

let address = "http://127.0.0.1:5000";
let ioClient = io.connect(address);

let roomName;
let password = "";

function setRoomName(msg){
    roomName = msg;
    ioClient.emit('join', roomName, password)
}

function setPassword (msg){
    password = msg
}

function connect(newAddress){
    address = newAddress
    ioClient = io.connect(null, {'force new connection': false}); //disconnect, io.disconnect() is been buggy for long in the history of socketio apparently
    ioClient = io.connect(address)
    makeClient()
}

function send (msg) {
    ioClient.emit("datachannel", roomName, msg);
}

function makeClient() {
    ioClient.on('datachannel', (msg) => {
        Max.post(msg)
        Max.outlet(msg)

    })

    ioClient.on('objchannel', (msg) => {
        Max.setDict(dictIdIn, msg)
        Max.outlet("bang")
    })

    ioClient.on('systemchannel', (msg) => {
        Max.post(msg)
        Max.outlet(msg)
    })

    ioClient.on("disconnect", (msg) => {
        if (msg !== undefined && msg !== null) {
            if (isJson(msg)) {
                msg = JSON.parse(msg)
            } else {

            }
        }
    })

    function isJson(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }
}