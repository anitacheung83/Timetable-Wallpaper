import { render, screen } from '@testing-library/react';
import { renderWithProviders } from '../../../../utils/test-utils';
import SelectATheme from './SelectATheme';
import { initialIphoneState } from '../../../../store/settings-slice';
import { initialTimetableState } from '../../../../store/timetable-slice';
import { initialPagesState } from '../../../../store/pages-slice';
import { initialThemeState } from '../../../../store/theme-slice';
import { initialStylingState } from '../../../../store/styling-slice';
import { DarkModeContext } from '../../../../context/DarkModeContext';


describe('SelectATheme', () => {
    test('renders SelectATheme component', () => {
        renderWithProviders(
            <DarkModeContext.Provider value={{ darkMode: false, setDarkMode: () => { } }}>
                <SelectATheme />
            </DarkModeContext.Provider>
            , {
                preloadedState: {
                    settings: initialIphoneState,
                    courses: [],
                    timetable: initialTimetableState,
                    pages: initialPagesState,
                    styling: initialStylingState,
                    theme: initialThemeState
                }
            });
        expect(screen.getByTestId('selectATheme')).toBeInTheDocument()
    })
    //Select A Theme is still a work in progress
})