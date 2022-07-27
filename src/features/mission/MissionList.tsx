import React from 'react';
import {isMobile} from 'react-device-detect';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {getMissions, initializeMissions, MissionState,} from './missionSlice';
import {closeModal, isModalOpen, openModal} from '../modal/modalSlice';
import './MissionList.module.css';
import {Mission} from "../../components/Mission";
import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  Grid,
  InputLabel,
  Modal,
  OutlinedInput,
  Typography
} from "@mui/material";
import {UpdateMission} from "../../components/UpdateMission";
import {MissionUpdateOperation} from "../../common/Enums";

export function MissionList() {
  const missionList = useAppSelector(getMissions);
  const modalOpen = useAppSelector(isModalOpen);
  const dispatch = useAppDispatch();


  return ( <Grid container spacing={1} direction={isMobile?'column':"row"}>
    <Grid item xs={6} md={2} >
      <Card className="Mission" variant="outlined">
        <CardHeader
            subheader={<FormControl fullWidth className="searchInput">
              <InputLabel>Search</InputLabel>
              <OutlinedInput
                  id="search"
                  label="Search"
                  required
              />
            </FormControl>}
        />

        <CardContent>
          <CardActionArea>
            <CardActions onClick={() => dispatch(initializeMissions())}>
              <Typography>
                Initialize Missions
              </Typography>
            </CardActions>
          </CardActionArea>
          <CardActionArea>
            <CardActions onClick={() => dispatch(openModal())}>
              <Typography>
                Add New Mission
              </Typography>
            </CardActions>
          </CardActionArea>
          <CardActionArea>
            <CardActions >
              <Typography>
                Sort By Date
              </Typography>
            </CardActions>
          </CardActionArea>
          <CardActionArea>
            <CardActions >
              <Typography>
                Sort By Priority
              </Typography>
            </CardActions>
          </CardActionArea>
        </CardContent>

      </Card>
    </Grid>
    <Grid item xs={6} md={10}>
      <Grid container spacing={isMobile?0:2} direction={isMobile?'column':"row"}>
        { missionList.map((missionData:MissionState)=>{return <Grid key={missionData.id} item xs={6} md={4}><Mission {...missionData}  /></Grid>})}
      </Grid>

    </Grid>
    <Modal
        key="modal"
        open={modalOpen}
        onClose={()=>dispatch(closeModal())}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
    >
      <Box className="modal">
      <UpdateMission/>
      </Box>
    </Modal>
  </Grid>);
}
