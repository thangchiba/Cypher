import { NeoPacket } from '../../NeoSocketLib/Base/NeoPacket';
import { DNeoPacket } from '../../NeoSocketLib/Decorator/DNeoPacket';
import { DKey } from '../../NeoSocketLib/Decorator/DKey';
import { DemandPacket } from '../../NeoSocketLib/Base/DemandPacket';

@DNeoPacket(0, 'TestCommand')
export class TestDemand extends DemandPacket {
  @DKey(0)
  public Content: string = '';
}
