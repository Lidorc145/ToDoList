import './UpdateMission.css';
import {
    ButtonGroup,
    Button,
    Card,
    CardContent,
    Typography,
    Badge,
    IconButton,
    CardHeader,
    FormControl,
    OutlinedInput,
    InputLabel,
} from "@mui/material";
import React from "react";
import {MissionStatus, MissionPriority, MissionUpdateOperation} from "../common/Enums";
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import {addMission, MissionState} from "../features/mission/missionSlice";
import {useAppDispatch} from '../app/hooks';

export interface Props{
    missionData?: MissionState
    operation: MissionUpdateOperation
};

export function UpdateMission (props: Props){
    const dispatch = useAppDispatch();
    const [values, setValues] = React.useState<MissionState>({
        date: new Date().getTime(),
        category: '',
        title: '',
        priority: MissionPriority.Normal,
        status: MissionStatus.Waiting,
        description: ''
    });

    if(props.operation===MissionUpdateOperation.Update && props.missionData) {
        setValues(props.missionData);
    }

    const handleChange =
        (state: keyof MissionState, value?:any) => (event: React.ChangeEvent<HTMLInputElement>) => {

        console.log(state,value,event);
        switch (state) {
            case "status":
                setValues({ ...values, [state]: value });
                break;

            default:
                setValues({ ...values, [state]: event.target.value });
        }
    };

    console.log("s: "+values.status)
    return (
        <Card className="Mission" variant="outlined">
            <CardHeader

                action={
                    <IconButton aria-label="settings">
                        <Badge badgeContent={values.priority} color="error" title="Priority">
                            <PriorityHighIcon/>
                        </Badge>
                    </IconButton>
                }
                title={MissionUpdateOperation[props.operation]+" Mission"}
                subheader={values.category}
            />
            <CardContent>
                <Typography sx={{mb: 1.5}} color="text.secondary">
                    {values.date}
                </Typography>
                <Typography variant="body2">
                    {values.description}
                </Typography>

                <FormControl fullWidth sx={{ m: 1 }}>
                    <InputLabel htmlFor="outlined-adornment-title">Title</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-title"
                        value={values.title}
                        onChange={handleChange('title')}
                        label="Title"
                        required={true}
                    />
                </FormControl>
                <FormControl fullWidth sx={{ m: 1 }}>
                    <InputLabel htmlFor="outlined-adornment-description">Description</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-description"
                        value={values.description}
                        multiline
                        minRows={10}
                        maxRows={15}
                        onChange={handleChange('description')}
                        label="Description"
                    />
                </FormControl>
                <FormControl fullWidth sx={{ m: 1 }}>
                    <ButtonGroup variant="outlined" color="info" aria-label="text button group" fullWidth>
                        <Button size="small"
                                variant={values.status === MissionStatus.Waiting ? "contained" : "outlined"}
                                onClick={()=>setValues({ ...values, status: MissionStatus.Waiting })}>Waiting</Button>
                        <Button size="small"
                                variant={values.status === MissionStatus.InProgress ? "contained" : "outlined"}
                                onClick={()=>setValues({ ...values, status: MissionStatus.InProgress })}>In Progress</Button>
                        <Button size="small"
                                variant={values.status === MissionStatus.Blocked ? "contained" : "outlined"}
                                onClick={()=>setValues({ ...values, status: MissionStatus.Blocked })}>Blocked</Button>
                        <Button size="small"
                                variant={values.status === MissionStatus.Done ? "contained" : "outlined"}
                                onClick={()=>setValues({ ...values, status: MissionStatus.Done })}>Done</Button>
                    </ButtonGroup>
                </FormControl>
                <Button size="small"
                        variant="contained"
                        onClick={()=>{dispatch(addMission(values))}}>Add Mission!</Button>
            </CardContent>
        </Card>
    );

}