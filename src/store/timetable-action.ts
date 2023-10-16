import { useSelector } from "react-redux";
import { formatTimetableInfos, generateTimetables } from "../utils/formatTimetable";
import { timetableActions, timetableActionsType } from "./timetable-slice";
import { settingsActions } from "./settings-slice";
import { Dispatch } from "@reduxjs/toolkit";
import { RootState } from ".";
import { ThunkAction } from 'redux-thunk'
import { UpdateTimetableAction } from "./index";



export const getTimetable = (): ThunkAction<void, RootState, void, UpdateTimetableAction> => {
    return (dispatch, getState) => {
        const state = getState();
        const coursesData = state.courses;
        const device = state.settings.device;
        const daysRange = state.settings.daysRange;
        const startTime = state.settings.startTime;
        const endTime = state.settings.endTime;
        const courseGridHeight = state.settings.courseGridHeight;
        const pages = state.pages.pages;

        // const timetableInfos = formatTimetableInfos(coursesData, daysRange, startTime, endTime);
        const timetables = generateTimetables(coursesData, daysRange, device, courseGridHeight, startTime, endTime, pages);

        dispatch(timetableActions.updateTimetable(timetables));
    };
};