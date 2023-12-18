import { render, screen } from '@testing-library/react';
import Settings from './DisplaySettings';
import { renderWithProviders } from '../../../../utils/test-utils';
import { initialTimetableState } from '../../../../store/timetable-slice';
import { initialIphoneState } from '../../../../store/settings-slice';
import { initialPagesState } from '../../../../store/pages-slice';
import { initialStylingState } from '../../../../store/styling-slice';
import { initialThemeState } from '../../../../store/theme-slice';

describe("Setting", () => {
    test("renders Setting component", () => {
        // renderWithProviders(<Settings />, {
        //     preloadedState: {
        //         settings: initialIphoneState,
        //         courses: [],
        //         timetable: initialTimetableState,
        //         pages: initialPagesState,
        //         styling: initialStylingState,
        //         theme: initialThemeState
        //     }
        // })

        // expect(screen.getByTestId("setting")).toBeInTheDocument()
    })
})