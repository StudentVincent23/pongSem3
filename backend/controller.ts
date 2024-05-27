import express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';
import { AddUser, GetUsers, UpdateScoreOfUserById } from './services';
// npx prisma studio  // om de database te bekijken
// npx ts-node controller.ts
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ noServer: true });

server.on('upgrade', (request, socket, head) => {
    if (request.url === '/websocket' && request.headers['upgrade'] === 'websocket') {
        wss.handleUpgrade(request, socket, head, (ws) => {
            wss.emit('connection', ws, request);
        });
    } else {
        socket.destroy();
    }
});

wss.on('connection', (ws: WebSocket) => {
    ws.on('message', async (message: String) => {
        message = message.toString();
        if (message[0] === 'B' && message[1] === '#') {
            ws.send(message); // Echo back to client
        } else if (message[0] === 'S' && message[1] === '#') {
            ws.send(message); // Echo back to client
        } else if(message[0] === 'U'){ // add user
            const messageParts = message.split(' ');
            const users = await GetUsers(); // Get the list of users using await since getUsers is an async function
            const existingUser = users.find(user => user.name === messageParts[1]);

            if (existingUser) {
                ws.send('UF');
            } else {
                AddUser(messageParts[1], parseInt(messageParts[2]));
            }
        } else if(message[0] === 'I'){ // check if user exists
            const messageParts = message.split(' ');
            const users = await GetUsers(); // Get the list of users using await since getUsers is an async function
            const existingUser = users.find(user => user.name === messageParts[1]);

            if (existingUser) {
                ws.send('IT');
            } else {
                ws.send('IF');
            }
        } else if(message[0] === 'N'){ // get user with name
            const messageParts = message.split(' ');
            const users = await GetUsers(); // Get the list of users using await since getUsers is an async function
            const existingUser = users.find(user => user.name === messageParts[1]);

            if (existingUser) {
                var userMsgBack = "NT " + existingUser.name + " " + existingUser.score + " " + existingUser.id;
                ws.send(userMsgBack);
            } else {
                ws.send('NF');
            }
        } else if(message[0] === 'P'){ // nieuw high score aka punten
            const messageParts = message.split(' ');
            const users = await GetUsers(); // Get the list of users using await since getUsers is an async function
            const existingUser = users.find(user => user.name === messageParts[1]);

            if (existingUser) {
                UpdateScoreOfUserById(existingUser.id, parseInt(messageParts[2]));
            } else {
                ws.send('HF');
            }
        }
    });
});

const PORT = process.env.PORT || 5080;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});



