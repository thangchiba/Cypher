import React, { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { PageBackGround } from '../../Components/PageBackGround';
import { CenterBox } from '../../Components/Navbar/CenterBox';
import { useDispatch, useSelector } from 'react-redux';
import { openConnection } from '../../Features/NeoSocket/NeoSocketSlice';
import { RootState } from '../../Redux/store';
import { EnterChatRoomDemand } from '../../Utils/NeoSocket/NeoPackets/Test/EnterChatRoomDemand';
import { EnterChatRoomReply } from '../../Utils/NeoSocket/NeoPackets/Test/EnterChatRoomReply';
import ChatBox from './ChatBox';

interface RouteParams {
  roomName: string | undefined;
}

function Index() {
  const dispatch = useDispatch();
  const { client, isConnecting } = useSelector((redux: RootState) => redux.neosocket);
  const location = useLocation();
  const { roomName } = useParams<'roomName'>();
  const getQueryStringValue = (key: string) => {
    return new URLSearchParams(location.search).get(key);
  };

  useEffect(() => {
    dispatch(openConnection());
  }, []);

  async function SendEnterRoomPacket() {
    if (!client) return;
    const enterRoomPacket = new EnterChatRoomDemand();
    enterRoomPacket.Address = roomName || '';
    enterRoomPacket.UserName = roomName || 'thangchiba';
    const response: EnterChatRoomReply = await client?.demand(enterRoomPacket);
    console.log(response);
  }

  useEffect(() => {
    SendEnterRoomPacket();
  }, [roomName, client]);

  const enigmaCode = getQueryStringValue('enigma');
  return (
    <PageBackGround>
      <CenterBox>
        <p>Room Name: {roomName}</p>
        <p>Enigma Code: {enigmaCode}</p>
        <ChatBox></ChatBox>
      </CenterBox>
    </PageBackGround>
  );
}

export default Index;
