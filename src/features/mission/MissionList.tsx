import React from 'react';
import {isMobile} from 'react-device-detect';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {getMissions, initializeMissions,} from './missionSlice';
import './MissionList.module.css';
import {Mission} from "../../components/Mission";
import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader, FormControl,
  Grid, InputLabel,
  Modal,
  OutlinedInput,
  Typography
} from "@mui/material";
import {UpdateMission} from "../../components/UpdateMission";
import {MissionUpdateOperation} from "../../common/Enums";

export function MissionList() {
  const missionList = useAppSelector(getMissions);
  const dispatch = useAppDispatch();


  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return ( <Grid container spacing={1} direction={isMobile?'column':"row"}>
    <Grid item xs={6} md={2} >
      <Card className="Mission" variant="outlined">
        <CardHeader
            subheader={<FormControl fullWidth className="searchInput">
              <InputLabel>Search</InputLabel>
              <OutlinedInput
                  id="search"
                  // value={values.title}
                  // onChange={handleChange('title')}
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
            <CardActions onClick={handleOpen}>
              <Typography>
                Add New Mission
              </Typography>
            </CardActions>
          </CardActionArea>
          <CardActionArea>
            <CardActions onClick={handleOpen}>
              <Typography>
                Sort By Date
              </Typography>
            </CardActions>
          </CardActionArea>
          <CardActionArea>
            <CardActions onClick={handleOpen}>
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
        { missionList.map((mission)=>{return <Grid key={mission.id} item xs={6} md={4}><Mission {...mission}/></Grid>})}
      </Grid>
    </Grid>
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
    >
      <Box className="modal">
      <UpdateMission operation={MissionUpdateOperation.Add}/>
      </Box>
    </Modal>
  </Grid>);
}
