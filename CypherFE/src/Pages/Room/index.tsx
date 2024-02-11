import React, { useEffect } from 'react';
import { PageBackGround } from '../../Components/PageBackGround';
import { CenterBox } from '../../Components/CenterBox';
import ChatBox from './ChatBox';
import useRoom from './useRoom';
import { Ping } from '../../Utils/NeoSocket/NeoPackets/PingPong/Ping';
import Client from '../../API/Client';
import { TestDemand } from '../../Utils/NeoSocket/NeoPackets/Test/TestDemand';

interface RouteParams {
  roomName: string | undefined;
}

function Index() {
  const { roomName, getQueryStringValue } = useRoom();
  const enigmaCode = getQueryStringValue('enigma');

  useEffect(() => {
    const handlePing = async () => {
      try {
        // const pingPacket = new Ping();
        const pingPacket = new Ping();

        // Record the time before sending the ping
        const startTime = Date.now();

        // await Client.demand(pingPacket);
        await Client.demand(pingPacket);

        // Calculate the round-trip time
        const roundTripTime = Date.now() - startTime;
        console.log('Ping-Pong round-trip time: ', roundTripTime, 'ms');
      } catch (error) {
        console.log('Error during ping: ', error);
      }
    };

    // Set interval to ping the server every 1 second
    const interval = setInterval(handlePing, 10000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  return (
    <PageBackGround>
      <CenterBox>
        {/*<p>Room Name: {roomName}</p>*/}
        <ChatBox></ChatBox>
      </CenterBox>
    </PageBackGround>
  );
}

export default Index;
