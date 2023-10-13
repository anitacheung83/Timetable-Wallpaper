import { screen } from '@testing-library/react';
import dayjs from 'dayjs';
import CourseGrid from './CourseGrid';
import { renderWithProviders } from '../../../utils/test-utils'
import { initialIphoneState, initialIpadState } from '../../../store/settings-slice';
import { initialTimetableState } from '../../../store/timetable-slice';
import { initialPagesState } from '../../../store/pages-slice';

// height, width and top test needed to be implemented
describe('Course Grid Component', () => {
    //Arrange
    test('renders course grid component with iPhone and displays time', () => {

        //Arrange

        const courseGridProps = {
            courseCode: 'TEST 101',
            backgroundColor: '#E6DDC6',
            format: 'Lecture',
            location: 'Online',
            startTime: dayjs('2022-04-17T09:00'),
            endTime: dayjs('2022-04-17T11:00'),
            displayStartTime: dayjs('2021-09-07T09:00:00.000Z'),
            displayEndTime: dayjs('2021-09-07T11:00:00.000Z'),
            height: 2,
            top: 0
        }

        renderWithProviders(<CourseGrid {...courseGridProps} />, {
            preloadedState: {
                settings: initialIphoneState,
                courses: [],
                timetable: initialTimetableState,
                pages: initialPagesState
            }
        })

        //Act 
        //...nothing

        //Assert

        expect(screen.getByTestId('course-grid')).toBeInTheDocument()
        expect(screen.getByTestId('course-grid')).toHaveStyle({ backgroundColor: '#E6DDC6' })
        expect(screen.getByText('TEST 101')).toBeInTheDocument()
        expect(screen.getByText('Lecture')).toBeInTheDocument()
        expect(screen.getByText('Online')).toBeInTheDocument()
        expect(screen.getByText('09:00 AM')).toBeInTheDocument()
        expect(screen.getByText('11:00 AM')).toBeInTheDocument()
    })

    test('renders course grid component with iPhone and without displays time', () => {
        const courseGridProps = {
            courseCode: 'TEST 101',
            backgroundColor: '#E6DDC6',
            format: 'Lecture',
            location: 'Online',
            startTime: dayjs('2022-04-17T09:00'),
            endTime: dayjs('2022-04-17T11:00'),
            displayStartTime: dayjs('2021-09-07T09:00:00.000Z'),
            displayEndTime: dayjs('2021-09-07T11:00:00.000Z'),
            height: 2,
            top: 0
        }

        const settingsWithoutDisplayTime = {
            ...initialIphoneState,
            displayTime: false
        }

        renderWithProviders(<CourseGrid {...courseGridProps} />, {
            preloadedState: {
                settings: settingsWithoutDisplayTime,
                courses: [],
                timetable: initialTimetableState,
                pages: initialPagesState
            }
        })
    })

    test('renders course grid component with iPad and displays time', () => {
        const courseGridProps = {
            courseCode: 'TEST 101',
            backgroundColor: '#E6DDC6',
            format: 'Lecture',
            location: 'Online',
            startTime: dayjs('2022-04-17T09:00'),
            endTime: dayjs('2022-04-17T11:00'),
            displayStartTime: dayjs('2021-09-07T09:00:00.000Z'),
            displayEndTime: dayjs('2021-09-07T11:00:00.000Z'),
            height: 2,
            top: 0
        }

        renderWithProviders(<CourseGrid {...courseGridProps} />, {
            preloadedState: {
                settings: initialIpadState,
                courses: [],
                timetable: initialTimetableState,
                pages: initialPagesState
            }
        })

        expect(screen.getByTestId('course-grid')).toBeInTheDocument()
        expect(screen.getByTestId('course-grid')).toHaveStyle({ backgroundColor: '#E6DDC6' })
        expect(screen.getByText('TEST 101')).toBeInTheDocument()
        expect(screen.getByText('Lecture')).toBeInTheDocument()
        expect(screen.getByText('Online')).toBeInTheDocument()
        expect(screen.getByText('09:00 AM - 11:00 AM')).toBeInTheDocument()

    })

    test('renders course grid component with iPad and without displays time', () => {
        const courseGridProps = {
            courseCode: 'TEST 101',
            backgroundColor: '#E6DDC6',
            format: 'Lecture',
            location: 'Online',
            startTime: dayjs('2022-04-17T09:00'),
            endTime: dayjs('2022-04-17T11:00'),
            displayStartTime: dayjs('2021-09-07T09:00:00.000Z'),
            displayEndTime: dayjs('2021-09-07T11:00:00.000Z'),
            height: 2,
            top: 0
        }

        const settingsWithoutDisplayTime = {
            ...initialIpadState,
            displayTime: false
        }

        renderWithProviders(<CourseGrid {...courseGridProps} />, {
            preloadedState: {
                settings: settingsWithoutDisplayTime,
                courses: [],
                timetable: initialTimetableState,
                pages: initialPagesState
            }
        })

        expect(screen.getByTestId('course-grid')).toBeInTheDocument()
        expect(screen.getByTestId('course-grid')).toHaveStyle({ backgroundColor: '#E6DDC6' })
        expect(screen.getByText('TEST 101')).toBeInTheDocument()
        expect(screen.getByText('Lecture')).toBeInTheDocument()
        expect(screen.getByText('Online')).toBeInTheDocument()
        expect(screen.queryByText('09:00 AM - 11:00 AM')).not.toBeInTheDocument()
    })
})
