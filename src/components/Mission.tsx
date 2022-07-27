import './Mission.css';
import {
    Badge,
    Card,
    CardContent,
    CardHeader, Chip,
    IconButton,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
} from "@mui/material";
import React from "react";
import {MissionPriority, MissionStatus, MissionUpdateOperation} from "../common/Enums";
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import {MissionState, updateMissionPriority, updateMissionStatus} from "../features/mission/missionSlice";
import {format as dateFormat} from "date-fns";
import {useAppDispatch} from '../app/hooks';
import {openModal,updateMissionData} from "../features/modal/modalSlice";


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
        event.stopPropagation();
        dispatch(updateMissionStatus({id, status}));
    }

    const formattedDate = date && dateFormat(date, "MMMM do, yyyy");
    return (
        <Card className="DisplayMission" variant="outlined" onClick={()=>{dispatch(updateMissionData({...props})); dispatch(openModal())}}>
            <CardHeader
                action={<IconButton aria-label="settings" onClick={(e) => {
                    e.stopPropagation();
                    dispatch(updateMissionPriority({id, priority}))
                }}>

                    <Chip label={priority?MissionPriority[priority].toUpperCase():'SET PRIORITY'} color={translatePriorityToColor()} variant="outlined" icon={priority?<br/>:<PriorityHighIcon />} />
                </IconButton>}
                title={<div>{id + " | " + title}</div>}
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

    function translatePriorityToColor() {
        switch (priority) {
            case MissionPriority.Lowest:
                return 'default';
            case MissionPriority.Low:
                return 'info';
            case MissionPriority.Normal:
                return 'primary';
            case MissionPriority.High:
                return 'secondary';
            case MissionPriority.Highest:
                return 'warning';
            case MissionPriority.Urgent:
                return 'error';
        }
    }
}