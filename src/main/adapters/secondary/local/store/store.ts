import { configureStore } from "@reduxjs/toolkit";
import { sitesSlice } from "./sites/sitesSlice";

export const store = configureStore({
    reducer: {
        sites: sitesSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
