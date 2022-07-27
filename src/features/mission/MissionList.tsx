import React, {useState} from 'react';
import {isMobile} from 'react-device-detect';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {
  getMissions,
  searchMission,
  initializeMissions,
  MissionState,
  getSearchResults,
  sortMissions,
} from './missionSlice';
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
  OutlinedInput, ToggleButton, ToggleButtonGroup,
  Typography
} from "@mui/material";
import {UpdateMission} from "../../components/UpdateMission";
import {MissionStatus, MissionUpdateOperation} from "../../common/Enums";

export function MissionList() {
  let missionList = useAppSelector(getMissions);
  const modalOpen = useAppSelector(isModalOpen);
  const searchresults = useAppSelector(getSearchResults);
  const dispatch = useAppDispatch();
  const [searchResult, setSearchResult] = useState<MissionState[]>(new Array());
  const printMission = (list:MissionState[])=>{
    return list.map((missionData:MissionState)=>{return <Grid key={missionData.id} item xs={6} md={4}><Mission {...missionData}  /></Grid>});
  }

  console.log(searchResult);
  return ( <Grid container spacing={2} direction={isMobile?'column':"row"}>
    <Grid item xs={6} md={2} >
      <Card variant="outlined"  className="searchInput">
        <FormControl fullWidth>
              <InputLabel>Search</InputLabel>
              <OutlinedInput
                  id="search"
                  label="Search"
                  onChange={(e)=>{dispatch(searchMission({text: e.target.value})); setSearchResult(searchresults)}}
                  required
                  fullWidth
              />
        </FormControl>
        <FormControl fullWidth>
          <ToggleButtonGroup
              color="primary"
              fullWidth
              size="large"
              orientation="vertical"
              className="sortButtons"
          >
            <ToggleButton value={"DASDASD"} onClick={() => dispatch(initializeMissions())}>
              Initialize Missions
            </ToggleButton>
                <ToggleButton value={"DASDASD"} onClick={() => dispatch(openModal())}>
                  Add New Mission
                </ToggleButton>
                <ToggleButton value={"dsa"} onClick={()=> dispatch(sortMissions({attribute: 'id', func: (a:any,b:any)=>(b-a)}))}>
                  Sort By ID
                </ToggleButton>
          <ToggleButton value="ss" onClick={()=> dispatch(sortMissions({attribute: 'date', func: (a:any,b:any)=>(a-b)}))}>
            Sort By Date
          </ToggleButton>
          <ToggleButton value={"da"} onClick={()=> dispatch(sortMissions({attribute: 'priority', func: (a:any,b:any)=>(a-b)}))}>
            Sort By Priority
          </ToggleButton>
          <ToggleButton value="31" onClick={()=> dispatch(sortMissions({attribute: 'status', func: (a:any,b:any)=>(a-b)}))}>
            Sort By Status
          </ToggleButton>
          </ToggleButtonGroup>
        </FormControl>

      </Card>
    </Grid>
    <Grid item xs={6} md={10}>
      <Grid container spacing={isMobile?0:2} direction={isMobile?'column':"row"}>

        {(searchresults.length>0)?printMission(searchresults):printMission(missionList)}

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
  </Grid>
  );


}

