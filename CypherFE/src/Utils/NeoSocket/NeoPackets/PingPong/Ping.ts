import { DNeoPacket } from '../../NeoSocketLib/Decorator/DNeoPacket';
import { DemandPacket } from '../../NeoSocketLib/Base/DemandPacket';

@DNeoPacket(0, 'Ping')
export class Ping extends DemandPacket {}
