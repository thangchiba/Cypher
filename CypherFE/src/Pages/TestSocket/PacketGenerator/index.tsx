import React, { useState } from 'react';
import PacketAutocomplete from './PacketAutocomplete';
import Box from '@mui/material/Box';
import { CNeoPacket } from '../../../Utils/NeoSocket/NeoSocketLib/Cache/Packet/CNeoPacket';
import { Divider } from '@mui/material';
import PacketPropForm from './PacketPropForm';

function Index() {
  const [selectedPacket, setSelectedPacket] = useState<CNeoPacket | null>(null);
  const [packetState, setPacketState] = useState();
  const [jsonPacket, setJsonPacket] = useState('');

  const handlePacketSelect = (packet: CNeoPacket | null) => {
    setSelectedPacket(packet);
    if (packet == null) return;
    const instance = new packet.construct();
    const packetJson = JSON.stringify(instance);
    setJsonPacket(packetJson);
  };

  return (
    <>
      <Box sx={{ width: '100%', padding: 2, border: '1px solid', borderRadius: 3 }}>
        {/*<Typography>Selected Packet : {selectedPacket?.packetTypeName}</Typography>*/}
        <PacketAutocomplete setSelectedPacket={handlePacketSelect} />
        <Divider sx={{ my: 3 }}>Packet Content</Divider>
        {selectedPacket && <PacketPropForm packet={selectedPacket} jsonPacket={jsonPacket} />}
      </Box>
    </>
  );
}

export default Index;
