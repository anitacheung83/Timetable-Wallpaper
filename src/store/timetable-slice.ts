import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs"
import { generateEmptyTimetableInfos } from "../interfaces/timetableInterfaces";

const initialDaysRange = {
    mon: true,
    tue: true,
    wed: true,
    thu: true,
    fri: true,
    sat: false,
    sun: false
}


export const initialTimetableState = [generateEmptyTimetableInfos(initialDaysRange, dayjs('2022-04-17T09:00'), dayjs('2022-04-17T18:00'))]


const timetableSlice = createSlice({
    name: "timetable",
    initialState: initialTimetableState,
    reducers: {
        updateTimetable(state, action) {
            return action.payload
        }
    }
})

export const timetableActions = timetableSlice.actions
export const timetableActionsType = typeof timetableActions

export default timetableSlice.reducer