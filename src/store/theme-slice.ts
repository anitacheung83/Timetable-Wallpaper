import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SESAME } from "../data/themeConstants";
import { getTheme } from "../utils/stylingTheme";

export const initialThemeState = SESAME


const themeSlice = createSlice({
    name: 'theme',
    initialState: initialThemeState,
    reducers: {
        setTheme(state, action: PayloadAction<string>) {
            localStorage.setItem('theme', action.payload)
            return getTheme(action.payload)
        },
        fetchTheme(state) {
            const localTheme = localStorage.getItem('theme')
            if (localTheme) {
                state = getTheme(localTheme)
            }
        },
        addUsedColor(state, action: PayloadAction<string>) {
            state.USED_COLORS.push(action.payload)
            console.log(state.USED_COLORS)
        },
        removeUsedColor(state, action: PayloadAction<string>) {
            console.log(action.payload)
            state.USED_COLORS = state.USED_COLORS.filter(color => color !== action.payload)
        },


    }
})

export const themeActions = themeSlice.actions
export default themeSlice.reducer