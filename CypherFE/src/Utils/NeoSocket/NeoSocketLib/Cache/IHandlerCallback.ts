import { NeoPacket } from '../Base/NeoPacket';
import { HandleContext } from '../Base/HandleContext';

export interface IHandlerCallback<TPacket extends NeoPacket> {
  (packet: TPacket, context: HandleContext): NeoPacket | void;
}
