let msgValue = '';

export const sendWebsocket = (socket: WebSocket, msg: string) => {
    socket.send(msg);
    console.log('websocket sent to the server:', msg);
    msg = '';
};

export const receiveWebsocket = (socket: WebSocket) => {
    socket.addEventListener('message', (event) => {
        console.log('websocket received from the server:', event.data);
        setCallbackWebsocket(event.data);
    });
};

export const getCallbackWebsocket = () => {
    // console.log('callbackWebsocket :', msgValue);
    return msgValue;
}

export const setCallbackWebsocket = (val: any) => {
    // console.log('callbackWebsocket :', val);
    msgValue = val;
    return val;
}