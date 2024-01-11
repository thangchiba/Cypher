// import { decode, encode, ExtensionCodec } from '@msgpack/msgpack';
// import { NeoPacketHeader } from '../Base/NeoPacketHeader';
//
// export const extensionCodec = new ExtensionCodec();
//
// extensionCodec.register({
//   type: 0,
//   encode(input: unknown): Uint8Array | null {
//     if (input instanceof NeoPacketHeader) {
//       const dataArray = serializeHeader(input);
//       return encode(dataArray);
//     } else {
//       return null;
//     }
//   },
//   decode(data: Uint8Array): NeoPacketHeader {
//     const dataArray = decode(data) as any[];
//     return deserializeHeader(dataArray) as NeoPacketHeader;
//   },
// });
//
// function serializeHeader(header: NeoPacketHeader): any[] {
//   return [header.isDemand, header.isReply, header.packetTypeNumber, header.packetId];
// }
//
// function deserializeHeader(dataArray: any[]): NeoPacketHeader {
//   const header = new NeoPacketHeader();
//   header.isDemand = dataArray[0];
//   header.isReply = dataArray[1];
//   header.packetTypeNumber = dataArray[2];
//   header.packetId = dataArray[3];
//   return header;
// }
