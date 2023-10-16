import { configureStore } from "@reduxjs/toolkit"
import settingsReducer from "./settings-slice"
import coursesReducer from "./courses-slice"
import timetableReducer from "./timetable-slice"
import thunk from 'redux-thunk';
import { useDispatch as useReduxDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

export interface UpdateTimetableAction {
    type: string;
    payload: any; // Replace with your actual payload type
}

const store = configureStore({
    reducer: { settings: settingsReducer, courses: coursesReducer, timetable: timetableReducer },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(thunk),

})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useDispatch: () => AppDispatch = useReduxDispatch;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;