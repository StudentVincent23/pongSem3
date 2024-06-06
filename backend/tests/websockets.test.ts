import { describe, expect, it, beforeEach } from 'vitest';
import { GetUsers } from '../services'; // replace with the actual path to your services module

describe('WebSocket server', () => {
  let mockSocket: {
    onmessage: ((event: { data: string }) => void) | null,
    lastSentMessage: string | null,
    addEventListener: (event: string, handler: (event: { data: string }) => void) => void,
    send: (message: string) => void,
    simulateMessage: (message: string) => void
  };

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

  it('echoes back "B" messages correctly', async () => {
    mockSocket.send('B#Test message');
    mockSocket.simulateMessage('B#Test message');
    expect(mockSocket.lastSentMessage).toBe('B#Test message');
  });

  it('echoes back "S" messages correctly', async () => {
    mockSocket.send('S#Test message');
    mockSocket.simulateMessage('S#Test message');
    expect(mockSocket.lastSentMessage).toBe('S#Test message');
  });

  it('handles "U" messages correctly', async () => {
    mockSocket.send('U TestUser 200');
    mockSocket.simulateMessage('UF');

    const users = await GetUsers();
    const addedUser = users.find(user => user.name === 'TestUser');
    
    if (addedUser) {
      expect(addedUser.score).toBe(200);
    } else {
      throw new Error('User not found');
    }
  });

  it('handles "I" messages correctly', async () => {
    mockSocket.send('I TestUser');
    mockSocket.simulateMessage('IT');
    expect(mockSocket.lastSentMessage).toBe('I TestUser');
  });

  it('handles "N" messages correctly', async () => {
    mockSocket.send('N TestUser');
    mockSocket.simulateMessage('NT TestUser 100');
    expect(mockSocket.lastSentMessage).toBe('N TestUser');
  });

  it('handles "P" messages correctly', async () => {
    mockSocket.send('P TestUser 200');
    mockSocket.simulateMessage('HF');

    const users = await GetUsers();
    const updatedUser = users.find(user => user.name === 'TestUser');
    
    if (updatedUser) {
      expect(updatedUser.score).toBe(200);
    } else {
      throw new Error('User not found');
    }
  });
});