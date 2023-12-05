import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const initialThemeState = "Sesame"


const themeSlice = createSlice({
    name: 'theme',
    initialState: initialThemeState,
    reducers: {
        setTheme(state, action: PayloadAction<string>) {
            localStorage.setItem('theme', action.payload)
            return action.payload
        },
        fetchTheme(state) {
            const localTheme = localStorage.getItem('theme')
            if (localTheme) {
                state = localTheme
            }
        }
    }
})

export const themeActions = themeSlice.actions
export default themeSlice.reducer