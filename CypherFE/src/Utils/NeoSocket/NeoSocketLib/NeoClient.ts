import { NeoPacket } from './Base/NeoPacket';
import { PacketProcessFactory } from './Factory/PacketProcessFactory';
import { PacketHandleFactory } from './Factory/PacketHandleFactory';
import { SenderFactory } from './Factory/SenderFactory';
import { DemandPacket } from './Base/DemandPacket';
import { v4 as uuidv4 } from 'uuid';

type DisconnectCallback = () => void;
type ConnectCallBack = () => void;
type OnHandle = (packet: NeoPacket) => void;

export class NeoClient {
  public clientId: string = '';
  public socket: WebSocket;
  private count: number = 0;
  public packetHandleFactory: PacketHandleFactory;
  public senderFactory: SenderFactory;
  public packetProcessFactory: PacketProcessFactory;
  public onDisconnect: DisconnectCallback[] = [];
  public onConnect: ConnectCallBack[] = [];
  public onHandle: OnHandle[] = [];

  constructor(url: string) {
    const solvedURL = this.solveURL(url);
    this.socket = new WebSocket(solvedURL);
    this.registerEventListeners();
    this.senderFactory = new SenderFactory(this);
    this.packetProcessFactory = new PacketProcessFactory(this);
    this.packetHandleFactory = new PacketHandleFactory(this);
    this.clientId = uuidv4();
  }

  private solveURL(inputUrl: string): string {
    const neoskRegex = /^neosk:\/\//;
    const neosksRegex = /^neosks:\/\//;

    if (!neoskRegex.test(inputUrl) && !neosksRegex.test(inputUrl)) {
      throw new Error("Invalid URL scheme. URL must start with 'neosk://' or 'neosks://'.");
    }

    return inputUrl.replace(neoskRegex, 'ws://').replace(neosksRegex, 'wss://');
  }

  private registerEventListeners() {
    this.socket.addEventListener('open', () => {
      console.log('Connected to the WebSocket server');
      this.onConnect.forEach((callback) => callback());
    });

    this.socket.addEventListener('message', async (event) => {
      const buffer = await event.data.arrayBuffer();
      this.receivePacket(buffer);
    });

    this.socket.addEventListener('error', (event) => {
      console.error('WebSocket Error:', event);
    });

    this.socket.addEventListener('close', (event) => {
      this.dispose();
    });
  }

  public command(packet: NeoPacket) {
    try {
      this.senderFactory.command(packet);
    } catch (error) {
      console.error('Error sending command:', error);
      throw error; // Rethrowing the error to be handled by the caller
    }
  }

  public commands(packets: NeoPacket[]) {
    try {
      this.senderFactory.commands(packets);
    } catch (error) {
      console.error('Error sending commands:', error);
      throw error; // Rethrowing the error to be handled by the caller
    }
  }

  public demand(packet: NeoPacket, maxWaitTime: number = 30000): Promise<any> {
    const timeout = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Request timed out')), maxWaitTime);
    });

    try {
      return Promise.race([this.senderFactory.demand(packet), timeout]);
    } catch (error) {
      console.error('Error with demand:', error);
      throw error;
    }
  }

  public send(packet: NeoPacket, maxWaitTime: number = 3000): any {
    if (packet instanceof DemandPacket) {
      return this.senderFactory.demand(packet);
    } else {
      this.senderFactory.command(packet);
      return null;
    }
  }

  public sendData(data: Uint8Array) {
    const dataLength = data.length;
    const buffer = new ArrayBuffer(2 + dataLength);
    const view = new DataView(buffer);

    view.setUint16(0, dataLength, true);
    new Uint8Array(buffer, 2).set(new Uint8Array(data));

    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(buffer);
    } else {
      console.error('Cannot send message, connection is not open');
      throw new Error('Cannot send data, connection is not open');
    }
  }

  connect(maxWaitTime: number): Promise<void> {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        if (this.socket.readyState !== WebSocket.OPEN) {
          reject(new Error('Connection timed out.'));
        }
      }, maxWaitTime);

      this.socket.onopen = () => {
        clearTimeout(timeout);
        resolve();
      };

      this.socket.onerror = () => {
        clearTimeout(timeout);
        reject(new Error('Error occurred while connecting.'));
      };
    });
  }

  public closeConnection() {
    this.dispose();
  }

  private dispose() {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.close();
      this.onDisconnect.forEach((callback) => callback());
    }
  }

  private receivePacket(data: ArrayBuffer) {
    this.packetHandleFactory.handle(new Uint8Array(data.slice(2)));
  }

  public getReadyState() {
    return this.socket?.readyState;
  }

  public reconnect() {
    this.closeConnection();
    this.socket = new WebSocket(this.socket.url);
    this.registerEventListeners();
    this.clientId = uuidv4();
  }
}
