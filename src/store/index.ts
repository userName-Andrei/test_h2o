import { configureStore } from "@reduxjs/toolkit";
import commonBaseReduser from "../pages/CommonBase/CommonBaseSlice";

const store = configureStore({
    reducer: {
        common_base: commonBaseReduser,
    },
    devTools: process.env.NODE_ENV !== "development" ? false : true,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
