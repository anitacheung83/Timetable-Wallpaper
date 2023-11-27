import { render, screen } from '@testing-library/react';
import Setting from './Setting';
import { renderWithProviders } from '../../../utils/test-utils';
import { initialTimetableState } from '../../../store/timetable-slice';
import { initialIphoneState } from '../../../store/settings-slice';
import { initialPagesState } from '../../../store/pages-slice';
import { initialStylingState } from '../../../store/styling-slice';

describe("Setting", () => {
    test("renders Setting component", () => {
        renderWithProviders(<Setting />, {
            preloadedState: {
                settings: initialIphoneState,
                courses: [],
                timetable: initialTimetableState,
                pages: initialPagesState,
                styling: initialStylingState
            }
        })

        expect(screen.getByTestId("setting")).toBeInTheDocument()
    })
})