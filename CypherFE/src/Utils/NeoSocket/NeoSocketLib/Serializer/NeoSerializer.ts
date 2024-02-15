import { decodeMulti, encode } from '@msgpack/msgpack';
import { NeoPacket } from '../Base/NeoPacket';
import { CNeoKey } from '../Cache/Packet/CNeoKey';
import { CNeoPacket } from '../Cache/Packet/CNeoPacket';
import { NeoPacketHeader } from '../Base/NeoPacketHeader';
import { NeoCache } from '../Cache/NeoCache';
import { HeaderFlags } from '../Base/HeaderFlags';

export class NeoSerializer {
  public static serialize(packet: NeoPacket): Uint8Array {
    const packetTypeName = packet.constructor.name || packet?.Header?.packetTypeName;
    const neoPacketCache = NeoCache.packetByName[packetTypeName];
    const headerArray = this.serializeHeader(packet.Header) || [];
    const packetData = this.serializePacket(packet, neoPacketCache);
    const packetArray = encode(packetData);
    return new Uint8Array([...headerArray, ...packetArray]);
  }

  public static serializeMulti(packets: NeoPacket[]): Uint8Array {
    let serializedData: number[] = [];

    packets.forEach((packet) => {
      const packetTypeName = packet.constructor.name || packet?.Header?.packetTypeName;
      const neoPacketCache = NeoCache.packetByName[packetTypeName];
      const headerArray = this.serializeHeader(packet.Header) || new Uint8Array();
      const packetData = this.serializePacket(packet, neoPacketCache);
      const packetArray = encode(packetData);
      serializedData.push(...Array.from(headerArray), ...Array.from(packetArray));
    });

    return new Uint8Array(serializedData);
  }

  private static serializePacket(packet: NeoPacket, packetCache: CNeoPacket): any[] {
    const keys = packetCache.keys;
    const dataArray: any[] = [];
    for (const keyCache of keys) {
      const { keyId, propertyName } = keyCache;
      // @ts-ignore
      const value = packet[propertyName];
      const nestedType = NeoCache.packetByName[value?.Header?.packetTypeName];
      if (nestedType) {
        dataArray[keyId] = this.serializePacket(value, nestedType);
      } else {
        dataArray[keyId] = value;
      }
    }
    return dataArray;
  }

  public static deserialize(data: ArrayBuffer): NeoPacket | null {
    const arrayData: any[] = Array.from(decodeMulti(data));
    const header = this.deserializeHeader(arrayData[0]);
    const packetInfoKey = `${header.packetTypeNumber}${header.packetTypeName}`;
    const neoPacketCache = NeoCache.packetByInfo[packetInfoKey];
    if (!neoPacketCache) return null;
    const PacketClass = neoPacketCache.construct;
    const result = new PacketClass();
    result.Header = header;
    return this.deserializePacket(result, arrayData[1], neoPacketCache.keys);
  }

  public static deserializeMulti(data: ArrayBuffer): NeoPacket[] {
    const arrayData: any[] = Array.from(decodeMulti(data));
    const packets: NeoPacket[] = [];
    for (let i = 0; i < arrayData.length; i += 2) {
      const header = this.deserializeHeader(arrayData[i]);
      const packetInfoKey = `${header.packetTypeNumber}${header.packetTypeName}`;
      const neoPacketCache = NeoCache.packetByInfo[packetInfoKey];
      if (!neoPacketCache) console.error(`Packet ${header.packetTypeNumber}${header.packetTypeName} not regist yet!!!`);
      const PacketClass = neoPacketCache.construct;
      const packet = this.deserializePacket(new PacketClass(), arrayData[i + 1], neoPacketCache.keys);
      packet.Header = header;
      packets.push(packet);
    }
    return packets;
  }

  private static deserializePacket(packet: NeoPacket, dataArray: any[], keys: CNeoKey[]): NeoPacket {
    for (const keyCache of keys) {
      const { keyId, propertyName, propertyType } = keyCache;
      // @ts-ignore
      if (packet[propertyName] instanceof NeoPacket) {
        const cNeoPacket = NeoCache.packetByName[propertyType];
        // @ts-ignore
        packet[propertyName] = this.deserializePacket(new cNeoPacket.construct(), dataArray[keyId], cNeoPacket.keys);
      } else {
        // @ts-ignore
        packet[propertyName] = dataArray[keyId];
      }
    }
    return packet;
  }

  public static serializeHeader(header: NeoPacketHeader): Uint8Array {
    let dataArray: Array<any> = [];

    // Serialize the flag byte
    let flagByte = HeaderFlags.Serialize(header.Flags);
    dataArray.push(flagByte);

    dataArray.push(header.packetTypeNumber);
    dataArray.push(header.packetTypeName);

    if (header.Flags.IsDemand || header.Flags.IsReply) {
      dataArray.push(header.packetId ?? 0); // Replace null with default value
    }
    if (header.Flags.IsReply) {
      dataArray.push(header.statusCode ?? 0); // Replace null with default value
      dataArray.push(header.message ?? ''); // Replace null with empty string
    }

    return new Uint8Array(encode(dataArray)); // Using your encoding logic
  }

  public static deserializeHeader(data: any[]): NeoPacketHeader {
    const header = new NeoPacketHeader();
    let index = 0;

    let flags = HeaderFlags.Deserialize(data[index++]);
    header.Flags = flags;

    header.packetTypeNumber = data[index++];
    header.packetTypeName = data[index++];

    if (flags.IsDemand || flags.IsReply) {
      header.packetId = data[index++];
    }
    if (flags.IsReply) {
      header.statusCode = data[index++];
      header.message = data[index++];
    }

    return header;
  }
}
