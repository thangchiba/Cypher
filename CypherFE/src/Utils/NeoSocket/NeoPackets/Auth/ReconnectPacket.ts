import {DNeoPacket} from '../../NeoSocketLib/Decorator/DNeoPacket';
import {NeoPacket} from "../../NeoSocketLib/Base/NeoPacket";
import {DKey} from "../../NeoSocketLib/Decorator/DKey";

@DNeoPacket(0, 'ReconnectPacket')
export class ReconnectPacket extends NeoPacket {
    @DKey(0)
    public identityId: string = "";

}
