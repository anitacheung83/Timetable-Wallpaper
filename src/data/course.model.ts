import dayjs, { Dayjs } from 'dayjs';
import { DaysRange } from '../store/settings-slice';

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

function generateEmptyDaysSelection(selectedDays: DaysRange) {
    return {
        mon: false,
        tue: false,
        wed: false,
        fri: false,
        thu: false,
        sat: false,
        sun: false,
    }
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