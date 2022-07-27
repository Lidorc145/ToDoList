import './Mission.css';
import {
    Badge,
    Card, CardActionArea,
    CardContent,
    CardHeader,
    IconButton, ToggleButton, ToggleButtonGroup,
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

    const handleStatusChange = (event: any, status: any) => {
        dispatch(updateMissionStatus({id, status}));
    }

    const formattedDate = date && dateFormat(date, "MMMM do, yyyy");
    return (
        <Card className="DisplayMission" variant="outlined">
            <CardHeader
                action={<IconButton aria-label="settings" onClick={() => {dispatch(updateMissionPriority({id, priority}))}}>
                        <Badge badgeContent={priority} color="error" title="Priority">
                            <PriorityHighIcon/>
                        </Badge>
                        </IconButton>}
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
            <div className="toggleStatusButton">
                <ToggleButtonGroup
                    color="primary"
                    value={status}
                    exclusive
                    onChange={handleStatusChange}
                    fullWidth
                    size="small"
                    className="statusButtons"
                >
                    <ToggleButton value={MissionStatus.Waiting}>Waiting</ToggleButton>
                    <ToggleButton value={MissionStatus.InProgress}>In Progress</ToggleButton>
                    <ToggleButton value={MissionStatus.Blocked}>Blocked</ToggleButton>
                    <ToggleButton value={MissionStatus.Done}>Done</ToggleButton>
                </ToggleButtonGroup>
            </div>
        </Card>
    );
}