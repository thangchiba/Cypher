import React from 'react';
import JsonView from 'react18-json-view';
import 'react18-json-view/src/style.css';
import { NeoPacket } from '../../../Utils/NeoSocket/NeoSocketLib/Base/NeoPacket';
import { TableCell, TableRow } from '@mui/material';

const PacketItem = React.memo(
  ({ packet, index }: { packet: NeoPacket; index: number }) => {
    return (
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        {/* Index */}
        <TableCell component="th" scope="row" style={{ width: 70 }}>
          {index}
        </TableCell>

        {/* Packet Type Name */}
        <TableCell sx={{ width: 200 }}>{packet.Header.packetTypeName}</TableCell>

        {/* JSON View */}
        <TableCell>
          <JsonView src={packet} displaySize={'collapsed'} collapsed={1} editable={false} dark={true} theme={'a11y'} />
        </TableCell>
      </TableRow>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.packet === nextProps.packet;
  },
);

export default PacketItem;
