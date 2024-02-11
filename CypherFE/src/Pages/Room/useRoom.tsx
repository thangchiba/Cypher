import { useEffect, useRef } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { RootState, useAppDispatch } from '../../Redux/store';
import { useSelector } from 'react-redux';
import { setMessages } from '../../Features/Message/MessageSlice';
import { SendEnterRoomPacket } from '../../API/RoomAPI';
import { toast } from 'react-toastify';
import { mapDTOsToMessage } from '../../Utils/convertMessage';
import { enterRoom, setRoomName } from '../../Features/Chat/ChatSlice';

interface RouteParams {
  roomName: string | undefined;
}

const useRoom = () => {
  console.log('rerender useRoom');
  const location = useLocation();
  const params = useParams<'roomName'>();
  const dispatch = useAppDispatch();
  const { enigma, nickName } = useSelector((state: RootState) => state.chat);

  const pathRoomName = params.roomName;
  const { roomName } = useSelector((state: RootState) => state.chat);
  const isEnteringRoom = useRef<boolean>(false);

  const getQueryStringValue = (key: string) => new URLSearchParams(location.search).get(key);

  useEffect(() => {
    dispatch(setRoomName(pathRoomName || ''));
  }, [pathRoomName]);

  useEffect(() => {
    if (!roomName) return;
    console.log('Trigger enter room', roomName);
    dispatch(enterRoom());
  }, [roomName, dispatch]);

  return { roomName: pathRoomName, getQueryStringValue };
};

export default useRoom;
