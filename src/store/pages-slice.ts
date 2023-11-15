import { createSlice } from "@reduxjs/toolkit"
import dayjs from "dayjs"


export const initialPagesState = {
    numberOfPages: 2,
    currPage: 1,
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
        nextPage(state) {
            if (state.currPage < state.numberOfPages) {
                state.currPage += 1
            }
        },
        prevPage(state) {
            if (state.currPage > 1) {
                state.currPage -= 1
            }
        },
        setCurrPage(state, action) {
            state.currPage = action.payload
        }

    }
})

export const pagesActions = pagesSlice.actions

export default pagesSlice.reducer