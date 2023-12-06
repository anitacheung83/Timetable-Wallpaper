import { RootState } from "."
import { ThunkAction } from "redux-thunk"
import { themeActions } from "./theme-slice"
import { stylingActions } from "./styling-slice"
import { SetThemeAction } from "./index"
import { coursesActions } from "./courses-slice"
import { getTheme } from "../utils/stylingTheme"
import { getTimetable } from "./timetable-action";

export const setThemeColor = (theme: string): ThunkAction<void, RootState, void, SetThemeAction> => {
    return (dispatch, getState) => {
        const state = getState()
        const { COLORS } = getTheme(theme)
        const courses = state.courses
        dispatch(stylingActions.setBackgroundColor(COLORS[0]))
        dispatch(stylingActions.setHeaderColor(COLORS[1]))

        // Pointer to the next colour to be used 
        // i = 2 because the first two colours are used for the background and header
        let i = 2

        for (const course of courses) {
            const updatedCourse = {
                ...course,
                backgroundColour: COLORS[i],
                existed: true // This is to prevent the course is added to the timetable again
            };
            dispatch(coursesActions.addCourse(updatedCourse))

            i === COLORS.length - 1 ? i = 2 : i += 1
        }

        dispatch(themeActions.setTheme(theme))
        dispatch(stylingActions.sendStyling())
        dispatch(getTimetable())

    }
}