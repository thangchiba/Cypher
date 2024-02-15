import { DNeoPacket } from '../../NeoSocketLib/Decorator/DNeoPacket';
import { ReplyPacket } from '../../NeoSocketLib/Base/ReplyPacket';

@DNeoPacket(0, 'Pong')
export class Pong extends ReplyPacket {}
