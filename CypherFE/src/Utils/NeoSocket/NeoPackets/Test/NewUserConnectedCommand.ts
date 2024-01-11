import { MessageDTO } from './MessageDTO';
import { DKey } from '../../NeoSocketLib/Decorator/DKey';
import { DNeoPacket } from '../../NeoSocketLib/Decorator/DNeoPacket';
import { NeoPacket } from '../../NeoSocketLib/Base/NeoPacket';

@DNeoPacket()
export class NewUserConnectedCommand extends NeoPacket {
  @DKey(0)
  public Messages: MessageDTO[] = [];
}
