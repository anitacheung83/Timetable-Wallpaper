import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import dayjs, { Dayjs } from "dayjs";

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

const initialDays = {
    mon: true,
    tue: true,
    wed: true,
    thu: true,
    fri: true,
    sat: false,
    sun: false
}

const initialState: TimetableSettings = {
    daysRange: initialDays,
    startTime: dayjs('2022-04-17T09:00'),
    endTime: dayjs('2022-04-17T18:00'),
    backgroundColor: "#E6DDC6",
    headerColor: "#C2B8A3",
    courseGridWidth: 49,
    courseGridHeight: 49,
    clockType: '12 Hour',
    displayTime: true
}

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setDaysRange(state, action: PayloadAction<DaysRange>) {
            console.log("daysRange")
            state.daysRange = action.payload
        },
        setStartTime(state, action: PayloadAction<Dayjs>) {
            state.startTime = action.payload
        },
        setEndTime(state, action: PayloadAction<Dayjs>) {
            state.endTime = action.payload
        },
        setBackgroundColor(state, action: PayloadAction<string>) {
            state.backgroundColor = action.payload
        },
        setHeaderColor(state, action: PayloadAction<string>) {
            state.headerColor = action.payload
        },
        setCourseGridWidth(state, action: PayloadAction<number>) {
            state.courseGridWidth = action.payload
        },
        setCourseGridHeight(state, action: PayloadAction<number>) {
            state.courseGridHeight = action.payload
        },
        setClockType(state, action: PayloadAction<"12 Hour" | "24 Hour">) {
            state.clockType = action.payload
        },
        setDisplayTime(state, action: PayloadAction<boolean>) {
            state.displayTime = action.payload
        },
        resetToDefault(state) {
            return initialState
        },
        setSettings(state, action) {
            state = action.payload
        },
        sendSettings(state) {
            localStorage.setItem("settings", JSON.stringify(state))
        },
        fetchSettings(state) {
            let localSettings = localStorage.getItem("settings")
            if (localSettings) {
                let settings = JSON.parse(localSettings)
                state.daysRange = settings.daysRange
                state.startTime = dayjs(settings.startTime)
                state.endTime = dayjs(settings.endTime)
                state.backgroundColor = settings.backgroundColor
                state.headerColor = settings.headerColor
                state.courseGridWidth = settings.courseGridWidth
                state.courseGridHeight = settings.courseGridHeight
                state.clockType = settings.clockType
                state.displayTime = settings.displayTime
            }
        }
    }
})

export const settingsActions = settingsSlice.actions;

export default settingsSlice.reducer

// window.dispatchEvent(new Event('setting'))