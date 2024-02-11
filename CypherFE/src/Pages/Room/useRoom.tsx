import { useEffect, useRef } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { RootState, useAppDispatch } from '../../Redux/store';
import { useSelector } from 'react-redux';
import { enterRoom, setRoomName } from '../../Features/Chat/ChatSlice';
import Client from '../../API/Client';
import { Ping } from '../../Utils/NeoSocket/NeoPackets/PingPong/Ping';

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
        Client?.reconnect();
        await Client.connect(3000);
        dispatch(enterRoom());
      }
    };

    // Set interval to ping the server every 1 second
    const interval = setInterval(handlePing, 1000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  return { roomName: pathRoomName, getQueryStringValue };
};

export default useRoom;
