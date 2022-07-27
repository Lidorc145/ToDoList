import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import {MissionState} from "../mission/missionSlice";

export interface ModalState {
    open:boolean;
    data:MissionState|any;
}

const initialState: ModalState = {
    open: false,
    data: null
};


export const modalSlice = createSlice({
    name: 'Modal',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        updateMissionData:(state, action: PayloadAction<any>)=>{
            console.log("^^^^^",action.payload.data);
            state.data = action.payload.data;
        },
        closeModal:(state)=>{
            state.open = false;
        },
        openModal:(state)=>{
            state.open = true;
        },

    },
});

export const { updateMissionData,closeModal,openModal } = modalSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const getMissionData = (state: RootState) => state.modalReducer.data;
export const isModalOpen = (state: RootState) => state.modalReducer.open===true;


export default modalSlice.reducer;
