import React, { PropsWithChildren } from 'react'
import { render } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import type { PreloadedState } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { courseInfo } from "../interfaces/coursesInterfaces";

import type { AppStore, RootState } from '../store/index'
// As a basic setup, import your same slice reducers
import coursesReducer from '../store/courses-slice'
import settingsReducer, { initialIphoneState } from '../store/settings-slice'
import timetableReducer, { initialTimetableState } from '../store/timetable-slice'
import pagesReducer, { initialPagesState } from '../store/pages-slice'

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
    preloadedState?: PreloadedState<RootState>
    store?: AppStore
}

export function renderWithProviders(
    ui: React.ReactElement,
    {
        preloadedState = { settings: initialIphoneState, courses: [] as courseInfo[], timetable: initialTimetableState, pages: initialPagesState },
        // Automatically create a store instance if no store was passed in
        store = configureStore({ reducer: { courses: coursesReducer, settings: settingsReducer, timetable: timetableReducer, pages: pagesReducer }, preloadedState }),
        ...renderOptions
    }: ExtendedRenderOptions = {}
) {
    function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
        return <Provider store={store}>{children}</Provider>
    }

    // Return an object with the store and all of RTL's query functions
    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}



// import React, { PropsWithChildren, ReactElement } from 'react'
// import { render } from '@testing-library/react'
// import type { RenderOptions } from '@testing-library/react'
// import { configureStore } from '@reduxjs/toolkit'
// import type { PreloadedState } from '@reduxjs/toolkit'
// import { Provider } from 'react-redux'

// import type { AppStore, RootState } from '../store'

// import coursesReducer from '../store/courses-slice'

// interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
//     preloadedState?: PreloadedState<RootState>
//     store?: AppStore
// }

// export function renderWithProviders(
//     ui: ReactElement, {
//         preloadedState= {},
//         store = configureStore({
//             reducer:{
//                 courses: coursesReducer
//             }, 
//             preloadedState 
//         }),
//         ...renderOptions
//     }: ExtendedRenderOptions = {}
// ){
//     function Wrapper({children}: PropsWithChildren<{}>): JSX.Element {
//         return <Provider store={store}>{children}</Provider>
//     }

//     return {
//         store,
//         ...render(ui, {wrapper:Wrapper, ...renderOptions})
//     }
// }