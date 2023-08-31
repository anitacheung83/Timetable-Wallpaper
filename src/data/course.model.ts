import dayjs, { Dayjs } from 'dayjs';
import { DaysRange } from '../context/settingsContext';

export interface days {
    mon?: boolean,
    tue?: boolean,
    wed?: boolean,
    thu?: boolean,
    fri?: boolean,
    sat?: boolean,
    sun?: boolean
}

export interface meetingTime {
    courseType: string,
    location: string,
    startTime: Dayjs,
    endTime: Dayjs
    days: days
}

export interface courseInfo {
    id: string,
    courseCode: string,
    backgroundColour: string,
    meetingTimes: meetingTime[],
    existed: boolean
}


export interface setting {
    startHour: unknown,
    endHour: unknown,
    clockType: 24 | 12
}

// export const emptyMeetingTime: meetingTime = {
//     courseType: '',
//     location: '',
//     startTime: dayjs('2022-04-17T09:00'),
//     endTime: dayjs('2022-04-17T11:00'),
//     days: {
//         mon: false,
//         tue: false,
//         wed: false,
//         thu: false,
//         fri: false,
//         sat: false,
//         sun: false
//     }
// }

function generateEmptyDaysSelection(selectedDays: DaysRange) {
    const emptyDaysSelection: days = {};

    if (selectedDays.mon) {
        emptyDaysSelection.mon = false
    }
    if (selectedDays.tue) {
        emptyDaysSelection.tue = false
    }
    if (selectedDays.wed) {
        emptyDaysSelection.wed = false
    }
    if (selectedDays.thu) {
        emptyDaysSelection.thu = false
    }
    if (selectedDays.fri) {
        emptyDaysSelection.fri = false
    }
    if (selectedDays.sat) {
        emptyDaysSelection.sat = false
    }
    if (selectedDays.sun) {
        emptyDaysSelection.sun = false
    }
    return emptyDaysSelection
}


export function generateEmptyMeetingTime(selectedDays: DaysRange) {
    const emptyMeetingTime = {
        courseType: "",
        location: "",
        startTime: dayjs('2022-04-17T09:00'),
        endTime: dayjs('2022-04-17T11:00'),
        days: generateEmptyDaysSelection(selectedDays)
    }

    return emptyMeetingTime

}