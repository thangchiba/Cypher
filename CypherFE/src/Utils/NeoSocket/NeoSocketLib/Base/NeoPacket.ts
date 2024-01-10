import { NeoPacketHeader } from './NeoPacketHeader';
import { NeoCache } from '../Cache/NeoCache';
import { v4 as uuidv4 } from 'uuid';
export class NeoPacket {
  public Header: NeoPacketHeader;
  public UniqueId: string;

  constructor() {
    this.Header = new NeoPacketHeader();
    const cNeoPacket = NeoCache.packetByName[this.constructor.name];
    this.Header.packetTypeName = cNeoPacket?.packetTypeName;
    this.Header.packetTypeNumber = cNeoPacket?.packetTypeNumber;
    this.UniqueId = uuidv4();
  }
}
