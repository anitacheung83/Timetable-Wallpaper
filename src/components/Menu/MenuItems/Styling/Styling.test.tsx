import { render, screen } from '@testing-library/react';
import { renderWithProviders } from '../../../../utils/test-utils';
import { initialStylingState } from '../../../../store/styling-slice';
import { initialPagesState } from '../../../../store/pages-slice';
import { initialTimetableState } from '../../../../store/timetable-slice';
import { initialIphoneState } from '../../../../store/settings-slice';
import { initialThemeState } from '../../../../store/theme-slice';
import { DarkModeContext } from '../../../../context/DarkModeContext';

import Styling from './Styling';

describe('Styling', () => {
    test('renders Styling component', () => {
        renderWithProviders(
            <DarkModeContext.Provider value={{ darkMode: false, setDarkMode: () => { } }}>
                <Styling />
            </DarkModeContext.Provider>
            , {
                preloadedState: {
                    settings: initialIphoneState,
                    courses: [],
                    styling: initialStylingState,
                    pages: initialPagesState,
                    timetable: initialTimetableState,
                    theme: initialThemeState
                }
            });

        expect(screen.getByTestId('styling')).toBeInTheDocument()
        // exact false because of the Typography component
        expect(screen.getByText('Title', { exact: false })).toBeInTheDocument()
        expect(screen.getByText('Start Time', { exact: false })).toBeInTheDocument()
        expect(screen.getByText('End Time', { exact: false })).toBeInTheDocument()
        expect(screen.getByText('Background Color', { exact: false })).toBeInTheDocument()
    });
});
