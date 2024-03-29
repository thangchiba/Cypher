import { DKey } from '../../NeoSocketLib/Decorator/DKey';
import { DNeoPacket } from '../../NeoSocketLib/Decorator/DNeoPacket';
import { DemandPacket } from '../../NeoSocketLib/Base/DemandPacket';

@DNeoPacket(0, 'EnterChatRoomDemand')
export class EnterChatRoomDemand extends DemandPacket {
  @DKey(0)
  public UserName: string = '';
  @DKey(1)
  public Address: string = '';
}
