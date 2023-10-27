import { formatTimetableInfos } from "../utils/formatTimetable";
import { timetableActions } from "./timetable-slice";
import { RootState } from ".";
import { ThunkAction } from 'redux-thunk'
import { UpdateTimetableAction } from "./index";



export const getTimetable = (): ThunkAction<void, RootState, void, UpdateTimetableAction> => {
    return (dispatch, getState) => {
        const state = getState();
        const coursesData = state.courses;
        const daysRange = state.settings.daysRange;
        const startTime = state.settings.startTime;
        const endTime = state.settings.endTime;

        const timetableInfos = formatTimetableInfos(coursesData, daysRange, startTime, endTime);

        dispatch(timetableActions.updateTimetable(timetableInfos));
    };
};