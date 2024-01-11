import { DKey } from '../../NeoSocketLib/Decorator/DKey';
import { DNeoPacket } from '../../NeoSocketLib/Decorator/DNeoPacket';
import { NeoPacket } from '../../NeoSocketLib/Base/NeoPacket';
import { DemandPacket } from '../../NeoSocketLib/Base/DemandPacket';

@DNeoPacket()
export class EnterChatRoomDemand extends DemandPacket {
  @DKey(0)
  public UserName: string = '';
  @DKey(1)
  public Address: string = '';
}
