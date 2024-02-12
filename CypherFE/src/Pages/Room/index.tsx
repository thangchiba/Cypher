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
