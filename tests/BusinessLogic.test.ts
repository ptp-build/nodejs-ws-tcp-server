import { BusinessLogic } from '../src/Service/BusinessLogic';
import { TcpClient, WsClient } from '../src/Service/Client';
import * as net from 'net';
const WebSocket = require('ws');

describe('BusinessLogic', () => {
  let mockSocketWrite: jest.Mock;

  beforeEach(() => {
    mockSocketWrite = jest.fn();
  });

  it('should process message with client IDs', () => {
    const mockSocket1 = new net.Socket();
    mockSocket1.write = mockSocketWrite;
    const client1 = new TcpClient('client1', mockSocket1);

    const mockWs2 = new WebSocket('ws://localhost');
    const client2 = new WsClient('client2', mockWs2);

    const businessLogic1 = new BusinessLogic();
    const businessLogic2 = new BusinessLogic();
    businessLogic1.setClient(client1);
    businessLogic2.setClient(client2);
    businessLogic1.processMessage(Buffer.from('test'));
    businessLogic2.processMessage(Buffer.from('test'));
    expect(mockSocketWrite).toHaveBeenCalledTimes(1);
  });
});
