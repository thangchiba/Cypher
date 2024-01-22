import React from 'react';
import { PageBackGround } from '../../Components/PageBackGround';
import { CenterBox } from '../../Components/CenterBox';
import ChatBox from './ChatBox';
import useRoom from './useRoom';

interface RouteParams {
  roomName: string | undefined;
}

function Index() {
  const { enterRoom, roomName, getQueryStringValue } = useRoom();
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
