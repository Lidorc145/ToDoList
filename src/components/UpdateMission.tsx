import './UpdateMission.css';
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Chip,
    FormControl,
    IconButton,
    InputLabel,
    OutlinedInput,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
} from "@mui/material";
import React, {useState} from "react";
import {MissionPriority, MissionStatus, MissionUpdateOperation} from "../common/Enums";
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import {addMission, MissionState, removeMission, updateMission} from "../features/mission/missionSlice";
import {useAppDispatch, useAppSelector} from '../app/hooks';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {DatePicker} from '@mui/x-date-pickers'
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {closeModal, getMissionData} from "../features/modal/modalSlice";
import {translatePriorityToColor} from "../common/Utils";

export interface Props {
    missionData?: MissionState | null
    //operation: MissionUpdateOperation
}

export function UpdateMission(props: Props) {
    const dispatch = useAppDispatch();
    const missionData = useAppSelector(getMissionData);
    const [values, setValues] = React.useState<MissionState>({
        date: new Date().getTime(),
        category: '',
        title: '',
        priority: MissionPriority.Normal,
        status: MissionStatus.Waiting,
        description: '',
        ...missionData
    });
    const [operation, setOperation] = useState<MissionUpdateOperation>(missionData ? MissionUpdateOperation.Update : MissionUpdateOperation.Add)

    const handleChange = (state: keyof MissionState | 'clear', value?: any) => {
        switch (state) {
            case "date":
                setValues({...values, [state]: value});
                break;
            case "clear":
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
                return (event: any, value?: any) => {
                    if (value !== undefined) {
                        setValues({...values, [state]: value});
                    } else {
                        setValues({...values, [state]: event.target.value});
                    }
                }
        }
    }


    return (
        <Card className="Mission" variant="outlined">
            <CardHeader

                action={<IconButton aria-label="settings" onClick={(e) => {
                    let newPriority = (values.priority + 1) % 7;
                    setValues({...values, priority: newPriority});
                }}>

                    <Chip label={values.priority ? MissionPriority[values.priority].toUpperCase() : 'SET PRIORITY'}
                          color={translatePriorityToColor(values.priority)} variant="outlined"
                          icon={values.priority ? <br/> : <PriorityHighIcon/>}/>
                </IconButton>}

                subheader={MissionUpdateOperation[operation] + " Mission: #" + values.id}
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
                            onChange={(value: Date | null) => handleChange('date', value && value.getTime())}
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
                <FormControl fullWidth className="operationButtons" onClick={() => dispatch(closeModal())}>
                    {operation === MissionUpdateOperation.Update && (<>
                        <Button size="small"
                                color="error"
                                variant="contained"
                                onClick={() => dispatch(removeMission(values))}>Delete Mission</Button>
                        <Button size="small"
                                color={"success"}
                                variant="contained"
                                onClick={() => dispatch(updateMission(values))}>Update Mission</Button>
                    </>)
                    }
                    {operation === MissionUpdateOperation.Add && (<>
                        <Button size="small"
                                color="error"
                                variant="contained"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleChange('clear');
                                }}>Clear</Button>
                        <Button size="small"
                                color={"success"}
                                variant="contained"
                                onClick={() => dispatch(addMission(values))}>Add Mission</Button>
                    </>)
                    }
                </FormControl>
            </CardContent>
        </Card>
    );

}