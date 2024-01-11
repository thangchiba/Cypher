import React, { useEffect } from 'react';
import { CNeoPacket } from '../../../Utils/NeoSocket/NeoSocketLib/Cache/Packet/CNeoPacket';
import { Box, Button } from '@mui/material';
import { useFormik } from 'formik';
import DynamicForm from './DynamicForm';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Redux/store';
import { NeoPacket } from '../../../Utils/NeoSocket/NeoSocketLib/Base/NeoPacket';
import { jsonToClassInstance } from '../../../Utils/utils';

const PacketPropForm: React.FC<{ packet: CNeoPacket; jsonPacket: string }> = (props) => {
  const { client, isConnecting } = useSelector((state: RootState) => state.neosocket);
  const { packet, jsonPacket } = props;

  const formik = useFormik({
    initialValues: JSON.parse(jsonPacket),
    onSubmit: (values) => {
      const updatedPacket = JSON.parse(JSON.stringify(values)) as NeoPacket;
      const sendPacket = jsonToClassInstance(updatedPacket, packet.construct);
      client?.demand(sendPacket);
    },
  });

  useEffect(() => {
    formik.setValues(JSON.parse(jsonPacket));
  }, [jsonPacket]);

  function checkState() {
    console.log(formik.values);
  }

  function handleRandom() {}

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        {packet.keys.map((key) => (
          <Box key={key.keyId}>
            {
              <DynamicForm
                propInfo={key}
                value={formik.values[key.propertyName]}
                setFieldValue={formik.setFieldValue}
                handleChange={formik.handleChange}
                parentProps={''}
              />
            }
          </Box>
        ))}
        <Box display="flex" justifyContent="space-between">
          <Button type="submit" variant="contained" color="success">
            Submit
          </Button>
          <Button variant="contained" color="primary" onClick={checkState}>
            State
          </Button>
          <Button variant="contained" color="warning" onClick={handleRandom}>
            Random
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default PacketPropForm;
