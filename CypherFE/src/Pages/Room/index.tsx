import React from 'react';
import { PageBackGround } from '../../Components/PageBackGround';
import { CenterBox } from '../../Components/CenterBox';
import ChatBoxNav from './ChatBoxNav';
import useRoom from './useRoom';
import MessagesFrame from './MessagesFrame';
import ChatFormFrame from './ChatFormFrame';

function Index() {
  useRoom();

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
