export class NeoPacketHeader {
  public isDemand: boolean = false;
  public isReply: boolean = false;
  public packetTypeNumber: number = 0;
  public packetTypeName: string = '';
  public packetId: number = 0;
}
