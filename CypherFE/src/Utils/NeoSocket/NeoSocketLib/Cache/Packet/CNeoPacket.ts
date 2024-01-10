import { CNeoKey } from './CNeoKey';

export class CNeoPacket {
  packetTypeNumber: number = 0;
  packetTypeName: string = '';
  keyAsPropertyName: boolean = false;
  construct: any;
  keys: CNeoKey[];

  constructor(packetType: number, packetTypeName: string, keyAsPropertyName: boolean, construct: any, keys: CNeoKey[]) {
    this.packetTypeNumber = packetType;
    this.packetTypeName = packetTypeName;
    this.keyAsPropertyName = keyAsPropertyName;
    this.construct = construct;
    this.keys = keys;
  }
}
