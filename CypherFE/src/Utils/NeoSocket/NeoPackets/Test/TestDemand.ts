import { NeoPacket } from '../../NeoSocketLib/Base/NeoPacket';
import { DNeoPacket } from '../../NeoSocketLib/Decorator/DNeoPacket';
import { DKey } from '../../NeoSocketLib/Decorator/DKey';

@DNeoPacket()
export class TestDemand extends NeoPacket {
  @DKey(0)
  public Content: string = '';
}
