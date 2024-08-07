import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    error: null,
    loading: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: { 
        signInStart: (state) => {
            state.loading = true;
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        signInFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        updateUserStart: (state) => {
            state.loading = true;
        },
        updateUserSuccess: (state,action) => {
            state.currentUser = action.payload;   // we get it from the backend as the response
            state.loading = false;
            state.error = null;
        },
        updateUserFailure: (state,action) => {
            state.error = action.payload;
            state.loading = false;
        },
        signOutUserStart: (state) => {
            state.loading = true;
        },
        signOutUserSuccess: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        },
        signOutUserFailure: (state,action) => {
            state.error = action.payload;
            state.loading = false;
        },
    }
});

export const { signInStart, signInSuccess, signInFailure,  updateUserFailure, updateUserSuccess,updateUserStart, signOutUserFailure, signOutUserStart, signOutUserSuccess } = userSlice.actions;

export default userSlice.reducer;