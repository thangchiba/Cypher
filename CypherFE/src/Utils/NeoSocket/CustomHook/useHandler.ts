import { useEffect } from 'react';
import { NeoCache } from '../NeoSocketLib/Cache/NeoCache';
import { IHandlerCallback } from '../NeoSocketLib/Cache/IHandlerCallback';
import { NeoPacket } from '../NeoSocketLib/Base/NeoPacket';

function useHandler<TType extends typeof NeoPacket>(packetType: TType, handler: IHandlerCallback<InstanceType<TType>>, depends: [] = []) {
  useEffect(() => {
    console.log('register handler ' + packetType.name);
    NeoCache.registHandleFunction(packetType, handler);
    return () => {
      NeoCache.unregistHandleFunction(packetType, handler);
    };
  }, depends);
}

export default useHandler;
