import { HeaderFlags } from './HeaderFlags';

export class NeoPacketHeader {
  public Flags: HeaderFlags;
  public packetTypeNumber: number;
  public packetTypeName: string;
  public packetId: number | null;
  public statusCode: number | null;
  public message: string | null;

  constructor() {
    this.Flags = new HeaderFlags();
    this.packetTypeNumber = 0;
    this.packetTypeName = '';
    this.packetId = null;
    this.statusCode = null;
    this.message = null;
  }

  public isDefault(): boolean {
    return this.packetTypeNumber === 0 && this.packetTypeName === '' && this.packetId === null && this.statusCode === null && this.message === null;
  }
}
