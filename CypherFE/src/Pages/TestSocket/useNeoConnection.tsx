// useNeoConnection.js
import { useEffect, useState } from 'react';
import { NeoClient } from '../../Utils/NeoSocket/NeoSocketLib/NeoClient';

export function useNeoConnection() {
  const [client, setClient] = useState<NeoClient | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    createNewConnection();
  }, []);

  function createNewConnection() {
    const newClient = new NeoClient('neosk://localhost:51994');
    newClient.onDisconnect.push(() => console.log('Disconnected with server'));
    setIsConnecting(true);
    return newClient;
  }

  function openConnection() {
    const newClient = createNewConnection();
    setClient(newClient);
  }

  function closeConnection() {
    client?.closeConnection();
    setIsConnecting(false);
    setClient(null);
  }

  return { client, isConnecting: isConnecting, openConnection, closeConnection };
}
