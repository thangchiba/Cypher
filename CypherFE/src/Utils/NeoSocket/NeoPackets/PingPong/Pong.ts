import { DNeoPacket } from '../../NeoSocketLib/Decorator/DNeoPacket';
import { ReplyPacket } from '../../NeoSocketLib/Base/ReplyPacket';

@DNeoPacket(2, '')
export class Pong extends ReplyPacket {}
