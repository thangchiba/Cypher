import React, { Fragment } from 'react';
import { Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';
import ConnectionManage from './ConnectionManage';
import PacketGenerator from './PacketGenerator';
import PacketHandler from './PacketHandler';
import { CenterBox } from '../../Components/CenterBox';
import { PageBackGround } from '../../Components/PageBackGround';

function Index() {
  const dispatch = useDispatch();
  const { clientId, isConnected } = useSelector((state: RootState) => state.neosocket);
  return (
    <Fragment>
      <PageBackGround>
        <CenterBox width={1500} height={700}>
          <ConnectionManage />
          {isConnected && (
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
        </CenterBox>
      </PageBackGround>
    </Fragment>
  );
}

export default Index;
