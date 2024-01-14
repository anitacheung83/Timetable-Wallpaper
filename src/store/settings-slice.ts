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
    courseGridWidth: 49,
    courseGridHeight: 49,
    widgets: false
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
    courseGridWidth: 90,
    courseGridHeight: 44,
    widgets: true //Widgets not needed for iPad
}

export const initialLetterState: TimetableSettings = {
    device: "letter",
    daysRange: initialIpadDays,
    courseGridWidth: 76,
    courseGridHeight: 49,
    widgets: true //Widgets not needed for letter
}

export const initialA4State: TimetableSettings = {
    device: "a4",
    daysRange: initialIpadDays,
    courseGridWidth: 76,
    courseGridHeight: 49,
    widgets: true //Widgets not needed for A4
}

const settingsSlice = createSlice({
    name: 'settings',
    initialState: initialIphoneState,
    reducers: {
        setDaysRange(state, action: PayloadAction<DaysRange>) {
            state.daysRange = action.payload
        },
        setCourseGridWidth(state, action: PayloadAction<number>) {
            state.courseGridWidth = action.payload
        },
        setCourseGridHeight(state, action: PayloadAction<number>) {
            state.courseGridHeight = action.payload
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
                state.courseGridWidth = settings.courseGridWidth
                state.courseGridHeight = settings.courseGridHeight
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