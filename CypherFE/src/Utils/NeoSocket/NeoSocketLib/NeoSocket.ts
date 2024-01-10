import { cachePackets } from '../Config/PacketList';

export class NeoSocket {
  static setup(): void {
    cachePackets();
  }
}
