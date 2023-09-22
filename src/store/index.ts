import { configureStore } from "@reduxjs/toolkit"
import settingsReducer from "./settings-slice"
import coursesReducer from "./courses-slice"
import timetableReducer from "./timetable-slice"
import dayjs, { Dayjs } from "dayjs";
import { haveCourseGrid } from "../components/TimetableTd/TimetableTd";
import thunk from 'redux-thunk';
import { useDispatch as useReduxDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

export interface DaysRange {
    mon: boolean,
    tue: boolean,
    wed: boolean,
    thu: boolean,
    fri: boolean,
    sat: boolean,
    sun: boolean,
}

export interface TimetableSettings {
    daysRange: DaysRange,
    startTime: Dayjs,
    endTime: Dayjs,
    backgroundColor: string,
    headerColor: string,
    courseGridWidth: number,
    courseGridHeight: number,
    clockType: '12 Hour' | '24 Hour',
    displayTime: boolean
}

export interface days {
    mon?: boolean,
    tue?: boolean,
    wed?: boolean,
    thu?: boolean,
    fri?: boolean,
    sat?: boolean,
    sun?: boolean
}

export interface meetingTime {
    courseType: string,
    location: string,
    startTime: Dayjs,
    endTime: Dayjs
    days: days
}

export interface courseInfo {
    id: string,
    courseCode: string,
    backgroundColour: string,
    meetingTimes: meetingTime[],
    existed: boolean
}

export interface timetableTdInsertion {
    // timetableTd: React.FunctionComponent<timetableTdProps>,
    timetableTdProps: null | haveCourseGrid
}

export interface timetableHours {
    6?: null | timetableTdInsertion,
    7?: null | timetableTdInsertion,
    8?: null | timetableTdInsertion,
    9?: null | timetableTdInsertion,
    10?: null | timetableTdInsertion,
    11?: null | timetableTdInsertion,
    12?: null | timetableTdInsertion,
    13?: null | timetableTdInsertion,
    14?: null | timetableTdInsertion,
    15?: null | timetableTdInsertion,
    16?: null | timetableTdInsertion,
    17?: null | timetableTdInsertion,
    18?: null | timetableTdInsertion,
    19?: null | timetableTdInsertion,
    20?: null | timetableTdInsertion,
    21?: null | timetableTdInsertion,
    22?: null | timetableTdInsertion,
    23?: null | timetableTdInsertion,

}

export interface timetableInfos {
    mon?: timetableHours,
    tue?: timetableHours,
    wed?: timetableHours,
    thu?: timetableHours,
    fri?: timetableHours,
    sat?: timetableHours,
    sun?: timetableHours

}

export interface UpdateTimetableAction {
    type: string;
    payload: any; // Replace with your actual payload type
}

// export interface RootState {
//     settings: TimetableSettings,
//     courses: courseInfo[],
//     timetable: timetableInfos
// }



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