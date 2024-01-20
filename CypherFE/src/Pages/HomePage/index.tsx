import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import { Field, Form, Formik } from 'formik';
import { useNavigate } from 'react-router';
import { PageBackGround } from '../../Components/PageBackGround';
import { CenterBox } from '../../Components/CenterBox';

function Index() {
  const navigate = useNavigate();
  const [roomName, setRoomName] = useState('');
  return (
    // <Modal open={true}>
    <PageBackGround>
      <CenterBox>
        <Formik
          initialValues={{ roomName: '' }}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);
            navigate(`/room/${values.roomName}`);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field name="roomName" as={TextField} label="Room Name" placeholder="Enter Room Name Here" fullWidth InputLabelProps={{ shrink: true }} />
              <Box display="flex" justifyContent="flex-end">
                <Button type="submit" variant="outlined" color="warning" disabled={isSubmitting} sx={{ mt: 3, width: 150 }}>
                  Submit
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </CenterBox>
    </PageBackGround>
    // </Modal>
  );
}

export default Index;
