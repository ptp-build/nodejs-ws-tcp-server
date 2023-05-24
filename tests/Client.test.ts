import { TcpClient, WsClient } from '../src/Service/Client';
import * as net from 'net';
const WebSocket = require('ws');

describe('Client', () => {
  it('should send message', () => {
    const mockSocket = new net.Socket();
    mockSocket.write = jest.fn(); // Mock the write method
    const client = new TcpClient('id', mockSocket);
    const data = Buffer.from('test');
    client.send(data);

    expect(mockSocket.write).toHaveBeenCalledWith(data);
  });

  it('should send message (ws)', () => {
    const mockWs = new WebSocket('ws://localhost');
    mockWs.send = jest.fn(); // Mock the send method
    const client = new WsClient('id', mockWs);
    const data = Buffer.from('test');

    client.send(data);

    expect(mockWs.send).toHaveBeenCalledWith(data);
  });
});
