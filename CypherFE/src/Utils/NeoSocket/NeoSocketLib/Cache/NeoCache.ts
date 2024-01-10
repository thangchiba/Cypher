import { CNeoPacket } from './Packet/CNeoPacket';
import { NeoPacket } from '../Base/NeoPacket';
import { CNeoHandler } from './CNeoHandler';
import { HandleContext } from '../Base/HandleContext';
import { IHandlerCallback } from './IHandlerCallback';
import { IHandlerMap } from './IHandlerMap';

export class NeoCache {
  static packetRegistry: { [key: number]: CNeoPacket } = {};
  static packetByName: { [key: string]: CNeoPacket } = {};
  static handleMethodByPacketNumber: { [key: number]: CNeoHandler } = {};

  static packetByInfo: { [key: string]: CNeoPacket } = {};
  static handleMethodByPacketInfo: { [key: string]: CNeoHandler } = {};
  static mapHandleCallBack: IHandlerMap = {};

  static registHandleFunction<TType extends typeof NeoPacket>(packetType: TType, callback: IHandlerCallback<InstanceType<TType>>) {
    const cNeoPacket = this.packetByName[packetType.name];
    const packetInfoKey = `${cNeoPacket.packetTypeNumber}${cNeoPacket.packetTypeName}`;
    if (!this.mapHandleCallBack[packetInfoKey]) {
      this.mapHandleCallBack[packetInfoKey] = [];
    }
    this.mapHandleCallBack[packetInfoKey].push(callback);
  }

  static unregistHandleFunction<TType extends typeof NeoPacket, TPacket extends NeoPacket>(packetType: TType, callback: IHandlerCallback<TPacket>) {
    const cNeoPacket = this.packetByName[packetType.name];
    const packetInfoKey = `${cNeoPacket.packetTypeNumber}${cNeoPacket.packetTypeName}`;
    if (this.mapHandleCallBack[packetInfoKey]) {
      this.mapHandleCallBack[packetInfoKey] = this.mapHandleCallBack[packetInfoKey].filter((cb) => cb !== callback);
    }
  }
  static registPacket(packet: new () => NeoPacket) {
    let instance = new packet();
  }

  static registPackets(packets: Array<new () => NeoPacket>) {
    packets.forEach((packet) => {
      let instance = new packet();
    });
  }

  static registHandlers(handlers: Array<new () => any>) {
    handlers.forEach((handlerClass) => {
      const instance = new handlerClass();
      this.processHandlerInstance(instance);
    });
  }

  private static processHandlerInstance(instance: any) {
    const prototype = Object.getPrototypeOf(instance);
    for (const methodName of Object.getOwnPropertyNames(prototype)) {
      const method = prototype[methodName];
      if (typeof method === 'function') {
        this.registerMethodIfHandler(instance, prototype, methodName, method);
      }
    }
  }

  private static registerMethodIfHandler(instance: any, prototype: any, methodName: string, method: Function) {
    try {
      const isHandlerMethod = Reflect.getMetadata(`CHandlerMethod-${methodName}`, prototype, methodName);
      if (!isHandlerMethod) return;

      const packetName = methodName.split('Handle')[1];
      const packetType = this.packetByName[packetName];
      const paramTypes = [packetType.construct, HandleContext];

      // const paramTypes = Reflect.getMetadata("design:paramtypes", prototype, methodName);
      // if (!paramTypes) return;
      //
      // const packetType = paramTypes.find((param: any) => NeoPacket.prototype.isPrototypeOf(param.prototype));
      // if (!packetType) return;

      this.registerHandlerMethod(instance, method, paramTypes, packetName);
    } catch (e) {
      console.log(`Error when try regist handle method : ${e}`);
    }
  }

  private static registerHandlerMethod(instance: any, method: Function, paramTypes: any, packetTypeName: string) {
    const cNeoPacket: CNeoPacket = this.packetByName[packetTypeName];

    if (!cNeoPacket) return;

    const cNeoHandler = new CNeoHandler(instance, method, paramTypes);
    const packetInfoKey = `${cNeoPacket.packetTypeNumber}${packetTypeName}`;
    if (this.handleMethodByPacketInfo[packetInfoKey]) {
      console.log(
        `WARNING: DUPLICATE HANDLER METHOD ${this.handleMethodByPacketInfo[packetInfoKey].method.name} and ${method.name} for packet: ${packetTypeName}`,
      );
    }
    // this.handleMethodByPacketNumber[cNeoPacket.packetTypeNumber] = cNeoHandler;
    this.handleMethodByPacketInfo[packetInfoKey] = cNeoHandler;
  }
}
