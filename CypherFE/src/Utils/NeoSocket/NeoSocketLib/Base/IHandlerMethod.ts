import { HandleContext } from './HandleContext';
import { NeoPacket } from './NeoPacket';

export interface IHandlerMethod<Type extends NeoPacket> {
  (arg: Type, context: HandleContext): Type | void;
}
