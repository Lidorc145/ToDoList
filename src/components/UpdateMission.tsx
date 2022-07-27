import './UpdateMission.css';
import {
    ButtonGroup,
    Button,
    Card,
    CardContent,
    Badge,
    IconButton,
    CardHeader,
    FormControl,
    OutlinedInput,
    InputLabel, TextField, ToggleButton, ToggleButtonGroup,
} from "@mui/material";
import React from "react";
import {MissionStatus, MissionPriority, MissionUpdateOperation} from "../common/Enums";
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import {addMission, MissionState} from "../features/mission/missionSlice";
import {useAppDispatch} from '../app/hooks';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {DatePicker} from '@mui/x-date-pickers'
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';

export interface Props {
    missionData?: MissionState
    operation: MissionUpdateOperation
}

export function UpdateMission(props: Props) {
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

    const handleChange = (state: keyof MissionState | 'delete', value?: any) => {
                switch (state) {

                    case "date":
                        setValues({...values, [state]: value});
                        break;
                    case "delete":
                        setValues({
                            date: new Date().getTime(),
                            category: '',
                            title: '',
                            priority: MissionPriority.Normal,
                            status: MissionStatus.Waiting,
                            description: ''
                        });
                        break;
                    default:
                        return (event: any,value?:any) => {
                            if(value!=undefined){
                                setValues({...values, [state]: value});
                            }else{
                                setValues({...values, [state]: event.target.value});
                            }
                        }
                }
    }


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
                subheader={MissionUpdateOperation[props.operation]+" Mission"}
            />
            <CardContent>
                <FormControl fullWidth className="formControl">
                    <InputLabel htmlFor="outlined-adornment-title">Title</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-title"
                        value={values.title}
                        onChange={handleChange('title')}
                        label="Title"
                        required
                    />
                </FormControl>
                <FormControl fullWidth className="formControl">
                    <InputLabel htmlFor="outlined-adornment-description">Description</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-description"
                        value={values.description}
                        multiline
                        minRows={10}
                        maxRows={15}
                        onChange={handleChange('description')}
                        label="Description"
                        required
                    />
                </FormControl>
                <FormControl fullWidth className="formControl">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Date"
                            value={values.date}
                            onChange={(value:Date|null)=>handleChange('date', value && value.getTime())}
                            renderInput={(params: any) => <TextField {...params}/>}
                        />
                    </LocalizationProvider>
                </FormControl>
                <FormControl fullWidth className="formControl">
                    <ToggleButtonGroup
                        color="primary"
                        value={values.status}
                        exclusive
                        onChange={handleChange('status')}
                        fullWidth
                    >
                        <ToggleButton value={MissionStatus.Waiting}>Waiting</ToggleButton>
                        <ToggleButton value={MissionStatus.InProgress}>In Progress</ToggleButton>
                        <ToggleButton value={MissionStatus.Blocked}>Blocked</ToggleButton>
                        <ToggleButton value={MissionStatus.Done}>Done</ToggleButton>
                    </ToggleButtonGroup>
                </FormControl>
                <FormControl fullWidth className="operationButtons">
                <Button size="small"
                        color="error"
                        variant="contained"
                        onClick={()=>handleChange('delete')}>Delete</Button>
                <Button size="small"
                        color={"success"}
                        variant="contained"
                        onClick={()=>{dispatch(addMission(values))}}>Add Mission!</Button>

                </FormControl>
            </CardContent>
        </Card>
    );

}