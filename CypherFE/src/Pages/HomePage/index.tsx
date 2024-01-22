import React, { useState } from 'react';
import { Button, Stack, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import { Field, Form, Formik } from 'formik';
import { useNavigate } from 'react-router';
import { PageBackGround } from '../../Components/PageBackGround';
import { CenterBox } from '../../Components/CenterBox';
import NeonAvatar from '../../Components/NeonAvatar';
// @ts-ignore
import avatar from '../../Static/Images/Logo/cypherLogo.png';
import { RootState } from '../../Redux/store';
import { useSelector } from 'react-redux';
import EnigmaTextField from '../../Components/Setup/EnigmaTextField';
import NickNameTextField from '../../Components/Setup/NickNameTextField';

function Index() {
  const navigate = useNavigate();
  const [roomName, setRoomName] = useState('');
  const theme = useSelector((state: RootState) => state.theme);
  return (
    // <Modal open={true}>
    <PageBackGround>
      <CenterBox width={400}>
        {/*//Create a frame with Box MUI component that child is centered*/}
        <Box display="flex" justifyContent="center" alignItems="center" sx={{ padding: 5 }}>
          <NeonAvatar imageUrl={avatar} />
        </Box>
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
              <Stack spacing={3}>
                <Field
                  color={theme.darkMode ? 'warning' : 'primary'}
                  name="roomName"
                  as={TextField}
                  label="Room Name"
                  placeholder="Enter Room Name Here"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
                <EnigmaTextField />
                <NickNameTextField />
                <Button type="submit" variant="outlined" color={theme.darkMode ? 'warning' : 'primary'} disabled={isSubmitting} sx={{ mt: 3 }} fullWidth>
                  Submit
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </CenterBox>
    </PageBackGround>
    // </Modal>
  );
}

export default Index;
