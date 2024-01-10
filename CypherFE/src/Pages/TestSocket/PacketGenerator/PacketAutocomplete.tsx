import React from 'react';
import TextField from '@mui/material/TextField';
import { NeoCache } from '../../../Utils/NeoSocket/NeoSocketLib/Cache/NeoCache';
import { Autocomplete } from '@mui/material';
import { CNeoPacket } from '../../../Utils/NeoSocket/NeoSocketLib/Cache/Packet/CNeoPacket';

interface PacketAutocompleteProps {
  setSelectedPacket: (packet: CNeoPacket | null) => void;
}

const PacketAutocomplete: React.FC<PacketAutocompleteProps> = (props) => {
  const { setSelectedPacket } = props;
  const packetOptions = Object.entries(NeoCache.packetByName).map(([name, packet]) => {
    return packet;
  });

  return (
    <Autocomplete
      options={packetOptions}
      getOptionLabel={(option: CNeoPacket) => option.packetTypeName}
      renderInput={(params: any) => <TextField {...params} label="Choose a Packet" variant="outlined" />}
      onChange={(event: any, packet) => {
        setSelectedPacket(packet || null);
        // console.log('Selected Packet:', packet);
      }}
    />
  );
};

export default PacketAutocomplete;
