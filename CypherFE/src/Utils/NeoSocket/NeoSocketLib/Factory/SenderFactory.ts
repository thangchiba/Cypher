import { NeoClient } from '../NeoClient';
import { NeoPacket } from '../Base/NeoPacket';
import { NeoSerializer } from '../Serializer/NeoSerializer';

const DemandMapper: Map<number, { resolve: (value: NeoPacket) => void; reject: () => void }> = new Map();

export class SenderFactory {
  public client: NeoClient;
  private key: number = 0;

  constructor(client: NeoClient) {
    this.client = client;
  }

  public async demand(packet: NeoPacket): Promise<NeoPacket | null> {
    try {
      packet.Header.packetId = this.key;
      packet.Header.Flags.IsDemand = true;
      const sendData = NeoSerializer.serialize(packet);

      //@ts-ignore
      const tcs: {
        promise: Promise<NeoPacket>;
        resolve: (value: NeoPacket) => void;
        reject: () => void;
      } = {};

      tcs.promise = new Promise<NeoPacket>((resolve, reject) => {
        tcs.resolve = resolve;
        tcs.reject = reject;
      });

      DemandMapper.set(this.key, tcs);
      this.client.sendData(sendData);
      this.key++;

      return await tcs.promise;
    } catch (e) {
      console.log('Cannot Send Demand');
      throw e;
    }
  }

  public addReply(packet: NeoPacket) {
    const key = packet.Header.packetId || 0;
    const taskReply = DemandMapper.get(key);

    if (taskReply) {
      taskReply.resolve(packet);
      DemandMapper.delete(key);
    }
  }

  public reply(demandPacket: NeoPacket, replyPacket: NeoPacket) {
    try {
      replyPacket.Header.packetId = demandPacket.Header.packetId;
      replyPacket.Header.Flags.IsReply = true;
      const sendData = NeoSerializer.serialize(replyPacket);
      this.sendDataToClient(this.client, sendData);
    } catch (e) {
      console.log('Cannot send reply');
      throw e;
    }
  }

  public command(packet: NeoPacket): boolean {
    try {
      const sendData = NeoSerializer.serialize(packet);
      this.client.sendData(sendData);
      return true;
    } catch (e) {
      console.log(`Cannot send command. Because : ${e}`);
      return false;
    }
  }

  public commands(packets: NeoPacket[]): boolean {
    try {
      const sendData = NeoSerializer.serializeMulti(packets);
      this.client.sendData(sendData);
      return true;
    } catch (e) {
      console.log(`Cannot send commands. Because : ${e}`);
      return false;
    }
  }

  public sendDataToClients(clients: NeoClient[], sendData: Uint8Array) {
    clients.forEach((client) => {
      client.sendData(sendData);
    });
  }

  public sendDataToClient(client: NeoClient, sendData: Uint8Array) {
    client.sendData(sendData);
  }
}
