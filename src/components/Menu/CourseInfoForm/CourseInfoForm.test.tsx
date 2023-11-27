import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../../utils/test-utils';
import CourseInfoForm from './CourseInfoForm';
import { courseInfo, generateEmptyMeetingTime } from '../../../interfaces/coursesInterfaces';
import { initialIphoneState } from '../../../store/settings-slice';
import { initialTimetableState } from '../../../store/timetable-slice';
import { initialPagesState } from '../../../store/pages-slice';
import { CollapseContext } from '../../../context/collapseContext';
import { initialStylingState } from '../../../store/styling-slice';

describe('CourseInfoForm', () => {
    test('renders CourseInfoForm component', () => {
        const courseInfo: courseInfo = {
            id: "TEST 101",
            courseCode: 'TEST 101',
            backgroundColour: '#FFFFFF',
            meetingTimes: [generateEmptyMeetingTime()],
            existed: false,

        }
        renderWithProviders(
            <CollapseContext.Provider value={{ collapse: false, setCollapse: () => { } }}>
                <CourseInfoForm {...courseInfo} />
            </CollapseContext.Provider>, {
            preloadedState: {
                settings: initialIphoneState,
                courses: [],
                timetable: initialTimetableState,
                pages: initialPagesState,
                styling: initialStylingState
            }
        });

        expect(screen.getByTestId('meeting-time-form')).toBeInTheDocument()
    })
})