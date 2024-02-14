import { useEffect } from 'react';
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
  const location = useLocation();
  const params = useParams<'roomName'>();
  const dispatch = useAppDispatch();
  const pathRoomName = params.roomName;
  const { roomName } = useSelector((state: RootState) => state.chat);
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
    let pingFailures = 0; // Initialize counter for consecutive ping failures

    const handlePing = async () => {
      if (pingFailures >= 3) {
        console.log('Ping failed 3 times, stopping pings');
        return; // Stop execution if failed 3 times
      }

      try {
        const pingPacket = new Ping();
        const startTime = Date.now();
        await Client.demand(pingPacket);
        const roundTripTime = Date.now() - startTime;
        console.log('Ping-Pong round-trip time: ', roundTripTime, 'ms');

        pingFailures = 0; // Reset counter on successful ping
      } catch (error) {
        console.log('Error during ping: ', error);
        pingFailures += 1; // Increment counter on failure

        if (pingFailures < 3) {
          try {
            Client?.closeConnection();
            Client?.reconnect();
            await Client.connect(3000);
            dispatch(enterRoom());
            pingFailures = 0; // Reset counter on successful ping
          } catch (e) {
            console.log('Error during reconnect: ', e);
          }
        }
      }
    };

    const interval = setInterval(handlePing, 5000);

    return () => clearInterval(interval); // Cleanup
  }, []); // Dependency array remains empty for componentDidMount behavior

  return { roomName: pathRoomName, getQueryStringValue };
};

export default useRoom;
