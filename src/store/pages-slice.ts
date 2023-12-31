import { createSlice } from "@reduxjs/toolkit"
import dayjs from "dayjs"


export const initialPagesState = {
    numberOfPages: 2,
    pages: [
        {
            pageNumber: 1,
            startTime: dayjs('2022-04-17T09:00'),
            endTime: dayjs('2022-04-17T18:00'),
        }
    ]
}


const pagesSlice = createSlice({
    name: "pages",
    initialState: initialPagesState,
    reducers: {
        setPages(state, action) {
            return action.payload
        },
    }
})

export const pagesActions = pagesSlice.actions

export default pagesSlice.reducer