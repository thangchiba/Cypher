import { NeoPacket } from '../../NeoSocketLib/Base/NeoPacket';
import { DNeoPacket } from '../../NeoSocketLib/Decorator/DNeoPacket';
import { DKey } from '../../NeoSocketLib/Decorator/DKey';

@DNeoPacket(0, 'NewUserGreetingCommand')
export class NewUserGreetingCommand extends NeoPacket {
  @DKey(0)
  public UserName: string = '';
}
