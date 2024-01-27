import { DNeoPacket } from '../../NeoSocketLib/Decorator/DNeoPacket';
import { NeoPacket } from '../../NeoSocketLib/Base/NeoPacket';
import { DKey } from '../../NeoSocketLib/Decorator/DKey';
import { MessageDTO } from './MessageDTO';

@DNeoPacket(0, 'EnterChatRoomReply')
export class EnterChatRoomReply extends NeoPacket {
  @DKey(0)
  public Messages: MessageDTO[] = [];
}
