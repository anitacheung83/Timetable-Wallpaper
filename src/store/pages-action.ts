import { RootState } from ".";
import { ThunkAction } from 'redux-thunk';
import { pagesActions } from "./pages-slice";
import { SetPagesAction } from "./index";
// import { IPAD_LENGTH_LIMIT, IPHONE_LENGTH_LIMIT, IPHONE_WITH_WIDGETS_LENGTH_LIMIT } from "../data/constants"
import { getDeviceConstant } from "../utils/getDeviceConstant";


function generatePages(startTime: any, endTime: any, numberOfRows: number): any {
    let pages = []
    let remainingTime = endTime.diff(startTime, 'hour') + 1
    let currPageNumber = 1

    while (remainingTime > 0) {
        const pageStartTime = startTime
        const pageEndTime = startTime.add(Math.min(remainingTime, numberOfRows) - 1, 'hour')
        const page = {
            pageNumber: currPageNumber,
            startTime: pageStartTime,
            endTime: pageEndTime
        }

        pages.push(page)
        currPageNumber += 1
        remainingTime -= numberOfRows
        startTime = pageEndTime.add(1, 'hour')
    }

    return pages;

}

export const getPages = (): ThunkAction<void, RootState, void, SetPagesAction> => {
    return (dispatch, getState) => {
        const state = getState();
        const startTime = state.styling.startTime;
        const startTimeHour = startTime.hour();
        const endTime = state.styling.endTime;
        const title = state.styling.title;
        //Need to add one because the end time is inclusive
        const endTimeHour = endTime.hour() + 1;
        const courseGridHeight = state.settings.courseGridHeight;
        const device = state.settings.device;
        const widgets = state.settings.widgets;

        const timetableObject = document.getElementById("timetable")
        const timetableHeight = timetableObject?.offsetHeight
        const timetableWidth = timetableObject?.offsetWidth
        console.log("timetable Height", timetableHeight)
        console.log("timetable Width", timetableWidth)

        // 1. Set the limit
        let { LENGTH_LIMIT: limit } = getDeviceConstant(device, widgets)

        if (title) {
            limit -= 19
        }
        // let limit = setTheLimit(device, widgets)

        // 2. Calculate number of rows
        const numberOfRows = Math.floor(limit / courseGridHeight)

        // 3. Calculate number of pages startTime and endTime
        // +1 for blank page
        const numberOfPages = Math.ceil((endTimeHour - startTimeHour) / numberOfRows) + 1

        //4. Generate pages
        let pages = generatePages(startTime, endTime, numberOfRows)

        const pagesInfo = {
            numberOfPages: numberOfPages,
            currPage: 1,
            pages: pages
        }

        dispatch(pagesActions.setPages(pagesInfo));

    }
}