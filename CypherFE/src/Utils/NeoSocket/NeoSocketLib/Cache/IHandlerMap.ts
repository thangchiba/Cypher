import { IHandlerCallback } from './IHandlerCallback';
import { NeoPacket } from '../Base/NeoPacket';

export interface IHandlerMap {
  [key: string]: IHandlerCallback<any>[];
}
