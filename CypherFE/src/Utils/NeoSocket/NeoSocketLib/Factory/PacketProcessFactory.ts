import { SenderFactory } from './SenderFactory';
import { NeoPacket } from '../Base/NeoPacket';
import { NeoClient } from '../NeoClient';
import { HandleContext } from '../Base/HandleContext';
import { NeoCache } from '../Cache/NeoCache'; // Import your SenderFactory

export class PacketProcessFactory {
  private client: NeoClient;
  private senderFactory: SenderFactory;

  constructor(client: NeoClient) {
    this.client = client;
    this.senderFactory = client.senderFactory;
  }

  public processReply(packet: NeoPacket): void {
    this.senderFactory.addReply(packet);
  }

  public async processPacket(client: NeoClient, packet: NeoPacket) {
    try {
      const replyPackets = await this.invokePacketHandler(packet, client);
      if (!replyPackets) return;
      for (const replyPacket of replyPackets) {
        if (!replyPacket) continue;
        if (replyPacket.Header.Flags.IsReply) {
          this.senderFactory.addReply(replyPacket);
        }
      }
    } catch (ex) {
      console.log(`An error occurred when process Packet: ${ex}`);
    }
  }

  private async invokePacketHandler(packet: NeoPacket, client: NeoClient): Promise<any> {
    const context: HandleContext = {
      packet,
      client,
    };
    const packetInfoKey = `${packet.Header.packetTypeNumber}${packet.Header.packetTypeName}`;
    const callBacks = NeoCache.mapHandleCallBack[packetInfoKey];
    if (!callBacks || callBacks.length === 0) {
      // Handle the case where cNeoHandler is not found
      return null;
    }
    const replies: any[] = [];
    for (const callBack of callBacks) {
      replies.push(callBack(packet, context));
    }

    return replies;
  }
}
