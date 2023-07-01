import { configureStore } from "@reduxjs/toolkit";
import hospitalReducer from './HospitalSlice';

const store = configureStore({
    reducer:{ //javascript fuction
        users:hospitalReducer,//information in state from the export of interSlice
    },
});

export default store;