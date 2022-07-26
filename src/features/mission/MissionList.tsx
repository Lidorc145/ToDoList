import React, { useState } from 'react';
import {isMobile} from 'react-device-detect';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  initializeMissions,
  getMissions,
} from './missionSlice';
import './MissionList.module.css';
import {Mission} from "../../components/Mission";
import {Card, CardActionArea,Avatar, CardActions, CardContent, CardHeader, Grid, IconButton} from "@mui/material";

export function MissionList() {
  const missionList = useAppSelector(getMissions);
  const dispatch = useAppDispatch();

  return ( <Grid container spacing={1} direction={isMobile?'column':"row"}>
    <Grid item xs={6} md={2} >
      <Card className="Mission" variant="outlined">
        <CardHeader
            title="Tasks"
        />
        <CardContent>
          <CardActionArea>
            <CardActions onClick={() => dispatch(initializeMissions())}>
              <h2>Initialize!</h2>
            </CardActions>
          </CardActionArea>
        </CardContent>

      </Card>
    </Grid>
    <Grid item xs={6} md={10}>
      <Grid container spacing={isMobile?0:2} direction={isMobile?'column':"row"}>
        { missionList.map((mission)=>{return <Grid item xs={6} md={4}><Mission {...mission}/></Grid>})}
      </Grid>
    </Grid>
  </Grid>);
}
