import { NeoPacket } from './NeoPacket';
import { NeoClient } from '../NeoClient';

export class HandleContext {
  public packet: NeoPacket;
  public client: NeoClient;

  constructor(packet: NeoPacket, client: NeoClient) {
    this.packet = packet;
    this.client = client;
  }
}
