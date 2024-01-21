import React, { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { PageBackGround } from '../../Components/PageBackGround';
import { CenterBox } from '../../Components/CenterBox';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../Redux/store';
import { EnterChatRoomDemand } from '../../Utils/NeoSocket/NeoPackets/Test/EnterChatRoomDemand';
import { EnterChatRoomReply } from '../../Utils/NeoSocket/NeoPackets/Test/EnterChatRoomReply';
import ChatBox from './ChatBox';
import { setMessages } from '../../Features/Message/MessageSlice';
import { mapDTOsToMessage } from '../../Utils/convertMessage';
import { openConnection } from '../../Features/NeoSocket/NeoSocketReducer';

interface RouteParams {
  roomName: string | undefined;
}

function Index() {
  const dispatch = useAppDispatch();
  const { client, isConnected } = useSelector((redux: RootState) => redux.neosocket);
  const location = useLocation();
  const { roomName } = useParams<'roomName'>();
  const { enigma, nickName } = useSelector((redux: RootState) => redux.chat);
  const getQueryStringValue = (key: string) => {
    return new URLSearchParams(location.search).get(key);
  };

  useEffect(() => {
    // dispatch(openConnectionThunk());
    dispatch(openConnection());
  }, []);

  async function SendEnterRoomPacket() {
    if (!client) return;
    const enterRoomPacket = new EnterChatRoomDemand();
    enterRoomPacket.Address = roomName || '';
    enterRoomPacket.UserName = roomName || 'thangchiba';
    const response: EnterChatRoomReply = await client?.demand(enterRoomPacket);
    const receivedMessages = mapDTOsToMessage(response.Messages, enigma, nickName);
    dispatch(setMessages(receivedMessages));
    console.log({ response, receivedMessages });
  }

  useEffect(() => {
    SendEnterRoomPacket();
  }, [roomName, client]);

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
