"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ws_1 = require("ws");
const app = (0, express_1.default)(); // http server using the express library
const httpServer = app.listen(8080);
const wss = new ws_1.WebSocketServer({ server: httpServer }); // create a websocket server 
let userCount = 0;
wss.on('connection', function connection(socket) {
    socket.on('error', (err) => console.log(err)); // event registererd 
    console.log(socket);
    socket.on('message', function message(data, isBinary) {
        wss.clients.forEach(function each(client) {
            if (client.readyState === ws_1.WebSocket.OPEN) {
                client.send(data, { binary: isBinary });
            }
        });
    });
    console.log("User connected", ++userCount);
    socket.send('Hello! Message From Server!!');
});
