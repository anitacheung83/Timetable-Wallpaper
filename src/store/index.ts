import { configureStore, PreloadedState } from "@reduxjs/toolkit"
import settingsReducer from "./settings-slice"
import coursesReducer from "./courses-slice"
import timetableReducer from "./timetable-slice"
import pagesReducer from "./pages-slice"
import thunk from 'redux-thunk';
import { useDispatch as useReduxDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

export interface UpdateTimetableAction {
    type: string;
    payload: any;
}

export interface SetPagesAction {
    type: string;
    payload: any;
}

const store = configureStore({
    reducer: { settings: settingsReducer, courses: coursesReducer, timetable: timetableReducer, pages: pagesReducer },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(thunk),

})

export function setupStore(preloadedState?: PreloadedState<RootState>) {
    return configureStore({
        reducer: { settings: settingsReducer, courses: coursesReducer, timetable: timetableReducer, pages: pagesReducer },
        middleware: getDefaultMiddleware =>
            getDefaultMiddleware({
                serializableCheck: false,
            }).concat(thunk),
        preloadedState
    })
}

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = typeof store.dispatch

export const useDispatch: () => AppDispatch = useReduxDispatch;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;