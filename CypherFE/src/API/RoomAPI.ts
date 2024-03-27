import { EnterChatRoomDemand } from '../Utils/NeoSocket/NeoPackets/Test/EnterChatRoomDemand';
import { EnterChatRoomReply } from '../Utils/NeoSocket/NeoPackets/Test/EnterChatRoomReply';
import Client from '../Features/NeoSocket/Client';
import { MessageDTO } from '../Utils/NeoSocket/NeoPackets/Test/MessageDTO';

export async function SendEnterRoomPacket(roomName: string, enigma: string, nickName: string): Promise<MessageDTO[] | null> {
  if (!Client) return null;
  if (Client.getReadyState() !== WebSocket.OPEN) {
    await Client.connect(3000);
  }
  const enterRoomPacket = new EnterChatRoomDemand();
  enterRoomPacket.Address = roomName || '';
  enterRoomPacket.UserName = nickName || '';
  const response: EnterChatRoomReply = await Client?.demand(enterRoomPacket);
  return response.Messages;
}
