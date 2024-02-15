import React from 'react';
import { Button, Stack, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import { Field, Form, Formik } from 'formik';
import { useNavigate } from 'react-router';
import { PageBackGround } from '../../Components/PageBackGround';
import { CenterBox } from '../../Components/CenterBox';
import NeonAvatar from '../../Components/NeonAvatar';
// @ts-ignore
import avatar from '../../Static/Images/Logo/cypherLogo.png';
import { useAppDispatch } from '../../Redux/store';
import EnigmaTextField from '../../Components/Setup/EnigmaTextField';
import NickNameTextField from '../../Components/Setup/NickNameTextField';
import { toast } from 'react-toastify';
import { setRoomName } from '../../Features/Chat/ChatSlice';

function Index() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  return (
    <PageBackGround>
      <CenterBox width={400}>
        {/*//Create a frame with Box MUI component that child is centered*/}
        <Box display="flex" justifyContent="center" alignItems="center" sx={{ padding: 5 }}>
          <NeonAvatar imageUrl={avatar} />
        </Box>
        <Formik
          initialValues={{ roomName: '' }}
          onSubmit={(values, { setSubmitting }) => {
            const { roomName } = values;
            if (!roomName) {
              toast.error('Room name is not valid!');
            } else {
              dispatch(setRoomName(roomName));
              navigate(`/room/${values.roomName}`);
            }
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Stack spacing={3}>
                <Field name="roomName" as={TextField} label="Room Name" placeholder="Enter Room Name Here" fullWidth InputLabelProps={{ shrink: true }} />
                <EnigmaTextField />
                <NickNameTextField />
                <Button type="submit" variant="outlined" disabled={isSubmitting} sx={{ mt: 3 }} fullWidth>
                  Submit
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </CenterBox>
    </PageBackGround>
  );
}

export default Index;
