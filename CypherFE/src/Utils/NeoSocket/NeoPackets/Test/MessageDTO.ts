import { DKey } from '../../NeoSocketLib/Decorator/DKey';
import { DNeoPacket } from '../../NeoSocketLib/Decorator/DNeoPacket';
import { NeoPacket } from '../../NeoSocketLib/Base/NeoPacket';
@DNeoPacket()
export class MessageDTO extends NeoPacket {
  @DKey(0)
  public UserName: string = '';
  @DKey(1)
  public Content: string = '';
  @DKey(2)
  public CreatedAt: Date = new Date();
}
