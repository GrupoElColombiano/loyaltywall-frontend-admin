import { createSlice } from "@reduxjs/toolkit";

export const sitesSlice = createSlice({
    name: "sites",
    initialState: {
        status: "checking",
        uid: null,
        email: null,
        displayName: null,
        photoURL: null,
        errorMessage: null,
    },
    reducers: {
    // login: (state, action) => ({
    //   ...state,
    // }),
    // logout: (state, payload) => ({
    //   ...state,
    // }),
    // checkingCredentials: (state) => ({
    //   ...state,
    //   status: "checking",
    // }),
    },
});

// export const { login, logout, checkingCredentials } = sitesSlice.actions;
