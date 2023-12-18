import { render, screen } from '@testing-library/react';
import { DarkModeContext } from '../../../../../context/DarkModeContext';
import MeetingTimeForm, { MeetingTimeFormProps } from './MeetingTimeForm';
import dayjs from 'dayjs';

describe('MeetingTimeForm', () => {

    test('renders MeetingTimeForm component', () => {

        const meetingTimeFormProps: MeetingTimeFormProps = {
            key: 0,
            id: 0,
            length: 1,
            handleRemoveMeetingTime: jest.fn(),
            meetingTime: {
                courseType: 'Lecture',
                location: 'Online',
                startTime: dayjs('2022-04-17T09:00'),
                endTime: dayjs('2022-04-17T11:00'),
                days: {
                    mon: false,
                    tue: false,
                    wed: false,
                    thu: false,
                    fri: false,
                    sat: false,
                    sun: false
                }
            },
            handleMeetingTimeSchedulesChange: jest.fn()
        }

        render(
            <DarkModeContext.Provider value={{ darkMode: false, setDarkMode: () => { } }}>
                <MeetingTimeForm {...meetingTimeFormProps} />
            </DarkModeContext.Provider>)


        expect(screen.getByTestId('meeting-time-form')).toBeInTheDocument()
        expect(screen.getByText('Meeting Time 1')).toBeInTheDocument()

        //TODO: fix this test (unable to get the value of TextField)

        // expect(screen.getByText('Lecture')).toBeInTheDocument()

        // expect(screen.getByTestId('course-type')).toHaveValue('Lecture');
    })


})