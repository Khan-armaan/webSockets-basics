import express from 'express'
import { WebSocketServer, WebSocket } from 'ws'
 
const app = express()  // http server using the express library
const httpServer = app.listen(8080) 

const wss = new WebSocketServer({ server: httpServer }); // create a websocket server 

let userCount = 0
wss.on('connection', function connection(socket) {       // the main websocket part which would remain same for express or the http 
  socket.on('error',(err) => console.log(err)); // event registererd 
console.log(socket)
  socket.on('message', function message(data, isBinary) {
    wss.clients.forEach(function each(client) {  // send data to every client
      if (client.readyState === WebSocket.OPEN) {
        client.send(data , {binary: isBinary});
      }
    });
  });
  console.log("User connected", ++userCount)
  socket.send('Hello! Message From Server!!');
});

