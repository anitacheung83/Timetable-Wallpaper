import dayjs, { Dayjs } from 'dayjs';

export interface days {
    mon: boolean,
    tue: boolean,
    wed: boolean,
    thu: boolean,
    fri: boolean
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

export const emptyMeetingTime: meetingTime = {
    courseType: '',
    location: '',
    startTime: dayjs('2022-04-17T09:00'),
    endTime: dayjs('2022-04-17T11:00'),
    days: {
        mon: false,
        tue: false,
        wed: false,
        thu: false,
        fri: false
    }
}