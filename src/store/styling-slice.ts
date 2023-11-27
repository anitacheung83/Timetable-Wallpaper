import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { StylingState } from "../interfaces/stylingInterfaces"
import dayjs, { Dayjs } from "dayjs"

export const initialStylingState: StylingState = {
    title: "",
    startTime: dayjs('2022-04-17T09:00'),
    endTime: dayjs('2022-04-17T21:00'),
    backgroundColor: "#D6D0C2",
    headerColor: "#C2B8A3",
    textColor: "#000000",
    clockType: '12 Hour',
    displayTime: true,
}

const stylingSlice = createSlice({
    name: 'style',
    initialState: initialStylingState,
    reducers: {
        setTitle(state, action: PayloadAction<string>) {
            state.title = action.payload
        },
        setStartTime(state, action: PayloadAction<Dayjs>) {
            state.startTime = dayjs(action.payload)
        },
        setEndTime(state, action: PayloadAction<Dayjs>) {
            state.endTime = dayjs(action.payload)
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
        setClockType(state, action: PayloadAction<"12 Hour" | "24 Hour">) {
            state.clockType = action.payload
        },
        setDisplayTime(state, action: PayloadAction<boolean>) {
            state.displayTime = action.payload
        },
        resetToDefault() {
            return initialStylingState
        },
        setStyling(state, action: PayloadAction<StylingState>) {
            state = action.payload
        },
        sendStyling(state) {
            localStorage.setItem('styling', JSON.stringify(state))
        },
        fetchStyling(state) {
            const localStyle = localStorage.getItem('styling')
            if (localStyle) {
                let style = JSON.parse(localStyle)
                state.title = style.title
                state.startTime = dayjs(style.startTime)
                state.endTime = dayjs(style.endTime)
                state.backgroundColor = style.backgroundColor
                state.headerColor = style.headerColor
                state.textColor = style.textColor
                state.clockType = style.clockType
                state.displayTime = style.displayTime
            }
        }
    }
})

export const stylingActions = stylingSlice.actions
export default stylingSlice.reducer
