import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import {MissionPriority, MissionStatus} from "../../common/Enums";
import { LoremIpsum } from "lorem-ipsum";
import {useSelector} from "react-redux";
import {useMemo, useState} from "react";
// const LoremIpsum = require("lorem-ipsum").LoremIpsum;

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
});


export interface MissionState {
  id?: number;
  date?: number;
  category?: string;
  title?: string;
  priority: MissionPriority;
  status?: MissionStatus;
  description?: string;
}
export interface SearchMission {
  FilteredMissions: MissionState[];
  text: string;
}

export interface MissionListState {
  MissionListState: MissionState[];
  Search: SearchMission;
}
let id =0;
const category = ["Personal", "Work","Education", "Family"]
const getRandomMission=()=>{
  const randomCategoryId = Math.floor(Math.random() * category.length);
   return {
      id: id++,
          date: Math.floor(Math.random() * (new Date().getTime())),
        category: category[randomCategoryId],
        title: lorem.generateSentences(1),
        priority: Math.floor(Math.random() * (7)),
        status: Math.floor(Math.random() * (4)),
        description: lorem.generateParagraphs(7),
    }
}

const initialState: MissionListState = {
  MissionListState: new Array(getRandomMission()),
  Search: {FilteredMissions: new Array(), text: ''}
};


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
      // @ts-ignore
      for (let i = 0; i < 6; i++) {
        state.MissionListState.push(getRandomMission());
      }
    },
    updateMissionStatus:(state, action: PayloadAction<any>)=>{
      const index = state.MissionListState.findIndex(x=> x.id===action.payload.id);
      state.MissionListState[index].status = action.payload.status;
    },
    updateMission:(state, action: PayloadAction<any>)=>{
      const index = state.MissionListState.findIndex(x=> x.id===action.payload.id);
      state.MissionListState[index] = {...(action.payload)};
    },
    updateMissionPriority:(state, action: PayloadAction<any>)=>{
      const index = state.MissionListState.findIndex(x=> x.id===action.payload.id);
      state.MissionListState[index].priority =(action.payload.priority+1)%7;
    },
    searchMission:(state, action: PayloadAction<any>)=>{
      state.Search.text = action.payload.text;
      if(action.payload.text.length>0) {
        state.Search.FilteredMissions = state.MissionListState.filter((mission: MissionState) => JSON.stringify(mission).toLowerCase().includes(action.payload.text.toLowerCase()));
      }else{
        state.Search.FilteredMissions = new Array();
      }

    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    addMission: (state, action: PayloadAction<MissionState>) => {
      state.MissionListState.push({id: id++, ...action.payload});
    },
    removeMission:(state, action: PayloadAction<any>)=>{
      state.MissionListState=state.MissionListState.filter(x=> x.id!=action.payload.id);
    },
    sortMissions:(state,action: PayloadAction<any>)=> {
      const attribute = action.payload.attribute;
      if (state.Search.text.length > 0) {
        state.Search.FilteredMissions = state.Search.FilteredMissions.sort(function (a:MissionState, b:MissionState) {
          // @ts-ignore
          return action.payload.func((b[attribute]),(a[attribute]));
        });
      } else {
        state.MissionListState = state.MissionListState.sort(function (a:MissionState, b:MissionState) {
          // @ts-ignore
          return action.payload.func((b[attribute]),(a[attribute]));
        });
      }
    }
  },
});

export const { initializeMissions,sortMissions,searchMission, removeMission, updateMission,updateMissionStatus,updateMissionPriority, addMission } = missionSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const getMissions = (state: RootState) => state.missionReducer.MissionListState;
export const getSearchResults = (state: RootState) => state.missionReducer.Search.FilteredMissions ;
export const getMissionByID = (state: RootState) => state.missionReducer.MissionListState.filter(mission=>mission.id===0);

export default missionSlice.reducer;
