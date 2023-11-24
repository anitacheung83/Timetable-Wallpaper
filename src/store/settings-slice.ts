import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import dayjs, { Dayjs } from "dayjs";
import { DaysRange } from "../interfaces/settingsInterfaces"
import { TimetableSettings } from "../interfaces/settingsInterfaces"

const initialIphoneDays = {
    mon: true,
    tue: true,
    wed: true,
    thu: true,
    fri: true,
    sat: false,
    sun: false
}

export const initialIphoneState: TimetableSettings = {
    device: 'iphone',
    daysRange: initialIphoneDays,
    startTime: dayjs('2022-04-17T09:00'),
    endTime: dayjs('2022-04-17T17:00'),
    backgroundColor: "#D6D0C2",
    headerColor: "#C2B8A3",
    textColor: "#000000",
    courseGridWidth: 49,
    courseGridHeight: 49,
    clockType: '12 Hour',
    displayTime: true,
    widgets: true
}

const initialIpadDays = {
    mon: true,
    tue: true,
    wed: true,
    thu: true,
    fri: true,
    sat: true,
    sun: true
}

export const initialIpadState: TimetableSettings = {
    device: 'ipad',
    daysRange: initialIpadDays,
    startTime: dayjs('2022-04-17T09:00'),
    endTime: dayjs('2022-04-17T17:00'),
    backgroundColor: "#D6D0C2",
    headerColor: "#C2B8A3",
    textColor: "#000000",
    courseGridWidth: 90,
    courseGridHeight: 44,
    clockType: '12 Hour',
    displayTime: true,
    widgets: true //Widgets not needed for iPad
}

export const initialLetterState: TimetableSettings = {
    device: "letter",
    daysRange: initialIpadDays,
    startTime: dayjs('2022-04-17T09:00'),
    endTime: dayjs('2022-04-17T17:00'),
    backgroundColor: "#D6D0C2",
    headerColor: "#C2B8A3",
    textColor: "#000000",
    courseGridWidth: 76,
    courseGridHeight: 49,
    clockType: '12 Hour',
    displayTime: true,
    widgets: true //Widgets not needed for letter
}

export const initialA4State: TimetableSettings = {
    device: "a4",
    daysRange: initialIpadDays,
    startTime: dayjs('2022-04-17T09:00'),
    endTime: dayjs('2022-04-17T17:00'),
    backgroundColor: "#D6D0C2",
    headerColor: "#C2B8A3",
    textColor: "#000000",
    courseGridWidth: 76,
    courseGridHeight: 49,
    clockType: '12 Hour',
    displayTime: true,
    widgets: true //Widgets not needed for A4
}

const settingsSlice = createSlice({
    name: 'settings',
    initialState: initialIphoneState,
    reducers: {
        setDaysRange(state, action: PayloadAction<DaysRange>) {
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
        setTextColor(state, action: PayloadAction<string>) {
            state.textColor = action.payload
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
        setWidgets(state, action: PayloadAction<boolean>) {
            state.widgets = action.payload
        },
        resetToDefault(state) {
            if (state.device === 'iphone') {
                return initialIphoneState
            } else if (state.device === 'ipad') {
                return initialIpadState
            } else if (state.device === 'letter') {
                return initialLetterState
            } else {
                return initialA4State
            }
        },
        setSettings(state, action) {
            state = action.payload
        },
        sendSettings(state) {
            if (state.device === 'iphone') {
                localStorage.setItem("iphoneSettings", JSON.stringify(state))
            } else if (state.device === 'ipad') {
                localStorage.setItem("ipadSettings", JSON.stringify(state))
            } else if (state.device === 'letter') {
                localStorage.setItem("letterSettings", JSON.stringify(state))
            } else {
                localStorage.setItem("a4Settings", JSON.stringify(state))
            }
        },
        fetchSettings(state, action) {
            let localSettings;
            if (action.payload === 'iphone') {
                localSettings = localStorage.getItem("iphoneSettings")
            } else if (action.payload === 'ipad') {
                localSettings = localStorage.getItem("ipadSettings")
            } else if (action.payload === 'letter') {
                localSettings = localStorage.getItem("letterSettings")
            } else {
                localSettings = localStorage.getItem("a4Settings")
            }
            if (localSettings) {
                let settings = JSON.parse(localSettings)
                state.device = settings.device
                state.daysRange = settings.daysRange
                state.startTime = dayjs(settings.startTime)
                state.endTime = dayjs(settings.endTime)
                state.backgroundColor = settings.backgroundColor
                state.headerColor = settings.headerColor
                state.courseGridWidth = settings.courseGridWidth
                state.courseGridHeight = settings.courseGridHeight
                state.clockType = settings.clockType
                state.displayTime = settings.displayTime
                state.widgets = settings.widgets
            } else {
                if (action.payload === 'iphone') {
                    return initialIphoneState
                } else if (action.payload === 'ipad') {
                    return initialIpadState
                } else if (action.payload === 'letter') {
                    return initialLetterState
                } else {
                    return initialA4State

                }
            }
        }
    }
})

export const settingsActions = settingsSlice.actions;

export default settingsSlice.reducer

// window.dispatchEvent(new Event('setting'))