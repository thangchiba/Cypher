import { NeoPacket } from '../../NeoSocketLib/Base/NeoPacket';
import { DNeoPacket } from '../../NeoSocketLib/Decorator/DNeoPacket';
import { ReplyPacket } from '../../NeoSocketLib/Base/ReplyPacket';

@DNeoPacket()
export class Pong extends ReplyPacket {}
