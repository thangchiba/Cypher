import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { Table, TableBody, Typography } from '@mui/material';
import PacketItem from './PacketItem';
import { NeoPacket } from '../../../Utils/NeoSocket/NeoSocketLib/Base/NeoPacket';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Redux/store';

const MAX_SHOWING_HISTORY = 1000;
Index.propTypes = {};

function Index() {
  const { client, isConnected } = useSelector((state: RootState) => state.neosocket);
  useEffect(() => {
    const handlePacket = (packet: NeoPacket) => addHandledPacket(packet);
    if (client) {
      client.onHandle.push(handlePacket);
    }

    return () => {
      if (client) {
        const index = client.onHandle.indexOf(handlePacket);
        if (index > -1) {
          client.onHandle.splice(index, 1);
        }
      }
    };
  }, [client]);

  const [handledPacket, setHandledPacket] = useState<NeoPacket[]>([]);

  function addHandledPacket(packet: NeoPacket) {
    setHandledPacket((prevState) => {
      const updatedPackets = [packet, ...prevState];
      return updatedPackets.slice(0, MAX_SHOWING_HISTORY);
    });
  }

  return (
    <div>
      <Box sx={{ width: '100%', height: 500, overflowY: 'scroll', padding: 2, border: '1px solid', borderRadius: 3 }}>
        <Typography variant="h4" textAlign="center">
          Handled Packets
        </Typography>

        <Table size="small" aria-label="Packet details">
          <TableBody>
            {handledPacket.map((packet, index) => (
              <PacketItem key={packet.UniqueId} packet={packet} index={handledPacket.length - index} />
            ))}
          </TableBody>
        </Table>
      </Box>
    </div>
  );
}

export default Index;
