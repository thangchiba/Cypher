import { DNeoPacket } from '../../NeoSocketLib/Decorator/DNeoPacket';
import { NeoPacket } from '../../NeoSocketLib/Base/NeoPacket';
import { DKey } from '../../NeoSocketLib/Decorator/DKey';

@DNeoPacket()
export class IdentityReply extends NeoPacket {
  @DKey(0)
  public isSuccess: boolean = false;
}
