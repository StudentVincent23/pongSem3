// npx prisma studio  // om de database te bekijken
// npx ts-node controller.ts

import express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';
// import WebSocket from 'ws'; // Ensure this is the default import
import { AddUser, GetUsers, UpdateScoreOfUserById, DeleteUserById } from './services';

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

const handleMessage = async (message: string, ws: WebSocket) => {
    message = message.toString();
    if (message.startsWith('B#')) {
        ws.send(message); // Echo back to client
    } else if (message.startsWith('S#')) {
        ws.send(message); // Echo back to client
    } else if (message.startsWith('U')) { // add user
        const messageParts = message.split(' ');
        const users = await GetUsers();
        const existingUser = users.find(user => user.name === messageParts[1]);

        if (existingUser) {
            ws.send('UF');
        } else {
            await AddUser(messageParts[1], parseInt(messageParts[2]));
            ws.send('UT');
        }
    } else if (message.startsWith('I')) { // check if user exists
        const messageParts = message.split(' ');
        const users = await GetUsers();
        const existingUser = users.find(user => user.name === messageParts[1]);

        if (existingUser) {
            ws.send('IT');
        } else {
            ws.send('IF');
        }
    } else if (message.startsWith('N')) { // get user with name
        const messageParts = message.split(' ');
        const users = await GetUsers();
        const existingUser = users.find(user => user.name === messageParts[1]);

        if (existingUser) {
            const userMsgBack = `NT ${existingUser.name} ${existingUser.score} ${existingUser.id}`;
            ws.send(userMsgBack);
        } else {
            ws.send('NF');
        }
    } else if (message.startsWith('P')) { // nieuw high score aka punten
        const messageParts = message.split(' ');
        const users = await GetUsers();
        const existingUser = users.find(user => user.name === messageParts[1]);

        if (existingUser) {
            await UpdateScoreOfUserById(existingUser.id, parseInt(messageParts[2]));
            ws.send('PT');
        } else {
            ws.send('HF');
        }
    } else if (message.startsWith('D')) { // delete user
        const messageParts = message.split(' ');
        const users = await GetUsers();
        const existingUser = users.find(user => user.name === messageParts[1]);

        if (existingUser) {
            await DeleteUserById(existingUser.id);
            ws.send('DT');
        } else {
            ws.send('DF');
        }
    }
};

wss.on('connection', (ws: WebSocket) => {
    ws.on('message', (message: string) => handleMessage(message, ws));
});

const PORT = process.env.PORT || 5080;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export { server, wss, handleMessage};


