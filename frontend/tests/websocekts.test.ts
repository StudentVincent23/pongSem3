import { describe, it, expect, beforeEach } from 'vitest';
import { sendWebsocket, receiveWebsocket, getCallbackWebsocket, setCallbackWebsocket } from '../src/websocket';

describe('Websocket Functions', () => {
  let mockSocket;

  beforeEach(() => {
    mockSocket = {
      onmessage: null,
      lastSentMessage: null,
      addEventListener: function(event, handler) {
        if (event === 'message') {
          this.onmessage = handler;
        }
      },
      send: function(message) {
        this.lastSentMessage = message;
      },
      simulateMessage: function(message) {
        if (this.onmessage) {
          this.onmessage({ data: message });
        }
      }
    };
  });

  it('sends a message through the websocket', () => {
    const message = 'Test message';
    sendWebsocket(mockSocket, message);
    expect(mockSocket.lastSentMessage).toEqual(message);
  });

  it('sets up a message listener on the websocket', () => {
    receiveWebsocket(mockSocket);
    expect(typeof mockSocket.onmessage).toBe('function');
  });

  it('handles a message from the websocket', () => {
    const testMessage = 'Test message';
    let receivedMessage = null;

    receiveWebsocket(mockSocket);
    mockSocket.onmessage = (event) => {
      receivedMessage = event.data;
    };

    mockSocket.simulateMessage(testMessage);
    expect(receivedMessage).toBe(testMessage);
  });

  it('gets callback value from websocket', () => {
    // Set a value for the callback
    const value = 'Test value';
    setCallbackWebsocket(value);

    // Get the callback value
    const retrievedValue = getCallbackWebsocket();

    // Assert that the retrieved value matches the set value
    expect(retrievedValue).toBe(value);
  });

  it('sets callback value for websocket', () => {
    // Set a value for the callback
    const valueold = 'old Test value';
    const value = 'Test value';
    
    setCallbackWebsocket(valueold);
    const retrievedValueold = getCallbackWebsocket();
    setCallbackWebsocket(value);
    const retrievedValue = getCallbackWebsocket();
    
    expect(retrievedValueold).toBe(valueold);
    expect(retrievedValue).toBe(value);
  });
});


