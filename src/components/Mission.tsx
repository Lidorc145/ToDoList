import './Mission.css';
import {
    ButtonGroup,
    Button,
    Card,
    CardContent,
    CardActions,
    Typography, Badge, IconButton, CardHeader,
} from "@mui/material";
import React from "react";
import {MissionStatus} from "../common/Enums";
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import {updateMissionStatus, MissionState} from "../features/mission/missionSlice";

import {useAppDispatch} from '../app/hooks';


export function Mission (props:MissionState){
    const dispatch = useAppDispatch();
        const {
            id,
            date,
            category,
            title,
            priority,
            status,
            description,
        } = props;

        const setMissionStatus = (status:MissionStatus)=>{return dispatch(updateMissionStatus({id,status}))};
        return (
            <Card className="Mission" variant="outlined">
                <CardHeader

                    action={
                        <IconButton aria-label="settings">
                            <Badge badgeContent={priority} color="error" title="Priority">
                                <PriorityHighIcon/>
                            </Badge>
                        </IconButton>
                    }
                    title={title}
                    subheader={category}
                />
                <CardContent>
                    <Typography sx={{mb: 1.5}} color="text.secondary">
                        {date}
                    </Typography>
                    <Typography variant="body2">
                        {description}

                    </Typography>

                </CardContent>
                <CardActions>
                    <ButtonGroup variant="outlined" color="info" aria-label="text button group" fullWidth>
                        <Button size="small"
                                variant={status === MissionStatus.Waiting ? "contained" : "outlined"}
                                onClick={() => {
                                    setMissionStatus(MissionStatus.Waiting)
                                }}>Waiting</Button>
                        <Button size="small"
                                variant={status === MissionStatus.InProgress ? "contained" : "outlined"}
                                onClick={() => {
                                    setMissionStatus(MissionStatus.InProgress)
                                }}>In Progress</Button>
                        <Button size="small"
                                variant={status === MissionStatus.Blocked ? "contained" : "outlined"}
                                onClick={() => {
                                    setMissionStatus(MissionStatus.Blocked)
                                }}>Blocked</Button>
                        <Button size="small"
                                variant={status === MissionStatus.Done ? "contained" : "outlined"}
                                onClick={() => {
                                    setMissionStatus(MissionStatus.Done)
                                }}>Done</Button>
                    </ButtonGroup>
                </CardActions>
            </Card>
        );
}