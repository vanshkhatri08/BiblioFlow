import { createSlice } from "@reduxjs/toolkit";

const popUpSlice = createSlice({
    name: "popUp",
    initialState: {
       settingPopup: false,
       addBookPopup: false,
       readBookPopup: false,
       recordBookPopup: false,
       returnBookPopup: false,
       addNewAdminPopup: false,
    },
    reducers: {
        toggleSettingPopup(state){
            state.settingPopup = !state.settingPopup;
        },
        toggleAddBookPopup(state) {
            state.addBookPopup = !state.addBookPopup;
        },
        toggleReadBookPopup(state) {
            state.readBookPopup = !state.readBookPopup;
        },
        toggleRecordBookPopup(state) {
            state.recordBookPopup = !state.recordBookPopup;
        },
        toggleAddNewAdminPopup(state) {
            state.addNewAdminPopup = !state.addNewAdminPopup;
        },
        toggleReturnBookPopup(state) {
            state.returnBookPopup = !state.returnBookPopup;
        },
        closeAllPopups(state) {
            state.addBookPopup = false;
            state.addNewAdminPopup = false;
            state.readBookPopup = false;
            state.recordBookPopup = false;
            state.returnBookPopup = false;
            state.settingPopup = false;
        }
    },
});

export const { toggleSettingPopup, toggleAddBookPopup, toggleReadBookPopup, toggleRecordBookPopup, toggleAddNewAdminPopup, toggleReturnBookPopup, closeAllPopups } = popUpSlice.actions;
export default popUpSlice.reducer;
