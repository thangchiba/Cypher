import { NeoPacket } from '../Base/NeoPacket';
import 'reflect-metadata';
import { CNeoPacket } from '../Cache/Packet/CNeoPacket';
import { CNeoKey } from '../Cache/Packet/CNeoKey';
import { NeoCache } from '../Cache/NeoCache'; // Import this once at the entry point of your application
export function DNeoPacket(packetTypeNumber: number = 0, packetTypeName: string = '', keyAsPropertyName: boolean = false) {
  return function (constructor: any) {
    const instance = new constructor();
    const keys: CNeoKey[] = [];
    for (const propertyName of Object.keys(instance)) {
      const keyId = Reflect.getMetadata('DKey:' + propertyName, constructor.prototype);
      if (keyId !== undefined) {
        let propertyType = typeof instance[propertyName];
        if (instance[propertyName] instanceof NeoPacket) {
          propertyType = instance[propertyName].constructor.name;
        }
        keys.push(new CNeoKey(keyId, propertyName, propertyType));
      }
    }

    if (packetTypeNumber === 0 && packetTypeName === '') packetTypeName = constructor.name;
    const cNeoPacket = new CNeoPacket(packetTypeNumber, packetTypeName, keyAsPropertyName, constructor, keys);
    NeoCache.packetByName[constructor.name] = cNeoPacket;
    NeoCache.packetByInfo[`${packetTypeNumber}${packetTypeName}`] = cNeoPacket;
  };
}
