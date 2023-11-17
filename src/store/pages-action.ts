import { RootState } from ".";
import { ThunkAction } from 'redux-thunk';
import { pagesActions } from "./pages-slice";
import { SetPagesAction } from "./index";
// import { IPAD_LENGTH_LIMIT, IPHONE_LENGTH_LIMIT, IPHONE_WITH_WIDGETS_LENGTH_LIMIT } from "../data/constants"
import { iPadSettingsConstants, iPhoneSettingsConstants, iPhoneWithWidgetsSettingsConstants, letterSettingsConstants } from "../data/developerSettingsConstants";
import { getDeviceConstant } from "../utils/getDeviceConstant";

const { LENGTH_LIMIT: IPAD_LENGTH_LIMIT } = iPadSettingsConstants;
const { LENGTH_LIMIT: IPHONE_LENGTH_LIMIT } = iPhoneSettingsConstants;
const { LENGTH_LIMIT: IPHONE_WITH_WIDGETS_LENGTH_LIMIT } = iPhoneWithWidgetsSettingsConstants;
const { LENGTH_LIMIT: LETTER_LENGTH_LIMIT } = letterSettingsConstants;



function setTheLimit(device: string, widgets: boolean): number {
    if (device === "iphone" && widgets) {
        return IPHONE_WITH_WIDGETS_LENGTH_LIMIT;
    } else if (device === "iphone" && !widgets) {
        return IPHONE_LENGTH_LIMIT;
    } else if (device === "ipad") {
        return IPAD_LENGTH_LIMIT;
    } else {
        return IPHONE_LENGTH_LIMIT;
    }
}

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
        const device = state.settings.device;
        // const device = "letter";
        const startTime = state.settings.startTime;
        const startTimeHour = startTime.hour();
        const endTime = state.settings.endTime;
        //Need to add one because the end time is inclusive
        const endTimeHour = endTime.hour() + 1;
        const courseGridHeight = state.settings.courseGridHeight;
        const widgets = state.settings.widgets;

        // 1. Set the limit
        let { LENGTH_LIMIT: limit } = getDeviceConstant(device, widgets)
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