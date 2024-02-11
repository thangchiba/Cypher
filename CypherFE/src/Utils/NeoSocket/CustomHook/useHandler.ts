import { useEffect } from 'react';
import { NeoCache } from '../NeoSocketLib/Cache/NeoCache';
import { IHandlerCallback } from '../NeoSocketLib/Cache/IHandlerCallback';
import { NeoPacket } from '../NeoSocketLib/Base/NeoPacket';

function useHandler<TType extends typeof NeoPacket>(packetType: TType, handler: IHandlerCallback<InstanceType<TType>>, depends: any[] = []) {
  useEffect(() => {
    console.log('register handler ' + packetType.name);
    NeoCache.registHandleFunction(packetType, handler);
    return () => {
      console.log('unregister handler ' + packetType.name);
      NeoCache.unregistHandleFunction(packetType, handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handler, ...depends]);
}

export default useHandler;
