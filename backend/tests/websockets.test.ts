import { describe, expect, it } from 'vitest';
import WebSocket from 'ws';
import { GetUsers } from '../services'; // replace with the actual path to your services module

describe('WebSocket server', () => {
  it('echoes back "B" messages correctly', async () => {
    const ws = new WebSocket('ws://localhost:5080/websocket');

    ws.on('open', () => {
      ws.send('B#Test message');
    });

    ws.on('message', (message) => {
      expect(message).toBe('B#Test message'); // Check that the server echoed back the message
    });
  });

  it('echoes back "S" messages correctly', async () => {
    const ws = new WebSocket('ws://localhost:5080/websocket');

    ws.on('open', () => {
      ws.send('S#Test message');
    });

    ws.on('message', (message) => {
      expect(message).toBe('S#Test message'); // Check that the server echoed back the message
    });
  });

  it('handles "U" messages correctly', async () => {
    const ws = new WebSocket('ws://localhost:5080/websocket');

    ws.on('open', () => {
      ws.send('U TestUser 100');
    });

    ws.on('message', async (message) => {
        expect(message).toBe('UF'); // Check that the server responded with 'UF'
      
        const users = await GetUsers();
        const addedUser = users.find(user => user.name === 'TestUser');
        
        if (addedUser) {
          expect(addedUser.score).toBe(100); // Check that the user's score is correct
        } else {
          throw new Error('User not found');
        }
    });
  });

  it('handles "I" messages correctly', async () => {
    const ws = new WebSocket('ws://localhost:5080/websocket');

    ws.on('open', () => {
      ws.send('I TestUser');
    });

    ws.on('message', (message) => {
      expect(message).toBe('IT'); // Check that the server responded with 'IT'
    });
  });

  it('handles "N" messages correctly', async () => {
    const ws = new WebSocket('ws://localhost:5080/websocket');

    ws.on('open', () => {
      ws.send('N TestUser');
    });

    ws.on('message', (message) => {
      const messageStr = message.toString();
      const [prefix, name, score, id] = messageStr.split(' ');
      expect(prefix).toBe('NT'); // Check that the server responded with 'NT'
      expect(name).toBe('TestUser'); // Check that the user's name is correct
      expect(score).toBe('100'); // Check that the user's score is correct
      // Check the id if necessary
    });
  });

  it('handles "P" messages correctly', async () => {
    const ws = new WebSocket('ws://localhost:5080/websocket');

    ws.on('open', () => {
      ws.send('P TestUser 200');
    });

    ws.on('message', async (message) => {
      expect(message).toBe('HF'); // Check that the server responded with 'HF'

      const users = await GetUsers();
      const updatedUser = users.find(user => user.name === 'TestUser');
      
      if (updatedUser) {
        expect(updatedUser.score).toBe(200); // Check that the user's score was updated
      } else {
        throw new Error('User not found');
      }
    });
  });
});