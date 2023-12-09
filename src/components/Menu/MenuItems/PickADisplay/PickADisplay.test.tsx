import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../../../../utils/test-utils';
import PickADisplay from './PickADisplay';
import { initialIphoneState } from '../../../../store/settings-slice';
import { initialTimetableState } from '../../../../store/timetable-slice';
import { initialPagesState } from '../../../../store/pages-slice';
import { initialStylingState } from '../../../../store/styling-slice';
import { initialThemeState } from '../../../../store/theme-slice';

describe('PickADisplay', () => {
    test('renders PickADisplay component', () => {
        //Arrange
        renderWithProviders(<PickADisplay />, {
            preloadedState: {
                settings: initialIphoneState,
                courses: [],
                timetable: initialTimetableState,
                pages: initialPagesState,
                styling: initialStylingState,
                theme: initialThemeState
            }
        })
        //Act
        //...nothing

        //Assert
        expect(screen.getByTestId('pickADisplay')).toBeInTheDocument()
        expect(screen.getByTestId('iphone')).toBeInTheDocument()
        expect(screen.getByTestId('ipad')).toBeInTheDocument()
        expect(screen.getByTestId('letter')).toBeInTheDocument()

    })

    test('renders PickADisplay component with a4 selected', () => {
        //Arrange
        renderWithProviders(<PickADisplay />, {
            preloadedState: {
                settings: initialIphoneState,
                courses: [],
                timetable: initialTimetableState,
                pages: initialPagesState,
                styling: initialStylingState,
                theme: initialThemeState
            }
        })
        //Act

        fireEvent.click(screen.getByTestId('a4'))

        expect(screen.getByTestId('pickADisplay')).toBeInTheDocument()
        expect(screen.getByTestId('iphone')).toBeInTheDocument()
        expect(screen.getByTestId('ipad')).toBeInTheDocument()
        expect(screen.getByTestId('letter')).toBeInTheDocument()
        expect(screen.getByTestId('a4')).toBeInTheDocument()
        expect(screen.getByTestId('a4')).toHaveClass('Mui-selected')

        fireEvent.click(screen.getByTestId('letter'))
        expect(screen.getByTestId('letter')).toHaveClass('Mui-selected')

        fireEvent.click(screen.getByTestId('ipad'))
        expect(screen.getByTestId('ipad')).toHaveClass('Mui-selected')

        fireEvent.click(screen.getByTestId('iphone'))
        expect(screen.getByTestId('iphone')).toHaveClass('Mui-selected')


    })
})