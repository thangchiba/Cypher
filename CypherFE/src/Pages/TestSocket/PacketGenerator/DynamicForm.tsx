import React from 'react';
import { Checkbox, FormControlLabel, TextField } from '@mui/material';
import { CNeoKey } from '../../../Utils/NeoSocket/NeoSocketLib/Cache/Packet/CNeoKey';
import { NeoCache } from '../../../Utils/NeoSocket/NeoSocketLib/Cache/NeoCache';
import FloatingLabelBox from './FloatingLabelBox';
import Box from '@mui/material/Box';

interface DynamicFormProps {
  propInfo: CNeoKey;
  value: any;
  handleChange: (e: React.ChangeEvent<any>) => void;
  setFieldValue: (prop: string, value: any) => void;
  parentProps: string;
}

const DynamicForm: React.FC<DynamicFormProps> = ({ propInfo, value, handleChange, parentProps, setFieldValue }) => {
  let inputField;
  const branchProp = parentProps === '' ? propInfo.propertyName : `${parentProps}.${propInfo.propertyName}`;
  switch (propInfo.propertyType) {
    case 'string':
      inputField = (
        <TextField
          name={branchProp}
          label={propInfo.propertyName}
          value={value}
          onChange={(e) => {
            setFieldValue(branchProp, e.target.value);
          }}
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
      );
      break;
    case 'number':
      inputField = (
        <TextField
          name={branchProp}
          label={propInfo.propertyName}
          type="number"
          value={value}
          onChange={(e) => {
            setFieldValue(branchProp, e.target.value);
          }}
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
      );
      break;
    case 'datetime':
      inputField = (
        <TextField
          name={branchProp}
          label={propInfo.propertyName}
          type="datetime-local"
          InputLabelProps={{ shrink: true }}
          value={value}
          onChange={(e) => {
            setFieldValue(branchProp, e.target.value);
          }}
          fullWidth
        />
      );
      break;
    case 'boolean':
      inputField = (
        <FormControlLabel
          control={
            <Checkbox
              name={branchProp}
              checked={value}
              onChange={(e) => {
                setFieldValue(branchProp, e.target.value);
              }}
            />
          }
          label={propInfo.propertyName}
        />
      );
      break;
    // Add cases for other property types if needed
    default:
      const cNeoPacket = NeoCache.packetByName[propInfo.propertyType];
      if (cNeoPacket) {
        inputField = (
          <FloatingLabelBox label={propInfo.propertyName}>
            {cNeoPacket.keys.map((key) => (
              <DynamicForm
                propInfo={key}
                value={null}
                setFieldValue={setFieldValue}
                handleChange={(e) => console.log('Changed Value')}
                parentProps={branchProp}
              />
            ))}
          </FloatingLabelBox>
        );
      } else
        inputField = (
          <TextField
            name={propInfo.propertyName}
            label={propInfo.propertyName}
            InputLabelProps={{ shrink: true }}
            fullWidth
            disabled
            error={true}
            // helperText="This type is not supported" // Display error message
            value="This type is not support"
          />
        );
  }

  return <Box sx={{ marginBlock: 1 }}>{inputField}</Box>;
};

export default DynamicForm;
