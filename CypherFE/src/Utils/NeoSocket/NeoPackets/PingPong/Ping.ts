import { DNeoPacket } from '../../NeoSocketLib/Decorator/DNeoPacket';
import { DemandPacket } from '../../NeoSocketLib/Base/DemandPacket';

@DNeoPacket(1, '')
export class Ping extends DemandPacket {}
