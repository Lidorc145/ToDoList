import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import {MissionPriority, MissionStatus} from "../../common/Enums";

export interface MissionState {
  id?: number;
  date?: number;
  category?: string;
  title?: string;
  priority?: MissionPriority;
  status?: MissionStatus;
  description?: string;
}
export interface MissionListState {
  MissionListState: MissionState[];
}


const initialState: MissionListState = {
  MissionListState: new Array({
    id: 0,
    date: new Date().getTime(),
    category: "Personal",
    title: "Complete Home Work",
    priority: MissionPriority.High,
    status: MissionStatus.InProgress,
    description: 'Complete all assignments before August.'
  })
};

let id =1;
export const missionSlice = createSlice({
  name: 'MissionList',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    initializeMissions: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.MissionListState.push({
        id: id++,
        date: new Date().getDate(),
        category: "Personal",
        title: "Complete Home Work",
        priority: MissionPriority.High,
        status: MissionStatus.InProgress,
        description: 'Complete all assignments before August.'
      });
      state.MissionListState.push({
        id: id++,
        date: 5146,
        category: "Work",
        title: "Search Feature",
        priority: MissionPriority.Normal,
        status: MissionStatus.Waiting,
        description: "add ability to search in tasks."
      });
      state.MissionListState.push({
        id: id++,
        date: new Date().getDate()+81486,
        category: "Work",
        title: "Add new To Do",
        priority: MissionPriority.Highest,
        status: MissionStatus.Waiting,
        description: "add ability to add new tasks."
      });
    },
    updateMissionStatus:(state, action: PayloadAction<any>)=>{
      const index = state.MissionListState.findIndex(x=> x.id===action.payload.id);
      state.MissionListState[index].status = action.payload.status;
    },
    updateMissionPriority:(state, action: PayloadAction<any>)=>{
      const index = state.MissionListState.findIndex(x=> x.id===action.payload.id);
      state.MissionListState[index].priority = (action.payload.priority+1)%7;
    },
    editMission: (state) => {

    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    addMission: (state, action: PayloadAction<MissionState>) => {
       state.MissionListState.push({id: id++, ...action.payload});
    },
  },
});

export const { initializeMissions,updateMissionStatus,updateMissionPriority, editMission, addMission } = missionSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const getMissions = (state: RootState) => state.MissionListState;

export default missionSlice.reducer;
