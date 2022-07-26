import './Mission.css';
import {
    Badge,
    Button,
    ButtonGroup,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    IconButton,
    Typography,
} from "@mui/material";
import React from "react";
import {MissionPriority, MissionStatus} from "../common/Enums";
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import {MissionState, updateMissionPriority, updateMissionStatus} from "../features/mission/missionSlice";
import {format as dateFormat} from "date-fns";
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

    const setMissionStatus = (status: MissionStatus) => {
        return dispatch(updateMissionStatus({id, status}))
    };

    var formattedDate = dateFormat(new Date(), "MMMM do, yyyy");
    return (
        <Card className="Mission" variant="outlined">
            <CardHeader

                action={
                    <IconButton aria-label="settings" onClick={()=>{dispatch(updateMissionPriority({id,priority}))}}>
                        <Badge badgeContent={priority} color="error" title="Priority">
                            <PriorityHighIcon/>
                        </Badge>
                    </IconButton>
                    }
                    title={<div>{title}</div>}
                    subheader={category}
                />
                <CardContent>
                    <Typography sx={{mb: 1.5}} color="text.secondary">
                        {formattedDate}
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