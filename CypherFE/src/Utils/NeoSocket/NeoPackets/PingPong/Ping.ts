import { NeoPacket } from '../../NeoSocketLib/Base/NeoPacket';
import { DNeoPacket } from '../../NeoSocketLib/Decorator/DNeoPacket';
import { DemandPacket } from '../../NeoSocketLib/Base/DemandPacket';

@DNeoPacket()
export class Ping extends DemandPacket {}
