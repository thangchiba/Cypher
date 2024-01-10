import React, { Fragment, useEffect, useState } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';
import ConnectionManage from './ConnectionManage';
import PacketGenerator from './PacketGenerator';
import Box from '@mui/material/Box';
import PacketHandler from './PacketHandler';

function Index() {
  const dispatch = useDispatch();
  const { client, isConnecting } = useSelector((state: RootState) => state.neosocket);

  return (
    <Fragment>
      <ConnectionManage />
      {isConnecting && (
        <>
          <Grid container spacing={2} justifyContent="space-around">
            <Grid item xs={12} md={6}>
              <PacketGenerator />
            </Grid>

            <Grid item xs={12} md={6}>
              <PacketHandler />
            </Grid>
          </Grid>
        </>
      )}
    </Fragment>
  );
}

export default Index;
