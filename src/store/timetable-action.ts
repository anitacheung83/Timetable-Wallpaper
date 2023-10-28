import { generateTimetables } from "../utils/formatTimetable";
import { timetableActions } from "./timetable-slice";
import { RootState } from ".";
import { ThunkAction } from 'redux-thunk'
import { UpdateTimetableAction } from "./index";



export const getTimetable = (): ThunkAction<void, RootState, void, UpdateTimetableAction> => {
    return (dispatch, getState) => {
        const state = getState();
        const coursesData = state.courses;
        const daysRange = state.settings.daysRange;
        const pages = state.pages.pages;

        // const timetableInfos = formatTimetableInfos(coursesData, daysRange, startTime, endTime);
        const timetables = generateTimetables(coursesData, daysRange, pages);

        dispatch(timetableActions.updateTimetable(timetables));
    };
};