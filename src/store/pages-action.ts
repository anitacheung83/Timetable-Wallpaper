import { RootState } from ".";
import { ThunkAction } from 'redux-thunk';
import { pagesActions } from "./pages-slice";
import { SetPagesAction } from "./index";
import { IPAD_LENGTH_LIMIT, IPHONE_LENGTH_LIMIT, IPHONE_WITH_WIDGETS_LENGTH_LIMIT } from "../data/constants"


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

    const page1 = {
        pageNumber: 1,
        startTime: startTime,
        endTime: startTime.add(numberOfRows, 'hour')
    }
    pages.push(page1)

    const page2 = {
        pageNumber: 2,
        startTime: startTime.add(numberOfRows, 'hour'),
        endTime: endTime
    }
    pages.push(page2)

    return pages
}

export const getPages = (): ThunkAction<void, RootState, void, SetPagesAction> => {
    return (dispatch, getState) => {
        const state = getState();
        const device = state.settings.device;
        const startTime = state.settings.startTime;
        const endTime = state.settings.endTime;
        const courseGridHeight = state.settings.courseGridHeight;
        const widgets = state.settings.widgets;

        console.log("get pages called")

        // 1. Set the limit
        let limit = setTheLimit(device, widgets)

        // 2. Calculate number of rows
        const numberOfRows = Math.floor(limit / courseGridHeight)

        // 3. Calculate number of pages startTime and endTime
        const numberOfPages = Math.ceil((endTime.diff(startTime, 'hour', true)) / numberOfRows)

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