import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { RootState, useAppDispatch } from '../../Redux/store';
import { useSelector } from 'react-redux';
import { setMessages } from '../../Features/Message/MessageSlice';
import { SendEnterRoomPacket } from '../../API/RoomAPI';
import { toast } from 'react-toastify';
import { mapDTOsToMessage } from '../../Utils/convertMessage';

interface RouteParams {
  roomName: string | undefined;
}

const useRoom = () => {
  const location = useLocation();
  const params = useParams<'roomName'>();
  const dispatch = useAppDispatch();
  const { enigma, nickName } = useSelector((state: RootState) => state.chat);

  const roomName = params.roomName;
  const getQueryStringValue = (key: string) => new URLSearchParams(location.search).get(key);

  useEffect(() => {
    enterRoom();
  }, [roomName]);

  async function enterRoom() {
    toast.info('Entering room...');
    if (!roomName || roomName === '') {
      toast.error('Room name is not valid');
      return;
    }

    const receivedMessages = await SendEnterRoomPacket(roomName, enigma, nickName);
    if (!receivedMessages) return;

    const decryptedMessages = mapDTOsToMessage(receivedMessages, enigma, nickName);
    dispatch(setMessages(decryptedMessages));
  }

  return { enterRoom, roomName, getQueryStringValue };
};

export default useRoom;
