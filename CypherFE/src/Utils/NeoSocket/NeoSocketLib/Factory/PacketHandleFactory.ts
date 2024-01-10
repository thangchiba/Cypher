import { NeoSerializer } from '../Serializer/NeoSerializer';
import { NeoClient } from '../NeoClient';
import { PacketProcessFactory } from './PacketProcessFactory';

export class PacketHandleFactory {
  private client: NeoClient;
  private packetProcessFactory: PacketProcessFactory;

  constructor(client: NeoClient) {
    this.client = client;
    this.packetProcessFactory = client.packetProcessFactory;
  }

  async handle(buffer: Uint8Array) {
    try {
      const receivedPackets = NeoSerializer.deserializeMulti(buffer);
      for (const receivedPacket of receivedPackets) {
        this.client.onHandle.forEach((handle) => handle(receivedPacket));
        if (receivedPacket.Header.isReply) {
          this.packetProcessFactory.processReply(receivedPacket);
          continue;
        }

        const packetTypeNumber = receivedPacket.Header.packetTypeNumber;
        await this.packetProcessFactory.processPacket(this.client, receivedPacket);
      }
    } catch (e: any) {
      console.log(`Exception when handling packet: ${e.stack}`);
    }
  }
}
