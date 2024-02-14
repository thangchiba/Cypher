import React from 'react';
import { PageBackGround } from '../../Components/PageBackGround';
import { CenterBox } from '../../Components/CenterBox';
import ChatBoxNav from './ChatBoxNav';
import useRoom from './useRoom';
import MessagesFrame from './MessagesFrame';
import ChatFormFrame from './ChatFormFrame';

interface RouteParams {
  roomName: string | undefined;
}

function Index() {
  const { roomName } = useRoom();

  return (
    <PageBackGround>
      <CenterBox>
        {/*<p>Room Name: {roomName}</p>*/}
        <ChatBoxNav />
        <MessagesFrame />
        <ChatFormFrame />
      </CenterBox>
    </PageBackGround>
  );
}

export default Index;
